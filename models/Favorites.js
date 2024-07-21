const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Favorite extends Model {}

Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restroom_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Favorite',
  tableName: 'Favorites',
});

module.exports = Favorite;
