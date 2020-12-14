const { NO_CONTENT, OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const { ERROR, SUCCESS, FAIL } = require('../../config/app.config');
const {} = require('../../config/app.config');

const response = ({ httpStatus, jsonStatus }) => (res, data) => res
  .status(httpStatus).json({ status: jsonStatus, data });

const error = response({ httpStatus: INTERNAL_SERVER_ERROR, jsonStatus: ERROR });
const success = response({ httpStatus: OK, jsonStatus: SUCCESS });
const notFound = response({ httpStatus: NOT_FOUND, jsonStatus: FAIL });

module.exports = {
  error,
  success,
  notFound,
};
