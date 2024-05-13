const { KuotaModel } = require("./kuota.model");
const moment = require("moment");

async function KuotaList(req, res) {
  try {
    await autoUpdateKuota();

    const result = await KuotaModel.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function KuotaCreate(req, res) {
  try {
    await autoUpdateKuota();

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
    await autoUpdateKuota();

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

async function autoUpdateKuota() {
  try {
    const date = moment().format("YYYY-MM-DD");
    const yesterdayDate = moment().subtract(1, "days").format("YYYY-MM-DD");
    const Transaction = "Kuota Pasien";

    const kuotaKemarin = await KuotaModel.findOne({
      date: yesterdayDate,
      Transaction,
    });

    if (!kuotaKemarin) {
      console.log("Tidak ada data kuota untuk tanggal kemarin.");
      return;
    }

    const Quota = kuotaKemarin.Quota;
    const Available = kuotaKemarin.Quota;
    const Used = 0;
    const antrean = 0;

    await KuotaModel.findByIdAndUpdate(
      kuotaKemarin._id,
      { date, Transaction, Quota, Available, Used, antrean },
      { new: true }
    );
  } catch (error) {
    console.error("Error saat melakukan auto update kuota:", error);
  }
}

async function KuotaDelete(req, res) {
  try {
    await autoUpdateKuota();

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
  autoUpdateKuota,
};
