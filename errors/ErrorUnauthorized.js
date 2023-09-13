const httpConstants = require('http2').constants;
const { MSG_UNAUTHORIZED } = require('../constants');

module.exports = class ErrorUnauthorized extends Error {
  constructor(message = MSG_UNAUTHORIZED) {
    super(message);
    this.code = httpConstants.HTTP_STATUS_UNAUTHORIZED;
  }
};
