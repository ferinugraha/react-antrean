const mongoose = require("mongoose");

const LogObject = {
  nama: { type: String },
  message: { type: String },
  action: { type: String },
  createdAt: { type: Date, default: Date.now },
};

const LogSchema = new mongoose.Schema(LogObject);

const LogModel = mongoose.model("Log", LogSchema);

module.exports = {
  LogSchema,
  LogModel,
  LogObject,
};
