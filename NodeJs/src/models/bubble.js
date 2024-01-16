// src/models/bubble.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Bubble extends Model { }

Bubble.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Bubble',
        tableName: 'bubble_location',
        timestamps: false,
    }
);

module.exports = Bubble;
