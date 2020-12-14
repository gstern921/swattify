const { Sequelize } = require('sequelize');
const { DATABASE_URL, DEV_DATABASE_URL, IS_PROD } = require('../../config/app.config');

const URL = IS_PROD ? DATABASE_URL : DEV_DATABASE_URL;

const DB_OPTIONS = {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: IS_PROD ? false : console.log,
};

if (IS_PROD) {
  DB_OPTIONS.dialectOptions = { ssl: { require: true, rejectUnauthorized: false } };
}

const db = new Sequelize(URL, DB_OPTIONS);
module.exports = db;
