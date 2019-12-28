const models = require('../models');
const hashPassword = require('./hashPassword');

async function createAccount(email, password) {
  const passwordHash = await hashPassword(password);

  return models.User.create({
    email,
    passwordHash
  });
}

module.exports = createAccount;
