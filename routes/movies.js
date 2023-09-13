const router = require('express').Router();
const { create, get, remove } = require('../controllers/movies');

const validation = require('../validations/movie');
const valiadtionId = require('../validations/objectId');

const fullCheck = [validation.check(), validation.errors()];
const idCheck = [valiadtionId.check('id'), validation.errors()];

router.route('/')
  .get(get)
  .post(fullCheck, create);

router.route('/:id')
  .delete(idCheck, remove);

module.exports = router;
