let yup = require('yup');
const {getAll, getById, create, updateById, deleteById} = require('./accounts-model');
exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  let error = { status: 400 }
  let { name, budget } = req.body;
  if (name === undefined || budget === undefined) { 
    error.message = "name and budget are required"
    next(error);
  } 
  else if (typeof name !== "string") { 
    error.message = "name of account must be a string"
    next(error);
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100" 
    next(error);
  }
  else if (!Number(budget)) { 
    error.message = "budget of account must be a number" 
    next(error);
  }
  else if (Number(budget) < 0 || Number(budget) > 1000000) { 
    error.message = "budget of account is too large or too small"
    next(error);
  }
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const list = await getAll();
  if (await list.find(account => account.name === req.body.name)) {
    next({ status: 400, message: "that name is taken" })
  } else next();
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await getById(req.params.id);
  if (!account) {
    next({ status: 404, message: 'account not found' })
  } else next();
}
