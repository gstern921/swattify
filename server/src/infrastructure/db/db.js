const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('../../config/app.config');

const db = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

module.exports = db;
