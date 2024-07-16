const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./Users');
const Restroom = require('./Restroom');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    restroom_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Restroom,
        key: 'id',
      },
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
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    timestamps: true,
  }
);

module.exports = Review;