
const { body } = require("express-validator");
const { PasienModel } = require("./pasien.model");

const PasienNIKValidator = (target = "nik") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isLength({ min: 16, max: 16 })
    .withMessage("Field hanya menerima tepat 16 angka.")
    .bail();
}

const PasienNamaValidator = (target="nama")=>{
  return body(target)
  .exists()
  .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
}

const PasienTanggalLahirValidator = (target="tglLahir") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isDate({format: "YYYY-MM-DD"})
    .withMessage("Format harus YYYY-MM-DD")
    .bail()
}

const PasienTeleponValidator = (target="telepon") => {
  return body(target)
  .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isLength({ min: 11, max: 13 }).withMessage("Nomor telepon minimal 11 karakter dan maksimal 13 karakter")
    .bail()
}

const PasienAlamatValidator = (target="alamat") => {
  return body(target)
  .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong.")
    .bail()
    .isLength({ min: 10, max: 150 }).withMessage(" minimal 10 karakter dan maksimal 150 karakter")
    .bail();
}

module.exports = {
  PasienNIKValidator,
  PasienNamaValidator,
  PasienTanggalLahirValidator,
  PasienTeleponValidator,
  PasienAlamatValidator
};
