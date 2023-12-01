// Import the database service (MySQL connection pool)
const pool = require('../services/databaseService');

// Define a class representing the Bubble model
class Bubble {
    // Constructor to create a Bubble object with provided data
    constructor(bubbleData) {
        if (bubbleData) {
            this.bubble_GUID = bubbleData.bubble_GUID;
            this.name = bubbleData.name;
            this.latitude = bubbleData.latitude;
            this.longitude = bubbleData.longitude;
            this.creator = bubbleData.creator;
        }
    }

    // Static method to get all bubbles from the database
    static getAllBubbles(callback) {
        pool.query('SELECT * FROM bubble_location', (err, results) => {
            if (err) {
                // Pass the error to the callback
                callback(err, null);
            } else {
                // Map the query results to an array of Bubble objects
                const bubbles = results.map((bubbleData) => new Bubble(bubbleData));
                // Pass the array of Bubble objects to the callback
                callback(null, bubbles);
            }
        });
    }

    // Static method to get a specific bubble by its ID from the database
    static getBubbleById(bubbleId, callback) {
        pool.query('SELECT * FROM bubble_location WHERE bubble_GUID = ?', [bubbleId], (err, results) => {
            if (err) {
                // Pass the error to the callback
                callback(err, null);
            } else {
                // Check if the result set is empty
                if (results.length === 0) {
                    // Pass a custom error message to the callback
                    callback({ message: 'Bubble not found' }, null);
                } else {
                    // Create a Bubble object with the first result and pass it to the callback
                    const bubble = new Bubble(results[0]);
                    callback(null, bubble);
                }
            }
        });
    }

    // Static method to create a new bubble in the database
    static createBubble(newBubbleData, callback) {
        pool.query('INSERT INTO bubble_location SET ?', newBubbleData, (err, result) => {
            if (err) {
                // Pass the error to the callback
                callback(err, null);
            } else {
                // Create a Bubble object with the inserted data and pass it to the callback
                const createdBubble = new Bubble({ ...newBubbleData, bubble_GUID: result.insertId });
                callback(null, { message: 'Bubble created successfully', bubble: createdBubble });
            }
        });
    }

    // Static method to update a specific bubble in the database
    static updateBubble(bubbleId, updatedBubbleData, callback) {
        pool.query('UPDATE bubble_location SET ? WHERE bubble_GUID = ?', [updatedBubbleData, bubbleId], (err, result) => {
            if (err) {
                // Pass the error to the callback
                callback(err, null);
            } else {
                // Check if the update affected no rows (bubble not found)
                if (result.affectedRows === 0) {
                    // Pass a custom error message to the callback
                    callback({ message: 'Bubble not found' }, null);
                } else {
                    // Pass a success message to the callback
                    callback(null, { message: 'Bubble updated successfully' });
                }
            }
        });
    }

    // Static method to delete a specific bubble from the database
    static deleteBubble(bubbleId, callback) {
        pool.query('DELETE FROM bubble_location WHERE bubble_GUID = ?', [bubbleId], (err, result) => {
            if (err) {
                // Pass the error to the callback
                callback(err, null);
            } else {
                // Check if the deletion affected no rows (bubble not found)
                if (result.affectedRows === 0) {
                    // Pass a custom error message to the callback
                    callback({ message: 'Bubble not found' }, null);
                } else {
                    // Pass a success message to the callback
                    callback(null, { message: 'Bubble deleted successfully' });
                }
            }
        });
    }
}

// Export the Bubble class for use in other parts of the application
module.exports = Bubble;
