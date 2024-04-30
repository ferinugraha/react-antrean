const express = require("express");
const { UserRegister, UserSignIn } = require("./user.controller");

const UserRouter = express.Router();

UserRouter.post("/register", UserRegister);
UserRouter.post("/signin", UserSignIn);

module.exports = {
  UserRouter,
};
