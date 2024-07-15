const Sequelize = require('sequelize');

const sequelize = require('../config/connection');

const User = require('./User');

module.exports = { User, sequelize };
    
