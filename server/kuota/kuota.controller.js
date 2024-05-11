const { KuotaModel } = require("./kuota.model");

async function KuotaList(req, res) {
  try {
    const result = await KuotaModel.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function KuotaCreate(req, res) {
  try {
    const { date, Transaction, Quota } = req.body;
    const Available = Quota;
    const newKuota = new KuotaModel({
      date,
      Transaction,
      Quota,
      Available,
    });
    const result = await newKuota.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function KuotaUpdate(req, res) {
  try {
    const { id } = req.params;
    const { date, Transaction, Quota } = req.body;
    const Available = Quota;
    const Used = 0;
    const antrean = 0;
    const result = await KuotaModel.findByIdAndUpdate(
      id,
      { date, Transaction, Quota, Available, Used, antrean },
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function KuotaDelete(req, res) {
  try {
    const { id } = req.params;
    const result = await KuotaModel.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  KuotaList,
  KuotaCreate,
  KuotaUpdate,
  KuotaDelete,
};
