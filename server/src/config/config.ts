const NODE_ENV = process.env.NODE_ENV || 'development';

export const IS_PROD = NODE_ENV.toLowerCase() === 'production';
export const DATABASE_URL = process.env.DATABASE_URL;
