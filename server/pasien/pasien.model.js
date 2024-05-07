const mongoose = require("mongoose");

const PasienObject = {
  nama: { type: String, required: true },
  gender: { type: String, required: true },
  alamat: { type: String, required: true },
  jenisPembayaran: { type: String, required: true },
  telepon: { type: String, required: true },
  umur: { type: Number, required: true },
  keluhan: { type: String, required: true },
  status: { type: String, required: true, default: "Menunggu" },
  totalPembayaran: { type: Number, required: true },
  namaDokter: { type: String, required: true },
  namaStaff: { type: String },
  hasilDokter: { type: String },
};

const PasienSchema = new mongoose.Schema(PasienObject);

const PasienModel = mongoose.model("Pasien", PasienSchema);

module.exports = {
  PasienSchema,
  PasienModel,
  PasienObject,
};
