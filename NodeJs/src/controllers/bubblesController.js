// Controller for the bubbles routes
const bubblesService = require('../services/bubblesService');
const errorHandler = require('../middlewares/errorHandlerMiddleware');

// Get all bubbles
async function getAllBubbles(req, res) {
    try {
        const results = await bubblesService.getAllBubbles();
        res.json(results);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Get a specific bubble by ID
async function getBubbleById(req, res) {
    try {
        const bubbleId = req.params.id;
        const bubble = await bubblesService.getBubbleById(bubbleId);
        if (!bubble) {
            res.status(404).json({ error: 'Bubble not found' });
            return;
        }
        res.json(bubble);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Create a new bubble
async function createBubble(req, res) {
    try {
        const newBubbleData = req.body;
        const result = await bubblesService.createBubble(newBubbleData);
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Update a bubble
async function updateBubble(req, res) {
    try {
        const bubbleId = req.params.id;
        const updatedBubbleData = req.body;
        const [rowsAffected, message] = await bubblesService.updateBubble(bubbleId, updatedBubbleData);
        if (rowsAffected === 0) {
            res.status(404).json({ error: 'Bubble not found' });
            return;
        }
        res.json({ message });
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Delete a bubble
async function deleteBubble(req, res) {
    try {
        const bubbleId = req.params.id;
        const [rowsAffected, message] = await bubblesService.deleteBubble(bubbleId);
        if (rowsAffected === 0) {
            res.status(404).json({ error: 'Bubble not found' });
            return;
        }
        res.json({ message });
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Export the controller functions for use in other parts of the application
module.exports = {
    getAllBubbles,
    getBubbleById,
    createBubble,
    updateBubble,
    deleteBubble,
};
