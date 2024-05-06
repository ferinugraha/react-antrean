const mongoose = require("mongoose");

const PasienObject = {
  nama: {
    type: String,
    required: true,
  },
  notelp: {
    type: String,
    required: true,
  },
  jenis_kelamin: {
    type: String,
    required: true,
  },
  umur: {
    type: Number,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  keluhan: {
    type: String,
    required: true,
  },

  jenis_pembayaran: {
    type: String,
    required: true,
  },
  total_pembayaran: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dokter: {
    type: String,
    required: true,
  },

  tanggal_masuk: {
    type: Date,
    required: true,
  },
};

const PasienSchema = new mongoose.Schema(PasienObject);

const PasienModel = mongoose.model("Pasien", PasienSchema);

module.exports = {
  PasienSchema,
  PasienModel,
  PasienObject,
};
