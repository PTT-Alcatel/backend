const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger.config');

const router = express.Router();

// Serve Swagger UI
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router;
