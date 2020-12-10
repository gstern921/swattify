const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const connectSequelize = require('connect-session-sequelize');
const db = require('./config/db');
const authRouter = require('./routes/auth');
const configPassport = require('./config/passport');

const { IS_PROD, CLIENT_URL, SESSION_COOKIE_NAME, SESSION_SECRET } = require('./config/app.config');
const passport = require('passport');
// import passport from 'passport';
// import session from 'express-session';

const a = 1;

const app = express();
app.set('trust proxy', 1);

configPassport(passport);

if (!IS_PROD) {
  app.use(logger('dev'));
}
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SequelizeStore = connectSequelize(session.Store);

app.use(
  session({
    name: SESSION_COOKIE_NAME,
    secret: SESSION_SECRET,
    cookie: {
      secure: IS_PROD,
      sameSite: 'lax',
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db }),
    proxy: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_req, res, _next) => {
  res.send('hello');
});

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
app.use('/auth', authRouter);

export default app;
