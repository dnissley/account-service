const models = require('../models');
const AuthenticationError = require('../errors/AuthenticationError');

async function fetchUserDetails(authToken) {
  const user = await models.User.findByAuthToken(authToken);

  if (!user) throw new AuthenticationError('Invalid auth token provided');

  return {
    email: user.email
  };
}

module.exports = fetchUserDetails;
