const db = require('../../data/db-config.js');


const getAll = async () => {
  // DO YOUR MAGIC
  const accounts = await db('accounts');
  return accounts;
}

const getById = async id => {
  // DO YOUR MAGIC
  const account = await db('accounts').where({ id }).first();
  return account;
}

const create =async account => {
  // DO YOUR MAGICy
  return await db('accounts').insert(account);
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  const newid = await db('accounts').where({ id }).update(account)
  return await getById(newid)
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
