const router = require('express').Router()

// pulling in model functions
const { getAll, getById, create, updateById, deleteById } = require('./accounts-model');

// pulling in middleware functions
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');


// `[GET] /api/accounts` returns all accounts.
router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})


// `[GET] /api/accounts/:id` returns the account with the given id.
router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await getById(req.params.id)
    res.status(200).json(account)
  }catch (err) {
    next(err);
  }
})

// `[POST] /api/accounts` returns the created account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccountID = await create({
        name: req.body.name.trim(),
        budget: req.body.budget
      });
    const account = await getById(newAccountID);
    res.status(201).json(account);
  } catch (err) {
    next(err);
   }
})


// `[PUT] /api/accounts/:id` returns the updated account. Leading or trailing whitespace on budget `name` should be trimmed before updated in db.
router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    const updated = await updateById(
      req.params.id,
      {
        name: req.body.name.trim(),
        budget: req.body.budget
      }
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});


// `[DELETE] /api/accounts/:id` returns the deleted account.
router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deleted = await getById(req.params.id);
    await deleteById(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
   }
})


// Error handler middleware function
router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json(err.message || 'Internal server error');
  next();
})

module.exports = router;
