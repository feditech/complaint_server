class CustomErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.message = message;
  }

  static alreadyExixt(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message) {
    return new CustomErrorHandler(401, message);
  }
}

module.exports = CustomErrorHandler;
