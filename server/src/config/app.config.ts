import {} from '../constants/constants';

const { NODE_ENV = 'development' } = process.env;

export const { PORT = '3001' } = process.env;

export const REQUIRED_ENVIRONMENT_VARIABLES = [
  'PORT',
  'DATABASE_URL',
  'SESSION_COOKIE_NAME',
  'SESSION_SECRET',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
];
export const IS_PROD = NODE_ENV.toLowerCase() === 'production';
export const { DATABASE_URL } = process.env;
export const CLIENT_URL = 'http://localhost:3000';
export const { SESSION_COOKIE_NAME } = process.env;
export const { SESSION_SECRET } = process.env;
export const { GITHUB_CLIENT_ID } = process.env;
export const { GITHUB_CLIENT_SECRET } = process.env;
export const GITHUB_CALLBACK_URL = 'http://localhost:3001/auth/github/callback';

export const BCRYPT_SALT_ROUNDS = 12;

export const SUCCESS = 'success';
export const FAIL = 'fail';
export const ERROR = 'error';
