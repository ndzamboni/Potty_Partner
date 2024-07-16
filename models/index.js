const Sequelize = require('sequelize');

// Import the connection configuration
const sequelize = require('../config/connection');


module.exports = { Users, sequelize };
    
// DO WE NEED TO CHANGE EVERYTHING TO "UsersS" IN THIS FILE?

// Import all models
const Users = require('./Users'); //Userss?
const Review = require('./Review');
const Restroom = require('./Restroom');
const Reaction = require('./Reaction');
const Photo = require('./Photo');
const Emoji = require('./Emoji');
const Category = require('./Category');

// Define model associations

// A Users can have many Reviews
Users.hasMany(Review, { foreignKey: 'Users_id' }); //does this need to be "Userss_id"?
Review.belongsTo(Users, { foreignKey: 'Users_id' }); //does this need to be "Userss_id"?

// A Restroom can have many Reviews
Restroom.hasMany(Review, { foreignKey: 'restroom_id' });
Review.belongsTo(Restroom, { foreignKey: 'restroom_id' });

// A Review can have many Reactions
Review.hasMany(Reaction, { foreignKey: 'review_id' });
Reaction.belongsTo(Review, { foreignKey: 'review_id' });

// A Users can have many Reactions
Users.hasMany(Reaction, { foreignKey: 'Users_id' }); //does this need to be "Userss_id"?
Reaction.belongsTo(Users, { foreignKey: 'Users_id' }); //does this need to be "Userss_id"?

// A Restroom can have many Photos
Restroom.hasMany(Photo, { foreignKey: 'restroom_id' });
Photo.belongsTo(Restroom, { foreignKey: 'restroom_id' });

// A Users can have many Photos
Users.hasMany(Photo, { foreignKey: 'Users_id' }); //does this need to be "Userss_id"?
Photo.belongsTo(Users, { foreignKey: 'Users_id' }); //does this need to be "Userss_id"?

// A Category can have many Restrooms
Category.hasMany(Restroom, { foreignKey: 'category_id' });
Restroom.belongsTo(Category, { foreignKey: 'category_id' });

// Export models and sequelize instance
module.exports = {
  Users, //Userss?
  Review,
  Restroom,
  Reaction,
  Photo,
  Emoji,
  Category,
  sequelize,
};
