const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { Logging, LOG_ERROR } = require("./lib.logging");

const IsAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    Logging.log("error", "Token is required for authentication");
    return res
      .status(401)
      .send({ detail: "Token is required for authentication" });
  }

  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decode;
  } catch (error) {
    Logging.log("error", "Invalid token");
    return res.status(401).send({ detail: "Invalid token" });
  }

  return next();
};

const Validate = (validations) => {
<<<<<<< HEAD
  return async ( req, res, next) => {

=======
  return async (req, res, next) => {
>>>>>>> f1f5ced3138aca6a9c867e22214eb21dd4cc1d63
    for (let validation of validations) {
      await validation.run(req);
      // if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.cleanedData = matchedData(req);
      return next();
    }
    return res.status(400).json(errors.errors);
  };
};

module.exports = {
  IsAuthenticated,
  Validate,
};
