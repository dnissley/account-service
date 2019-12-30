class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

module.exports = AuthenticationError;
