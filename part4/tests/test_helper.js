const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Tester",
    author: "Admin",
    url: "http://localhost:3001/api/blogs",
    likes: 3,
    id: "6065b5d15bfeaf34eb7383ac"
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
};
