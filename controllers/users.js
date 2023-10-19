const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotfound = require('../errors/ErrorNotfound');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorDefault = require('../errors/ErrorDefault');
const { SECRET, TOKEN_EXPIRES_IN } = require('../config');
const { ERRORS } = require('../constants');

const sendUserOrError = (user, res, next) => {
  if (user) res.send(user);
  else next(new ErrorNotfound('User not found'));
};
const getUserById = (id, req, res, next) => {
  User.findById(id)
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const {
    email, name, about, avatar, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, about, avatar, password: hash,
    }))
    .then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.code === 11000) next(new ErrorConflict(ERRORS.EMAIL_EXIST));
      else next(new ErrorDefault(ERRORS.REGISTRATION));
    });
};
module.exports.getUser = (req, res, next) => {
  getUserById(req.params.userId, req, res, next);
};
module.exports.getMe = (req, res, next) => {
  getUserById(req.user._id, req, res, next);
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, email }, { new: true, runValidators: true })
    .then((user) => sendUserOrError(user, res, next))
    .catch((err) => {
      if (err.code === 11000) next(new ErrorConflict(ERRORS.EMAIL_EXIST));
      else next(new ErrorDefault(ERRORS.REGISTRATION));
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      const authenticated = user && bcrypt.compareSync(password, user.password);
      if (!authenticated) throw new ErrorUnauthorized(ERRORS.BAD_CREDENTIALS);
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: TOKEN_EXPIRES_IN });
      res.cookie('jwt', token, { maxAge: TOKEN_EXPIRES_IN * 1000, httpOnly: true }).send(user);
    })
    .catch(() => next(new ErrorUnauthorized(ERRORS.BAD_CREDENTIALS)));
};
module.exports.logout = (req, res) => {
  res.clearCookie('jwt').end();
};
