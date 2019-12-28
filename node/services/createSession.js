const models = require('../models');
const checkPassword = require('./checkPassword');
const generateAuthToken = require('./generateAuthToken');

async function createSession(email, password) {
  const user = await models.User.findByEmail(email);

  if (!user) throw new Error('Wrong username/password');
    
  const passwordCorrect = await checkPassword(password, user.passwordHash);

  if (!passwordCorrect) throw new Error('Wrong username/password');

  await models.Session.destroy({
    where: {
      userId: user.id
    }
  });

  const authToken = generateAuthToken();

  await models.Session.create({
    userId: user.id,
    authToken
  });

  return { authToken };
}

module.exports = createSession;
