const { Sequelize } = require('sequelize');
const config = require('./config');

const publicDb = new Sequelize(
  config.publicDb.database,
  config.publicDb.username,
  config.publicDb.password,
  {
    host: config.publicDb.host,
    dialect: config.publicDb.dialect,
  }
);

const privateDb = new Sequelize(
  config.privateDb.database,
  config.privateDb.username,
  config.privateDb.password,
  {
    host: config.privateDb.host,
    dialect: config.privateDb.dialect,
  }
);

module.exports = { publicDb, privateDb };
