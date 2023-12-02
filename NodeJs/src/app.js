// Import Express
const express = require('express');

// Create an Express app instance
const api = express();

// Import middleware and routes
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const bubblesRoutes = require('./routes/bubblesRoute');
const swaggerRoutes = require('./routes/swaggerRoute');

// Middleware: Parse incoming JSON requests
api.use(express.json());

// Routes: Use the 'bubblesRoutes' for handling bubble-related requests
api.use('/', bubblesRoutes);

// Routes: Use the 'swaggerRoutes' for handling swagger-related requests
api.use('/', swaggerRoutes);

// Middleware: Use the 'errorHandler' to handle errors globally
api.use(errorHandler);

// Export the configured Express application
module.exports = api;
