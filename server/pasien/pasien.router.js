const express = require("express");
const { PasienCreate, PasienList, PasienUpdate, PasienDelete, PasienDetail, exportPasien } = require("./pasien.controller");
const { Validate, IsAuthenticated } = require("../libs/lib.middleware");
const { PasienNIKValidator, PasienNamaValidator, PasienTanggalLahirValidator, PasienTeleponValidator, PasienAlamatValidator } = require("./pasien.validator");

const PasienRouter = express.Router();

PasienRouter.get("/", PasienList);
PasienRouter.get("/exportPasien", exportPasien);
PasienRouter.post("/", [
    Validate([
        PasienNIKValidator(),
        PasienNamaValidator(),
        PasienTanggalLahirValidator(),
        PasienTeleponValidator(),
        PasienTeleponValidator(),
        PasienAlamatValidator()
    ])
], PasienCreate )

PasienRouter.put("/:id", [
  Validate([
    PasienNIKValidator(),
    PasienNamaValidator(),
    PasienTanggalLahirValidator(),
    PasienTeleponValidator(),
    PasienTeleponValidator(),
    PasienAlamatValidator()
])

], PasienUpdate);
PasienRouter.delete("/:id", PasienDelete);
PasienRouter.get("/:id", PasienDetail)

module.exports = {
  PasienRouter
};
