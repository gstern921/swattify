import { Options, Sequelize } from 'sequelize';
import { DATABASE_URL } from './app.config';

const dbOptions: Options = {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
};

const db: Sequelize = new Sequelize(DATABASE_URL as string, dbOptions);

export default db;
