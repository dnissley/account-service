const Joi = require('@hapi/joi');
const router = require('express-promise-router')();
const createAccount = require('../services/createAccount');
const createSession = require('../services/createSession');
const fetchUserDetails = require('../services/fetchUserDetails');
const AuthenticationError = require('../errors/AuthenticationError');

const createAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});

// Account Creation
router.post('/', async (req, res) => {
  Joi.assert(req.body, createAccountSchema);
  const { email, password } = req.body;
  await createAccount(email, password);
  const session = await createSession(email, password);
  res.send(session);
});

// Fetch Account Details
router.get('/', async (req, res) => {
  const authToken = req.get('X-Auth-Token');
  if (!authToken) throw new AuthenticationError('No auth token provided');
  const userDetails = await fetchUserDetails(authToken);
  res.send(userDetails);
});

module.exports = router;
