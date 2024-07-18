const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  databaseConfig: {
    url: process.env.DB_URL,
    options: {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // You might want to set this to true in a production environment for better security
        },
      },
      logging: false, // Disable logging; default: console.log
    },
  },
};