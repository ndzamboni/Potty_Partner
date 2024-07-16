const Sequelize = require('sequelize');

const sequelize = require('../config/connection');

const Users = require('../models/Users');

module.exports = { Users, sequelize };
    
