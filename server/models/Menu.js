const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("menus", MenuSchema);
