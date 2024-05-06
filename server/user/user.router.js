const express = require("express");
const {
  UserRegister,
  UserSignIn,
  ListUser,
  EditUser,
  DeleteUser,
} = require("./user.controller");

const UserRouter = express.Router();

UserRouter.post("/register", UserRegister);
UserRouter.post("/signin", UserSignIn);
UserRouter.get("/list", ListUser);
UserRouter.put("/edit/:id", EditUser);
UserRouter.delete("/delete/:id", DeleteUser);

module.exports = {
  UserRouter,
};
