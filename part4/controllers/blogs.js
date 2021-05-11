const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = await User.findById(request.user);
      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: 0,
        user: user._id
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.json(savedBlog.toJSON());
    } catch (exception) {
      next(exception);
    }
  }
);

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const userId = await User.findById(request.user);
      const blog = await Blog.findById(request.params.id);

      if (blog.user.toString() === userId._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    } catch (exception) {
      next(exception);
    }
  }
);

blogsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = await User.findById(request.user);
      const blog = await Blog.findById(request.params.id);
      const updatedBlog = {
        user: user._id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        id: request.params.id
      };
      Blog.findByIdAndUpdate(
        blog._id,
        updatedBlog,
        {
          new: true
        },
        function(err, result) {
          if (err) {
            response.send(err);
          } else {
            response.send(result);
          }
        }
      );
    } catch (exception) {
      next(exception);
    }
  }
);

module.exports = blogsRouter;
