const express = require("express");
const {
  UserRegister,
  UserSignIn,
  ListUser,
  EditUser,
  DeleteUser,
  CekCodeUser,
} = require("./user.controller");

const UserRouter = express.Router();

UserRouter.post("/register", UserRegister);
UserRouter.post("/signin", UserSignIn);
UserRouter.get("/list", ListUser);
UserRouter.put("/edit/:id", EditUser);
UserRouter.delete("/delete/:id", DeleteUser);
UserRouter.get("/cekuuid/:code_user", CekCodeUser);

module.exports = {
  UserRouter,
};
