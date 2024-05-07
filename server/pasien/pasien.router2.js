const express = require("express");
const {
  PasienCreate,
  PasienList,
  PasienUpdate,
  PasienDelete,
  PasienDetail,
} = require("./pasien.controller");
// const { Validate, IsAuthenticated } = require("../libs/lib.middleware");
const {
  PasienNIKValidator,
  PasienNamaValidator,
  PasienTanggalLahirValidator,
  PasienTeleponValidator,
  PasienAlamatValidator,
} = require("./pasien.validator");

const PasienRouter = express.Router();

PasienRouter.get("/list", PasienList);

PasienRouter.post(
  "/create",
  [
    // IsAuthenticated,
    Validate([
      PasienNamaValidator(),
      PasienTanggalLahirValidator(),
      PasienTeleponValidator(),
      PasienAlamatValidator(),
    ]),
  ],
  PasienCreate
);

PasienRouter.put("/:id", [IsAuthenticated], PasienUpdate);
PasienRouter.delete("/:id", [IsAuthenticated], PasienDelete);
PasienRouter.get("/:id", [IsAuthenticated], PasienDetail);

module.exports = {
  PasienRouter,
};
