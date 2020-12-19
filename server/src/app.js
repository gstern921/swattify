const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connectSequelize = require('connect-session-sequelize');
const { StatusCodes } = require('http-status-codes');
const db = require('./models').sequelize;
const configPassport = require('./config/passport');

const { IS_PROD, CLIENT_URL, SESSION_COOKIE_NAME, SESSION_SECRET, ERROR } = require('./config/app.config');

const { INTERNAL_SERVER_ERROR } = StatusCodes;

const app = express();
app.set('trust proxy', 1);

if (!IS_PROD) {
  app.use(logger('dev'));
}
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const SequelizeStore = connectSequelize(session.Store);

app.use((req, res, next) => {
  // console.log(req.body);
  next();
});
app.use(
  session({
    name: SESSION_COOKIE_NAME,
    secret: SESSION_SECRET,
    cookie: {
      secure: IS_PROD,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db, tableName: 'sessions' }),
  }),
);

configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log(req.query)
  next();
});

app.use('/api/v1/users', require('./routers/userRouter'));
app.use('/api/v1/projects', require('./routers/projectRouter'));
app.use('/api/v1/bug-reports', require('./routers/bugReportRouter'));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routers/authRouter'));

app.use((err, req, res, next) => {
  if (!IS_PROD) {
    if (err.isOperational) {
      return res.status(err.status).json({ status: err.responseStatus, message: err.message, err });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, err });
  }

  if (err.isOperational) {
    return res.status(err.status).json({ status: err.responseStatus, message: err.message });
  }
  return res.status(500).json({ status: ERROR, message: 'Something went wrong' });
});

module.exports = app;
