// Import the Express module
const express = require('express');

// Create a router instance
const router = express.Router();

// Import the bubblesController module for handling bubble-related requests
const bubblesController = require('../controllers/bubblesController');

/**
 * @swagger
 * tags:
 *   name: Bubbles
 *   description: API endpoints for managing bubbles
 * components:
 *   schemas:
 *     Bubble:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         creator:
 *           type: string
 *       required:
 *         - name
 *         - latitude
 *         - longitude
 *         - creator
 */

/**
 * @swagger
 * /bubbles:
 *   get:
 *     summary: Get all bubbles
 *     description: Get all bubbles
 *     tags: [Bubbles]
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get('/bubbles', bubblesController.getAllBubbles);

/**
 * @swagger
 * /bubbles/{id}:
 *   get:
 *     summary: Get a bubble by ID
 *     description: Get a bubble by its ID
 *     tags: [Bubbles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the bubble
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Bubble not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/bubbles/:id', bubblesController.getBubbleById);

/**
 * @swagger
 * /bubbles:
 *   post:
 *     summary: Create a new bubble
 *     description: Create a new bubble
 *     tags: [Bubbles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bubble'
 *           example:
 *             name: 'UIMM Alsace'
 *             latitude: 48.590650
 *             longitude: 7.685010
 *             creator: "Golem XIV"
 *     responses:
 *       200:
 *         description: Bubble created successfully
 *       400:
 *         description: Bad Request. Missing required information.
 *       500:
 *         description: Internal Server Error
 */
router.post('/bubbles', bubblesController.createBubble);

/**
 * @swagger
 * /bubbles/{id}:
 *   put:
 *     summary: Update a bubble by ID
 *     description: Update a bubble by its ID
 *     tags: [Bubbles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the bubble
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bubble'
 *           example:
 *             name: 'Bulle modifiée'
 *             latitude: 48.590650
 *             longitude: 7.685010
 *             creator: "Bulle modifiée"
 *     responses:
 *       200:
 *         description: Bubble updated successfully
 *       404:
 *         description: Bubble not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/bubbles/:id', bubblesController.updateBubble);

/**
 * @swagger
 * /bubbles/{id}:
 *   delete:
 *     summary: Delete a bubble by ID
 *     description: Delete a bubble by its ID
 *     tags: [Bubbles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the bubble
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bubble deleted successfully
 *       404:
 *         description: Bubble not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/bubbles/:id', bubblesController.deleteBubble);

// Export the router for use in other parts of the application
module.exports = router;
