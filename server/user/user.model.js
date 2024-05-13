const { create } = require("domain");
const mongoose = require("mongoose");

const UserObject = {
  code_user: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  created_at: { type: Date, default: Date.now },
};

const UserSchema = new mongoose.Schema(UserObject);

const UserModel = new mongoose.model("User", UserSchema);

module.exports = {
  UserObject,
  UserSchema,
  UserModel,
};
