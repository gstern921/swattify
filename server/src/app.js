const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const connectSequelize = require('connect-session-sequelize');
const connectRedis = require('connect-redis');
const db = require('./infrastructure/db/db');
const authRouter = require('./infrastructure/auth/auth-router');
const configPassport = require('./config/passport');

const { IS_PROD, CLIENT_URL, SESSION_COOKIE_NAME, SESSION_SECRET } = require('./config/app.config');

// import passport from 'passport';
// import session from 'express-session';

const app = express();
app.set('trust proxy', 1);

app.use(express.static(path.join(__dirname, 'public')));

if (!IS_PROD) {
  app.use(logger('dev'));
}
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const RedisStore = connectRedis(session);
// const SequelizeStore = connectSequelize(session.Store);

const redisClient = redis.createClient();

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
    store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
  }),
);

configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log('req.user ', req.user);
  // console.log('cookies:', req.cookies);
  // console.log('authenticated?: ', req.isAuthenticated());
  // console.log('unauthenticated?: ', req.isUnauthenticated());
  // console.log('co');
  next();
});

app.use('/', require('./indexRouter'));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
app.use('/auth', authRouter);

module.exports = app;
