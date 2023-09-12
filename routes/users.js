const router = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const validation = require('../validations/user');

const updateCheck = [validation.updateCheck(), validation.errors()];

router.route('/me')
  .get(getMe)
  .patch(updateCheck, updateUser);

module.exports = router;
