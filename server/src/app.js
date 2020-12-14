const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connectSequelize = require('connect-session-sequelize');
const db = require('./models').sequelize;
const authRouter = require('./routers/authRouter');
const configPassport = require('./config/passport');

const { IS_PROD, CLIENT_URL, SESSION_COOKIE_NAME, SESSION_SECRET } = require('./config/app.config');

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
  // console.log('req.user ', req.user);
  // console.log('cookies:', req.cookies);
  // console.log('authenticated?: ', req.isAuthenticated());
  // console.log('unauthenticated?: ', req.isUnauthenticated());
  // console.log('co');
  next();
});

app.use('/', require('./indexRouter'));
app.use('/api/v1/me', require('./routers/meRouter'));
app.use('/api/v1/projects', require('./routers/projectRouter'));
app.use('/api/v1/bug-reports', require('./routers/bugReportRouter'));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
app.use('/api/v1/auth', authRouter);

module.exports = app;
