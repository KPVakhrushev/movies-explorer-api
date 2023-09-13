const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/', authRouter);
  app.use('/users', auth, usersRouter);
  app.use('/movies', auth, moviesRouter);
};
