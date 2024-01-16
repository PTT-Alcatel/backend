// Import the Express app from the './src/app' module
const app = require('./src/app');

// Define the port number to use, either from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server by listening on the specified port
const server = app.listen(PORT, () => {
    // Log a message when the server starts, indicating the URL it's running on
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle app termination (close the server gracefully)
process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing the server...');

    // Close the server and perform any cleanup if needed
    server.close((err) => {
        if (err) {
            // Log an error message if closing the server encounters an error
            console.error('Error closing the server:', err.message);
            process.exit(1);
        }

        // Log a message if the server is closed successfully
        console.log('Server closed');
        process.exit(0);
    });
});