const {model, dataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends model {}

Photo.init(
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'photo',
        timestamps: true
    }
);