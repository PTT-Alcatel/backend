// Import the Express module
const express = require('express');

// Create a router instance
const router = express.Router();

// Import the bubblesController module for handling bubble-related requests
const bubblesController = require('../controllers/bubblesController');

// Routes:

// Route: GET /bubbles
// Action: Get all bubbles
router.get('/bubbles', bubblesController.getAllBubbles);

// Route: GET /bubbles/:id
// Action: Get a specific bubble by its ID
router.get('/bubbles/:id', bubblesController.getBubbleById);

// Route: POST /bubbles
// Action: Create a new bubble
router.post('/bubbles', bubblesController.createBubble);

// Route: PUT /bubbles/:id
// Action: Update a specific bubble by its ID
router.put('/bubbles/:id', bubblesController.updateBubble);

// Route: DELETE /bubbles/:id
// Action: Delete a specific bubble by its ID
router.delete('/bubbles/:id', bubblesController.deleteBubble);

// Export the router for use in other parts of the application
module.exports = router;
