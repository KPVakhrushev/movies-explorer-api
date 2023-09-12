const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');
const { URL_REGEX } = require('../config');

const joiLink = Joi.string().required().uri().pattern(URL_REGEX)
  .messages({ '*': 'Invalid URL' });
const joiString = Joi.string().required();

const keys = {
  country: joiString,
  director: joiString,
  duration: Joi.number().required(),
  year: joiString.pattern(/^(19|20)\d{2}$/i).messages({ '*': 'Year {year} is invalid' }),
  description: joiString,
  image: joiLink,
  trailerLink: joiLink,
  thumbnail: joiLink,
  movieId: Joi.number().required(),
  nameRU: joiString,
  nameEN: joiString,
};

module.exports = {
  ...keys,
  check: () => celebrate({
    [Segments.BODY]: Joi.object().keys(keys),
  }),
  errors,
};
