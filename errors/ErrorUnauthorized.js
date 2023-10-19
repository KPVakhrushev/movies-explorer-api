const httpConstants = require('http2').constants;
const { ERRORS } = require('../constants');

module.exports = class ErrorUnauthorized extends Error {
  constructor(message = ERRORS.AUTHORIZATION) {
    super(message);
    this.code = httpConstants.HTTP_STATUS_UNAUTHORIZED;
  }
};
