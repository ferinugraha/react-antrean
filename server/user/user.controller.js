const bcrypt = require("bcryptjs");
const { UserModel } = require("./user.model");
const {
  UserNotExist,
  ValidatePassword,
  MakeJWTToken,
} = require("./user.service");
const { ExceptionHandler } = require("../libs/lib.exception");

// async function UserRegister(req, res) {
//   try {
//     const existingUser = await UserModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email already exists" });
//     }

//     const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
//     await UserModel.create({ ...req.body, password: passwordEncrypted });
//     const { password, ...payload } = req.body;
//     return res.status(201).json(payload);
//   } catch (error) {
//     console.log(error);
//     return ExceptionHandler(error, res);
//   }
// }

async function UserRegister(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    const userCode = generateRandomCode(7);
    await UserModel.create({
      ...req.body,
      password: passwordEncrypted,
      code_user: userCode,
    });
    const { password, ...payload } = req.body;
    return res.status(201).json(payload);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

function generateRandomCode(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
      return res.status(401).json({ message: "Password salah." });
    }

    const payload = {
      email: user.email,
      name: user.name,
    };

    const token = await MakeJWTToken(payload);
    return res.status(200).json({ token, code_user: user.code_user });
  } catch (error) {
    console.error(error);
    if (error.message === "Password salah.") {
      return res.status(401).json({ message: "Password salah." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function CekCodeUser(req, res) {
  try {
    const { code_user } = req.params;
    const user = await UserModel.findOne({ code_user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ role: user.role, name: user.name });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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
//       return res.status(401).json({ message: "Password salah." });
//     }

//     const payload = {
//       email: user.email,
//       name: user.name,
//       role: user.role,
//     };

//     const token = await MakeJWTToken(payload);
//     return res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     console.error(error);
//     if (error.message === "Password salah.") {
//       return res.status(401).json({ message: "Password salah." });
//     }
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

async function ListUser(req, res) {
  try {
    let users;
    const { filter } = req.query;

    if (filter === "sistem") {
      users = await UserModel.find({
        role: { $in: ["admin", "dokter", "staff"] },
      });
    } else if (filter === "user") {
      users = await UserModel.find({ role: "user" });
    } else {
      users = await UserModel.find({
        role: { $in: ["admin", "dokter", "staff"] },
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function EditUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, password, ...updateData } = req.body;
    if (email && email !== user.email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    if (password) {
      const passwordEncrypted = await bcrypt.hash(password, 10);
      updateData.password = passwordEncrypted;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    const { password: hashedPassword, ...payload } = updatedUser.toObject();
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(500).json({ message: "Failed to edit user" });
  }
}

async function DeleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
}

module.exports = {
  UserRegister,
  UserSignIn,
  ListUser,
  EditUser,
  DeleteUser,
  CekCodeUser,
};
