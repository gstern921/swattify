import express from 'express';
import cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import { IS_PROD } from './config/config';

const app = express();

if (!IS_PROD) {
  app.use((logger as any)('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('/auth', require('./routes/auth'));

export default app;
