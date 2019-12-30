const router = require('express-promise-router')();
const destroySession = require('../services/destroySession');
const AuthenticationError = require('../errors/AuthenticationError');

router.post('/', async (req, res) => {
  const authToken = req.get('X-Auth-Token');
  if (!authToken) throw new AuthenticationError('No auth token provided');
  await destroySession(authToken);
  res.status(204).send();
});

module.exports = router;
