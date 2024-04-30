const mongoose = require("mongoose");

const UserObject = {
  name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
};

const UserSchema = new mongoose.Schema(UserObject);

const UserModel = new mongoose.model("User", UserSchema);

module.exports = {
  UserObject,
  UserSchema,
  UserModel,
};
