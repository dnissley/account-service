const models = require('../models');
const checkPassword = require('./checkPassword');

async function destroySession(authToken) {
  return models.Session.destroy({
    where: {
      authToken
    }
  });
}

module.exports = destroySession;
