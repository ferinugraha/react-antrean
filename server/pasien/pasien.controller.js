const { GetOr404 } = require("../libs/lib.common")
const { ExceptionHandler } = require("../libs/lib.exception")
const { PasienModel } = require("./pasien.model")
const CsvParser = require('json2csv').Parser

async function PasienList(req, res) {
    try{
        const result = await PasienModel.find()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return ExceptionHandler(error, res)
    }
}

async function PasienCreate(req, res) {
    try{
        const result = await PasienModel.create(req.body)
        return res.status(201).json(result)
    } catch (error) {
        console.log(error);
        return ExceptionHandler(error, res)
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

  async function PasienUpdate(req, res) {
    try {
      await GetOr404(PasienModel, {_id: req.params.id});
      const result = await PasienModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true}
      )
  
      return res.status(200).json(result);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

  async function PasienDelete(req, res) {
    try {
      // const result = await GetOr404(KasModel, {_id: req.params.id})
      await PasienModel.findOneAndDelete({_id: req.params.id})
      // result.delete();
      return res.status(204).json(null);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

  async function exportPasien(req, res) {
    try {
      const pasiens = []
      const pasienData = await PasienModel.find()

      pasienData.forEach((pasien) => {
        const { nik, nama, tglLahir, telepon, alamat} = pasien
        pasiens.push({ nik, nama, tglLahir, telepon, alamat })
      })

      const csvFields = ['nik', 'nama', 'tglLahir', 'telepon', 'alamat']
      const csvParser = new CsvParser({ csvFields })
      const csvData = csvParser.parse(pasiens)

      res.setHeader("Content-Type", "text/csv")
      res.setHeader("Content-Disposition", "attatchment: filename=usersData.csv")

      return res.status(200).end(csvData)

    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

module.exports = {
    PasienCreate,
    PasienList,
    PasienDetail,
    PasienUpdate,
    PasienDelete,
    exportPasien
}