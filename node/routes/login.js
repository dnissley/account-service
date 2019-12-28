const Joi = require('@hapi/joi');
const router = require('express-promise-router')();
const createSession = require('../services/createSession');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});

router.post('/', async (req, res) => {
  Joi.assert(req.body, loginSchema);
  const { email, password } = req.body;
  const session = await createSession(email, password);
  res.send(session);
});

module.exports = router;
