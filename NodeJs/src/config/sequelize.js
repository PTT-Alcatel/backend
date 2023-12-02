// config/sequelize.js
const { Sequelize } = require('sequelize');
const config = require('./sequelize.config');

const sequelize = new Sequelize(config.development);

// Test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
