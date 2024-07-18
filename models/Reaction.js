const {model, dataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Reaction extends model {}

Reaction.init(
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reaction_id: {
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
        modelName: 'reaction',
        timestamps: true
    }
);