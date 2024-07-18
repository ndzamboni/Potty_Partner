// const {models, dataTypes} = require('sequelize');
// const sequelize = require('../config/connection');

// class Emoji extends models {}

// Emoji.init(
//     {
//         id: {
//             type: dataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         user_id: {
//             type: dataTypes.INTEGER,
//             references: {
//                 model: 'user',
//                 key: 'id'
//             }
//         },
//         post_id: {
//             type: dataTypes.INTEGER,
//             references: {
//                 model: 'post',
//                 key: 'id'
//             }
//         }
//     },
//     {
//         sequelize,
//         modelName: 'emoji',
//         timestamps: true
//     }
// );

// module.exports = Emoji;