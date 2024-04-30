const mongoose = require("mongoose");

const KeranjangSchema = new mongoose.Schema({
  menu: {
    type: String,
  },
  price: {
    type: Number,
  },
  total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("keranjangs", KeranjangSchema);
