const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  potty_party_db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  
};
