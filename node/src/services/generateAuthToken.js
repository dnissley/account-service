const uuidv1 = require('uuid/v1');

function generateAuthToken() {
  return uuidv1();
}

module.exports = generateAuthToken;
