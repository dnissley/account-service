const bcrypt = require('bcrypt');

async function checkPassword(givenPassword, actualPasswordHash) {
  return bcrypt.compare(givenPassword, actualPasswordHash);
}

module.exports = checkPassword;
