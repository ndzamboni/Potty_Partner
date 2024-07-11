const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  publicDb: {
    username: process.env.DB_USER_PUBLIC,
    password: process.env.DB_PASS_PUBLIC,
    database: 'public_potty_party_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  privateDb: {
    username: process.env.DB_USER_PRIVATE,
    password: process.env.DB_PASS_PRIVATE,
    database: 'private_potty_party_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
