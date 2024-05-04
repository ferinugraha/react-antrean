const mongoose = require("mongoose");

const PasienObject = {
    nik: { type: Number, require: true, maxLength:16, minLength:16 },
    nama: { type: String, require: true },
    tglLahir: { type: Date, require: true },
    telepon: { type: String, require: true },
    alamat: { type: String, require: true }
}

const PasienSchema = new mongoose.Schema(PasienObject)

const PasienModel = mongoose.model("Pasien", PasienSchema)

module.exports = {
    PasienSchema,
    PasienModel,
    PasienObject
}