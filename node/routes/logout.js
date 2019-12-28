const router = require('express-promise-router')();
const destroySession = require('../services/destroySession');

router.post('/', async (req, res) => {
  const authToken = req.get('X-Auth-Token');
  if (!authToken) throw new Error('No auth token provided');
  await destroySession(authToken);
  res.send();
});

module.exports = router;
