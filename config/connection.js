const { Sequelize } = require('sequelize');
const { databaseConfig } = require('./config');

const sequelize = new Sequelize(databaseConfig.url, databaseConfig.options);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectToDatabase };