const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { ERRORS } = require('../constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new ErrorUnauthorized(ERRORS.NO_TOKEN);
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    next(new ErrorUnauthorized(ERRORS.BAD_TOKEN));
  }
};
