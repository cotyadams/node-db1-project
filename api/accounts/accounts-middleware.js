let yup = require('yup');
const {getAll, getById, create, updateById, deleteById} = require('./accounts-model');
exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  let error = { status: 400 }
  let { name, budget } = req.body;
  if (name === undefined || budget === undefined) { 
    res.status(400).json({ message: "name and budget are required" })
    next(error)
  } 
  else if (typeof name !== "string") { 
     res.status(400).json({ message: "name of account must be a string" })
    next(error);
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
    next(error);
  }
  else if (!Number(budget)) { 
    res.status(400).json({ message: "budget of account must be a number" })
    next(error);
  }
  else if (Number(budget) < 0 || Number(budget) > 1000000) { 
    res.status(400).json({ message: "budget of account is too large or too small" })
    next(error);
  }
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const list = await getAll();
  if (await list.find(account => account.name === req.body.name)) {
    res.status(400).json({ message: "that name is taken" })
  } else next();
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await getById(req.params.id);
  if (!account) {
    res.status(404).json({ message: 'account not found' })
  } else next();
}
