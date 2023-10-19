require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const { requestLogger } = require('./middlewares/logger');
const { PORT, DB_CONNECTION, LIMITER } = require('./config');

const limiter = rateLimit(LIMITER);

const app = express();
mongoose.connect(DB_CONNECTION);

app.use(helmet());
app.use(requestLogger);
app.use(cors);
app.use(limiter);
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }), cookieParser());

require('./routes/index')(app);

app.use(errors);

app.listen(PORT, console.log(`App listening on port ${PORT}`));
