// Controller for the bubbles routes
const bubblesService = require('../services/bubblesService');
const errorHandler = require('../middlewares/errorHandlerMiddleware');
const bubble = require('../models/bubble');

// Get all bubbles
function getAllBubbles(req, res) {
    // Call the getAllBubbles method from the Bubble model
    bubble.getAllBubbles((err, results) => {
        if (err) {
            // If an error occurs, pass it to the errorHandler middleware
            errorHandler(err, req, res);
        } else {
            // If successful, send the results as JSON in the response
            res.json(results);
        }
    });
};

// Get a specific bubble by ID
function getBubbleById(req, res) {
    // Extract the bubble ID from the request parameters
    const bubbleId = req.params.id;

    // Call the getBubbleById method from the Bubble model
    bubble.getBubbleById(bubbleId, (err, result) => {
        if (err) {
            // If an error occurs, pass it to the errorHandler middleware
            errorHandler(err, req, res);
        } else {
            // If successful, send the result as JSON in the response
            res.json(result);
        }
    });
};

// Create a new bubble
function createBubble(req, res) {
    // Extract new bubble data from the request body
    const newBubbleData = req.body;

    // Call the createBubble method from the Bubble model
    bubble.createBubble(newBubbleData, (err, result) => {
        if (err) {
            // If an error occurs, pass it to the errorHandler middleware
            errorHandler(err, req, res);
        } else {
            // If successful, send the result as JSON in the response
            res.json(result);
        }
    });
};

// Update a bubble
function updateBubble(req, res) {
    // Extract the bubble ID from the request parameters
    const bubbleId = req.params.id;
    // Extract updated bubble data from the request body
    const updatedBubbleData = req.body;

    // Call the updateBubble method from the Bubble model
    bubble.updateBubble(bubbleId, updatedBubbleData, (err, result) => {
        if (err) {
            // If an error occurs, pass it to the errorHandler middleware
            errorHandler(err, req, res);
        } else {
            // If successful, send the result as JSON in the response
            res.json(result);
        }
    });
};

// Delete a bubble
function deleteBubble(req, res) {
    // Extract the bubble ID from the request parameters
    const bubbleId = req.params.id;

    // Call the deleteBubble method from the Bubble model
    bubble.deleteBubble(bubbleId, (err, result) => {
        if (err) {
            // If an error occurs, pass it to the errorHandler middleware
            errorHandler(err, req, res);
        } else {
            // If successful, send the result as JSON in the response
            res.json(result);
        }
    });
};

// Export the controller functions for use in other parts of the application
module.exports = {
    getAllBubbles,
    getBubbleById,
    createBubble,
    updateBubble,
    deleteBubble,
};
