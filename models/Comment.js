const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const Users = require('./Users');
const Review = require('./Review');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
  review_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Review,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Comment',
});

module.exports = Comment;
