const { NODE_ENV = 'development' } = process.env;
module.exports.NODE_ENV = NODE_ENV;

module.exports.PORT = process.env.PORT || '3001';

module.exports.REQUIRED_ENVIRONMENT_VARIABLES = [
  'PORT',
  'DATABASE_URL',
  'SESSION_COOKIE_NAME',
  'SESSION_SECRET',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
];
module.exports.IS_PROD = NODE_ENV.toLowerCase() === 'production';
module.exports.DATABASE_URL = process.env.DATABASE_URL;
module.exports.CLIENT_URL = 'http://localhost:3000';
module.exports.SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME;
module.exports.SESSION_SECRET = process.env.SESSION_SECRET;
module.exports.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
module.exports.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
module.exports.GITHUB_CALLBACK_URL = 'http://localhost:3001/auth/github/callback';

module.exports.BCRYPT_SALT_ROUNDS = 12;

module.exports.SUCCESS = 'success';
module.exports.FAIL = 'fail';
module.exports.ERROR = 'error';
