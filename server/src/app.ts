import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import connectSequelize from 'connect-session-sequelize';
import db from './config/db';
import authRouter from './routes/auth';
import configPassport from './config/passport';

import { IS_PROD, CLIENT_URL, SESSION_COOKIE_NAME, SESSION_SECRET } from './config/app.config';
import passport from 'passport';
// import passport from 'passport';
// import session from 'express-session';

const app = express();
app.set('trust proxy', 1);

configPassport(passport);

if (!IS_PROD) {
  app.use((logger as any)('dev'));
}
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SequelizeStore = connectSequelize(session.Store);

app.use(
  session({
    name: SESSION_COOKIE_NAME,
    secret: SESSION_SECRET as string,
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
