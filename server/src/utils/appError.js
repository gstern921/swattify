const {StatusCodes} = require('http-status-codes');
const { INTERNAL_SERVER_ERROR } = StatusCodes;
const { ERROR, FAIL } = require('../config/app.config');

class AppError extends Error {
  constructor(message = 'There was an error with the application', statusCode = 500) {
    super(message);
    this.isOperational = true;
    let code = +statusCode;
    if (!code || Number.isNaN(code)) {
      code = INTERNAL_SERVER_ERROR;
    }
    this.responseStatus = code >= 500 ? ERROR : FAIL;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
