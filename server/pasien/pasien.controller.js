const { GetOr404 } = require("../libs/lib.common")
const { ExceptionHandler } = require("../libs/lib.exception")
const { PasienModel } = require("./pasien.model")

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

module.exports = {
    PasienCreate,
    PasienList,
    PasienDetail,
    PasienUpdate,
    PasienDelete
}