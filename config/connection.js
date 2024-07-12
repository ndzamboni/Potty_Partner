const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const config = require('./config');

dotenv.config();

const potty_partner_db = new Sequelize(
  config.potty_partner_db.database,
  config.potty_partner_db.username,
  config.potty_partner_db.password,
  {
    host: config.potty_partner_db.host,
    dialect: config.potty_partner_db.dialect,
  }
);

module.exports = { potty_partner_db };
