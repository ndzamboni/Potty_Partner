const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cleanliness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessibility: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    privacy_security: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    convenience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customer_only_use: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    timestamps: false,
  }
);

module.exports = Category;