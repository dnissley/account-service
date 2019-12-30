class PermissionsError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermissionsError";
    this.status = 403;
  }
}

module.exports = PermissionsError;
