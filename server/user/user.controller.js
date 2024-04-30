const bcrypt = require("bcryptjs");
const { UserModel } = require("./user.model");
const {
  UserNotExist,
  ValidatePassword,
  MakeJWTToken,
} = require("./user.service");
const { ExceptionHandler } = require("../libs/lib.exception");

async function UserRegister(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({ ...req.body, password: passwordEncrypted });
    const { password, ...payload } = req.body;
    return res.status(201).json(payload);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function UserSignIn(req, res) {
  try {
    const user = await UserNotExist(req.body.email);
    await ValidatePassword(req, user);

    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = MakeJWTToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Email and Password do not match" });
  }
}

module.exports = {
  UserRegister,
  UserSignIn,
};
