import knex from 'knex';

import { DATABASE_URL } from './app.config';

const dbConfig = {
  client: 'pg',
  connection: DATABASE_URL,
};

export default knex(dbConfig);
