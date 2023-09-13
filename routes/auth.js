const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const validationUser = require('../validations/user');
const auth = require('../middlewares/auth');

router.post('/signin', validationUser.authCheck(), login);
router.post('/signup', validationUser.fullCheck(), createUser);
router.post('/logout', auth, logout);

module.exports = router;
