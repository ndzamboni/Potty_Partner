const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const config = require('./config');

dotenv.config();

const potty_party_db = new Sequelize(
  config.potty_party_db.database,
  config.potty_party_db.username,
  config.potty_party_db.password,
  {
    host: config.potty_party_db.host,
    dialect: config.potty_party_db.dialect,
  }
);

module.exports = { potty_party_db };
