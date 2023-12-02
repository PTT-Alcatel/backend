// config/sequelize.config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'alcatel',
    password: process.env.DB_PASSWORD || 'alcatel',
    database: process.env.DB_NAME || 'PTT',
    host: process.env.DB_HOST || 'mysql',
    dialect: 'mysql',
  },
};
