const { sequelize }= require('../config/connection');
const Users = require('./Users');
const Review = require('./Review');
const Restroom = require('./Restroom');
// const Reaction = require('./Reaction');
// const Photo = require('./Photo');
// const Emoji = require('./Emoji');
// const Category = require('./Category');

// Define model associations

// A User can have many Reviews
Users.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(Users, { foreignKey: 'user_id' });

// A Restroom can have many Reviews
Restroom.hasMany(Review, { foreignKey: 'restroom_id' });
Review.belongsTo(Restroom, { foreignKey: 'restroom_id' });

// A Review can have many Reactions
// Review.hasMany(Reaction, { foreignKey: 'review_id' });
// Reaction.belongsTo(Review, { foreignKey: 'review_id' });

// A User can have many Reactions
// Users.hasMany(Reaction, { foreignKey: 'user_id' });
// Reaction.belongsTo(Users, { foreignKey: 'user_id' });

// A Restroom can have many Photos
// Restroom.hasMany(Photo, { foreignKey: 'restroom_id' });
// Photo.belongsTo(Restroom, { foreignKey: 'restroom_id' });

// A User can have many Photos
// Users.hasMany(Photo, { foreignKey: 'user_id' });
// Photo.belongsTo(Users, { foreignKey: 'user_id' });

// A Category can have many Restrooms
// Category.hasMany(Restroom, { foreignKey: 'category_id' });
// Restroom.belongsTo(Category, { foreignKey: 'category_id' });


// Export models and sequelize instance
module.exports = {
  Users,
  Review,
  Restroom,
  // Reaction,
  // Photo,
  // Emoji,
  // Category,
  sequelize,
};
