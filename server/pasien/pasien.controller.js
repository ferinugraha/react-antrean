const { GetOr404 } = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { PasienModel } = require("./pasien.model");
const { KuotaModel } = require("../kuota/kuota.model");
const { LogModel } = require("./log.model");
const { json } = require("stream/consumers");

async function PasienList(req, res) {
  try {
    const result = await PasienModel.find();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

// async function PasienCreate(req, res) {
//   try {
//     const { Available } = (await KuotaModel.findOne({})) || { Available: 0 };

//     if (Available === 0) {
//       return res
//         .status(400)
//         .json({ error: "Maaf, kuota untuk hari ini sudah habis" });
//     } else {
//       const pasien = new PasienModel(req.body);
//       await pasien.save();
//       return res.status(201).json(pasien);
//     }
//   } catch (error) {
//     console.error(error);
//     return ExceptionHandler(error, res);
//   }
// }

async function PasienCreate(req, res) {
  try {
    const { Available } = (await KuotaModel.findOne({})) || { Available: 0 };

    if (Available === 0) {
      return res
        .status(400)
        .json({ error: "Maaf, kuota untuk hari ini sudah habis" });
    } else {
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      const kuota = await KuotaModel.findOne({ date: todayString });

      if (!kuota) {
        return res.status(400).json({ error: "Data kuota tidak ditemukan" });
      }

      if (kuota.Available < 1) {
        return res.status(400).json({ error: "Kuota habis untuk hari ini" });
      }

      kuota.Available -= 1;
      kuota.Used += 1;
      await kuota.save();

      const pasien = new PasienModel({ ...req.body, antrean: kuota.Used });
      await pasien.save();

      const log = new LogModel({
        nama: pasien.nama,
        message: "Pasien berhasil mendaftar",
        action: JSON.stringify(req.body),
      });
      await log.save();

      return res.status(201).json(pasien);
    }
  } catch (error) {
    console.error(error);
    return ExceptionHandler(error, res);
  }
}

async function PasienDetail(req, res) {
  try {
    const result = await GetOr404(PasienModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

// async function PasienUpdate(req, res) {
//   try {
//     await GetOr404(PasienModel, { _id: req.params.id });
//     const result = await PasienModel.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );

//     return res.status(200).json(result);
//   } catch (error) {
//     return ExceptionHandler(error, res);
//   }
// }

async function Pasiencekantrean(req, res) {
  try {
    const result = await PasienModel.find({ uuiid: req.params.uuiid });
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function PasienUpdate(req, res) {
  try {
    const updatedPatient = await PasienModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    const log = new LogModel({
      nama: updatedPatient.nama,
      message: "Pasien berhasil diupdate",
      action: JSON.stringify(req.body),
    });

    await log.save();

    if (req.body.status == "Diproses") {
      const kuota = await KuotaModel.findOne();

      if (!kuota) {
        throw new Error("Kuota not found");
      }

      kuota.antrean += 1;
      await kuota.save();
    }

    return res.status(200).json(updatedPatient);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

// async function PasienUpdate(req, res) {
//   console.log(req.body);
//   try {
//     const updatedPatient = await PasienModel.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (!updatedPatient) {
//       return res.status(404).json({ message: "Pasien tidak ditemukan" });
//     }

//     if (req.body.status === "Diproses") {
//       const today = new Date();
//       const todayString = today.toISOString().slice(0, 10);
//       const kuota = await KuotaModel.findOne({ date: todayString });

//       if (!kuota) {
//         return res.status(400).json({ message: "Kuota habis" });
//       }

//       if (kuota.Available < 1) {
//         return res.status(400).json({ message: "Kuota habis untuk hari ini." });
//       }
//       kuota.Available -= 1;
//       kuota.Used += 1;
//       await kuota.save();
//     }

//     return res.status(200).json(updatedPatient);
//   } catch (error) {
//     return ExceptionHandler(error, res);
//   }
// }

async function PasienDelete(req, res) {
  try {
    // const result = await GetOr404(KasModel, {_id: req.params.id})
    await PasienModel.findOneAndDelete({ _id: req.params.id });
    // result.delete();
    return res.status(204).json(null);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

module.exports = {
  PasienCreate,
  PasienList,
  PasienDetail,
  PasienUpdate,
  PasienDelete,
  Pasiencekantrean,
};
