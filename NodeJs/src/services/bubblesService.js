// services/bubbleService.js
const Bubble = require('../models/bubble');

class BubbleService {
    static async getAllBubbles() {
        return await Bubble.findAll();
    }

    static async getBubbleById(bubbleId) {
        return await Bubble.findByPk(bubbleId);
    }

    static async createBubble(newBubbleData) {
        return await Bubble.create(newBubbleData);
    }

    static async updateBubble(bubbleId, updatedBubbleData) {
        const [rowsAffected] = await Bubble.update(updatedBubbleData, {
            where: { bubble_GUID: bubbleId },
        });
        return [rowsAffected, rowsAffected === 0 ? 'Bubble not found' : 'Bubble updated successfully'];
    }

    static async deleteBubble(bubbleId) {
        const rowsAffected = await Bubble.destroy({
            where: { bubble_GUID: bubbleId },
        });
        return [rowsAffected, rowsAffected === 0 ? 'Bubble not found' : 'Bubble deleted successfully'];
    }
}

module.exports = BubbleService;
