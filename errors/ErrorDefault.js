const httpConstants = require('http2').constants;
const { MSG_SERVER_ERROR } = require('../constants');

module.exports = class ErrorVlidation extends Error {
  constructor(message = MSG_SERVER_ERROR) {
    super(message);
    this.code = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
};
