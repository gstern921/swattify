import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './app.config';

const dbOptions = {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
};

const db = new Sequelize(DATABASE_URL, dbOptions);

export default db;
