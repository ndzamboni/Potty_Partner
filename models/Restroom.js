const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Restroom extends Model {}

Restroom.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  place_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  map: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  types: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Restroom',
  tableName: 'Restrooms',
});

module.exports = Restroom;
