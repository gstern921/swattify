const {StatusCodes} = require('http-status-codes');
const { INTERNAL_SERVER_ERROR } = StatusCodes;
const { ERROR, FAIL } = require('../config/app.config');

class AppError extends Error {
  constructor(message = 'There was an error with the application', statusCode = INTERNAL_SERVER_ERROR, jsonResponseStatus = ERROR) {
    super(message);
    this.isOperational = true;
    this.statusCode = +statusCode ? +statusCode : INTERNAL_SERVER_ERROR;
    this.statusText = jsonResponseStatus;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
