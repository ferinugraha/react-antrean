const { create } = require("domain");
const mongoose = require("mongoose");

const PasienObject = {
  uuiid: { type: String, required: true },
  nama: { type: String },
  gender: { type: String, required: true },
  alamat: { type: String, required: true },
  jenisPembayaran: { type: String, required: true },
  telepon: { type: String, required: true },
  umur: { type: Number, required: true },
  keluhan: { type: String, required: true },
  status: { type: String, required: true, default: "Menunggu" },
  totalPembayaran: { type: Number, required: true },
  namaDokter: { type: String },
  namaStaff: { type: String },
  hasilDokter: { type: String },
  createdAt: { type: Date, default: Date.now },
  antrean: { type: String, default: "0" },
};

const PasienSchema = new mongoose.Schema(PasienObject);

const PasienModel = mongoose.model("Pasien", PasienSchema);

module.exports = {
  PasienSchema,
  PasienModel,
  PasienObject,
};
