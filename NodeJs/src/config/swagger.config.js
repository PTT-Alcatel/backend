const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Push To Talk API',
    version: '1.0.0',
    description: 'This is a API application made with Express for Push To Talk android app',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Adjust this based on your server configuration
    },
  ],
};

// Options for the Swagger JSdoc
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Adjust the path based on your route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
