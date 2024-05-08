const express = require("express");
const {
  KuotaList,
  KuotaCreate,
  KuotaUpdate,
  KuotaDelete,
} = require("./kuota.controller");

const kuotaRouter = express.Router();

kuotaRouter.get("/getkuota", KuotaList);
kuotaRouter.post("/createkuota", KuotaCreate);
kuotaRouter.put("/updatekuota/:id", KuotaUpdate);
kuotaRouter.delete("/deletekuota/:id", KuotaDelete);

module.exports = {
  kuotaRouter,
};
