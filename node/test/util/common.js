const models = require('../../models');
const createAccount = require('../../services/createAccount');

async function deleteUser(email) {
  return models.User.destroy({ where: { email }});
}

async function createUser(email, password) {
  await deleteUser(email);
  return createAccount(email, password);
}

async function findUser(email) {
  return models.User.findByEmail(email);
}

async function findUserSession(userIdOrEmail) {
  if (typeof userIdOrEmail === 'string') {
    return models.Session.findByUserEmail(userIdOrEmail);
  } else if (typeof userIdOrEmail === 'number') {
    return models.Session.findOne({ where: { userId: userIdOrEmail }});
  } else {
    throw new Error('Must provide either a user id (numbe4r) or an email (string)');
  }
}

async function closeDbConnection() {
  return models.sequelize.close();
}

module.exports = {
  deleteUser,
  createUser,
  findUser,
  findUserSession,
  closeDbConnection
};
