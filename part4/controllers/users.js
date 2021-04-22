const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const saltRounds = 10;

  if (body.password.length < 3 && body.password.length > 0) {
    return response.status(404).json({
      error: "password is shorter than minium allowed length 3"
    });
  }

  if (body.password.length == 0) {
    return response.status(404).json({
      error: "password is required"
    });
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();
  response.json(savedUser.toJSON());
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");

  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
