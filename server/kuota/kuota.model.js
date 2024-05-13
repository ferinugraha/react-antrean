const mongoose = require("mongoose");

const KuotaObject = {
  date: {
    type: String,
    required: true,
  },
  Transaction: {
    type: String,
    required: true,
  },
  Quota: {
    type: Number,
    required: true,
  },
  Available: {
    type: Number,
    required: true,
  },
  Used: {
    type: Number,
    default: 0,
  },
  antrean: {
    type: Number,
    default: 0,
  },
};

const KuotaSchema = new mongoose.Schema(KuotaObject);

const KuotaModel = mongoose.model("Kuota", KuotaSchema);

module.exports = {
  KuotaSchema,
  KuotaModel,
  KuotaObject,
};