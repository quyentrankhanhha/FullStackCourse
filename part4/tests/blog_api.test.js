const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
});

test("there are blogs in JSON format", async () => {
  const response = await api.get("/api/blogs");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("the unique identifier property of the blog post", async () => {
  await api.get("/api/blogs").set(
    "toJSON",
    await {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      }
    }
  );
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[0].id).toBeDefined();
});

test("create a new blog post successfully", async () => {
  const blog = {
    title: "ad",
    author: "ad",
    url: "http://localhost:3001/api/blogs",
    likes: 3,
    user: "607ed36a2dc4f8b5127495cd"
  };
  await api
    .post("/api/blogs")
    .set(
      "Authorization",
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsImlkIjoiNjA4MTYwMTk5YTBmZmRlMDEwMGNiMzZmIiwiaWF0IjoxNjE5MDkxNTI1fQ.-xdM9rwJkQoQoB3qjg7t6jRvUnb0uPBc-_ybkLCU_uE"
    )
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("lack of likes property", async () => {
  let blog = {
    title: "ad",
    author: "ad",
    url: "http://localhost:3001/api/blogs",
    user: "607ed36a2dc4f8b5127495cd"
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("lack of title and url property", async () => {
  let blog = {
    url: "http://localhost:3001/api/blogs",
    likes: 4,
    user: "607ed36a2dc4f8b5127495cd"
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      passwordHash
    });

    await user.save();
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is shorter than minium allowed length 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rt",
      name: "Superuser",
      password: "salainen"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "User validation failed: username: Path `username` (`rt`) is shorter than the minimum allowed length (3)."
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: null,
      name: "Superuser",
      password: "salainen"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` is required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is shorter than minium allowed length 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "rt"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password is shorter than minium allowed length 3"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: null
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("password is required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
