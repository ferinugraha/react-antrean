const express = require("express");
const { MongoDBConnection } = require("./libs/lib.database");
const { UserRouter } = require("./user/user.router");
const { ROUTER_BASE_USER } = require("./user/user.config");
const cors = require("cors");

const { Logging } = require("./libs/lib.logging"); // Perubahan di sini, sesuaikan dengan nama file logging Anda
const { ROUTER_BASE_PASIEN } = require("./pasien/pasien.config");
const { PasienRouter } = require("./pasien/pasien.router");

const app = express();

MongoDBConnection();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

/**
 * Logging app
 */
app.use((req, res, next) => {
  Logging.info(`Received a ${req.method} request for ${req.url}`);
  return next();
});

app.use(ROUTER_BASE_USER, UserRouter);
app.use(ROUTER_BASE_PASIEN, PasienRouter)

module.exports = {
  app,
};
