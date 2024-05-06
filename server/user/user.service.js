const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./user.model");
const { Error401 } = require("../libs/lib.exception");

const UserNotExist = async (email) => {
  const result = await UserModel.findOne({ email });

  if (!result) {
    // throw new Error("Email tidak terdaftar");
    throw new Error401("Email tidak terdaftar.");
  }

  return result;
};

// const ValidatePassword = async (req, user) => {
//   if (!(await bcrypt.compare(req.body.password, user.password))) {
//     // throw new Error("Password tidak cocok");
//     throw new Error401("Password salah.");
//   }
// };

async function ValidatePassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  if (!isMatch) {
    throw new Error("Password salah.");
  } else {
    return isMatch;
  }
}

const FetchUserRoleFromModel = async (email) => {
  const userRole = await UserModel.findOne({ email });
  if (!userRole) {
    throw new Error("User role not found");
  }
  return userRole;
};

const MakeJWTToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "2h" });

  return token;
};

module.exports = {
  UserNotExist,
  ValidatePassword,
  MakeJWTToken,
  FetchUserRoleFromModel,
};
