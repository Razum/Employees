import knex from 'knex';
import knexConfig from './knexfile';

const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];

export default knex(config);
