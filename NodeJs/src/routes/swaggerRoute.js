const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../middlewares/swaggerMiddleware');

const router = express.Router();

// Serve Swagger UI
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router;
