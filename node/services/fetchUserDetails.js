const models = require('../models');

async function fetchUserDetails(authToken) {
  const user = await models.User.findByAuthToken(authToken);

  return {
    email: user.email
  };
}

module.exports = fetchUserDetails;
