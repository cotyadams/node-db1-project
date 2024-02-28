const router = require('express').Router()

const { getAll, getById, create, updateById, deleteById } = require('./accounts-model');

const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');
router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await getById(req.params.id)
    res.status(200).json(account)
  }catch {
    res.status(500).json({ message: 'Error retrieving account' })
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
  } catch {
    res.status(500).json({ message: 'Error creating account' })
   }
})

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
  } catch {
    res.status(500).json({ message: 'Error updating account' })
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deleted = await getById(req.params.id);
    await deleteById(req.params.id);
    res.status(200).json(deleted);
  } catch {
    res.status(500).json({ message: 'Error deleting account' })
   }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: 'Error in server', error: err })
  next();
})

module.exports = router;
