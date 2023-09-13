const httpConstants = require('http2').constants;
const { MSG_FORBIDDEN } = require('../constants');

module.exports = class ErrorForbidden extends Error {
  constructor(message = MSG_FORBIDDEN) {
    super(message);
    this.code = httpConstants.HTTP_STATUS_FORBIDDEN;
  }
};
