import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'src', '.env') });

const { NODE_ENV = 'development' } = process.env;

export const { PORT = '3001' } = process.env;
``;
export const IS_PROD = NODE_ENV.toLowerCase() === 'production';
export const DATABASE_URL = process.env.DATABASE_URL;
export const CLIENT_URL = 'http://localhost:3000';
