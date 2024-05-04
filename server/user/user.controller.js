const bcrypt = require("bcryptjs");
const { UserModel } = require("./user.model");
const {
  UserNotExist,
  ValidatePassword,
  MakeJWTToken,
} = require("./user.service"); // tambahkan FetchUserRoleFromAPI
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

// async function UserSignIn(req, res) {
//   try {
//     const user = await UserModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Email and Password do not match" });
//     }

//     const isPasswordValid = await ValidatePassword(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ message: "Email and Password do not match" });
//     }

//     const roleResponse = await FetchUserRoleFromAPI(req.body.email);

//     const payload = {
//       email: user.email,
//       name: user.name,
//       role: roleResponse.role,
//     };

//     console.log(payload);
//     const token = MakeJWTToken(payload);

//     return res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

async function UserSignIn(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email and Password do not match" });
    }

    const isPasswordValid = await ValidatePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email and Password do not match" });
    }

    const roleResponse = await UserModel.findOne({ email: req.body.email });
    const role = roleResponse.role;

    const payload = {
      email: user.email,
      name: user.name,
      role: roleResponse.role,
    };

    const token = MakeJWTToken(payload);

    return res.status(200).json({ token, role });
  } catch (error) {
    console.error(error);
    if (error instanceof Error401) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  UserRegister,
  UserSignIn,
};