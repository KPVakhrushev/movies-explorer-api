const httpConstants = require('http2').constants;
const Movie = require('../models/movie');
const ErrorNotfound = require('../errors/ErrorNotfound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const { MSG_MOVIE_NOT_FOUND } = require('../constants');

const send = (movie, res, next) => {
  if (movie) res.send(movie);
  else next(new ErrorNotfound(MSG_MOVIE_NOT_FOUND));
};

module.exports.get = (req, res, next) => {
  Movie.find({ owner: req.user._id }).sort({ createdAt: -1 })
    .then((movies) => res.send(movies))
    .catch(next);
};
module.exports.create = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(httpConstants.HTTP_STATUS_CREATED).send(movie))
    .catch(next);
};
module.exports.remove = (req, res, next) => {
  const _id = req.params.id;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) throw new ErrorNotfound(MSG_MOVIE_NOT_FOUND);
      if (req.user._id !== movie.owner.toString()) throw new ErrorForbidden();
      Movie.deleteOne({ _id })
        .then(() => send(movie, res, next));
    })
    .catch(next);
};
