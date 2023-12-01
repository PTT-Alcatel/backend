// Import the Express module
const express = require('express');

// Create an instance of the Express application
const api = express();

// Import routes for handling bubble-related requests
const bubblesRoutes = require('./routes/bubblesRoute');

// Import the error handler middleware
const errorHandler = require('./middlewares/errorHandler');

// Middleware: Parse incoming JSON requests
api.use(express.json());

// Middleware: Use the 'bubblesRoutes' to handle requests at the root path '/'
api.use('/', bubblesRoutes);

// Middleware: Use the 'errorHandler' to handle errors globally
api.use(errorHandler);

// Export the configured Express application
module.exports = api;
