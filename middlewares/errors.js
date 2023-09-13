const { errors } = require('celebrate');
const { errorLogger } = require('./logger');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotfound = require('../errors/ErrorNotfound');
const ErrorDefault = require('../errors/ErrorDefault');
const { MSG_PAGE_NOT_FOUND, ERROR_CODES } = require('../constants');

module.exports = [
  /* ошибки celebrate */
  errors(),
  /* 404 */
  () => {
    throw new ErrorNotfound(MSG_PAGE_NOT_FOUND);
  },
  /* логер ошибок */
  errorLogger,
  /* ошибки без кода */
  (err, req, res, next) => {
    if (err.code) return (next(err));
    switch (ERROR_CODES[err.name]) {
      case 400: throw new ErrorBadRequest(err.message);
      default: throw new ErrorDefault();
    }
  },
  /* ответ с ошибкой */
  (err, req, res, next) => {
    res.status(err.code).send({ message: err.message });
    next();
  },
];
