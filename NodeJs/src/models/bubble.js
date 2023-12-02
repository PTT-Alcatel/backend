// src/models/bubble.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Bubble extends Model { }

Bubble.init(
    {
        bubble_GUID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        creator: {
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
