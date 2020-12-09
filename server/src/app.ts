import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { IS_PROD, CLIENT_URL } from './config/app.config';

const app = express();

if (!IS_PROD) {
  app.use((logger as any)('dev'));
}

app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (_req, res, _next) => {
  res.send('hello');
});
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('/auth', require('./routes/auth'));

export default app;
