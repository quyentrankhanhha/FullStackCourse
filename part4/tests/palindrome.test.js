const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 12,
      __v: 0
    }
  ];
  const post = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  };
  test("if there are many top favorite, return one of them", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(post);
  });
});

describe("most blogs", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Canonical string reduction",
      author: "Robert C. Martin",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      blogs: 3,
      __v: 0
    }
  ];
  const exp = {
    author: "Robert C. Martin",
    blogs: 3
  };
  test("if there are many the largest amount of blogs, return one of them", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual(exp);
  });
});

describe("most likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 17,
      __v: 0
    }
  ];
  const exp = {
    author: "Edsger W. Dijkstra",
    likes: 17
  };
  test("if there are many the largest amount of likes, return one of them", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual(exp);
  });
});
