const models = require('../models');
const hashPassword = require('./hashPassword');
const UserInputError = require('../errors/UserInputError');

async function createAccount(email, password) {
  const passwordHash = await hashPassword(password);

  return models.User.create({
    email,
    passwordHash
  }).catch(err => {
    let mutatedError = err;
    if (err.name === 'SequelizeUniqueConstraintError') {
      mutatedError = new UserInputError('An account is already associated with the given email address');
    }
    return Promise.reject(mutatedError);
  });
}

module.exports = createAccount;
