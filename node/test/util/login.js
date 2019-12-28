const models = require('../../models');
const createAccount = require('../../services/createAccount');

async function createUser(email, password) {
  await models.User.destroy({ where: { email }});
  return createAccount(email, password);
}

async function findUserSession(userId) {
  return models.Session.findOne({ where: { userId }});
}

module.exports = {
  createUser,
  findUserSession
};
