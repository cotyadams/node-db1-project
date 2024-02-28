let yup = require('yup');
const {getAll, getById, create, updateById, deleteById} = require('./accounts-model');
exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if (req.body.name.length.trim() < 3 || req.body.name.length.trim() > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
    next();
  }
  if (!Number(req.body.budget)) { 
    res.status(400).json({ message: "budget of account must be a number" })
    next();
  }
  if (Number(req.body.budget) < 0 || Number(req.body.budget) > 1000000) { 
    res.status(400).json({ message: "budget of account is too large or too small" })
    next();
  }
  if (
    req.body.name &&
    req.body.budget &&
    typeof (req.body.name) === "string" &&
    typeof (req.body.budget) === "number"
  ) { 
    next();
  }
  else {
    res.status(400).json({ message: 'name and budget are required' })
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  if (await list.find(account => account.name === req.body.name)) {
    next({ status: 400, message: "that name is taken" })
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await getById(req.params.id);
  if (account) { 
    next();
  } else next({ status: 404, message: 'account not found' })
}
