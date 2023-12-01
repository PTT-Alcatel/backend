// Import the MySQL2 module
const mysql = require('mysql2');

// Load environment variables from a .env file
require('dotenv').config();

// Create a connection pool for managing multiple connections
const pool = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: process.env.DB_HOST || 'localhost', // MySQL server host
    user: process.env.DB_USER || 'alcatel', // MySQL user
    password: process.env.DB_PASSWORD || 'alcatel', // MySQL password
    database: process.env.DB_NAME || 'PTT' // Default database name
});

// Attempt to connect to the MySQL database
pool.getConnection((err, connection) => {
    if (err) {
        // Log an error message if the connection attempt fails
        console.error('Error connecting to MySQL:', err);
    } else {
        // Log a success message if the connection is established and release the connection back to the pool
        console.log('Connected to MySQL database');
        connection.release();
    }
});

// Handle app termination (close the MySQL connections gracefully)
process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing MySQL pool...');

    // End the MySQL connection pool
    pool.end((err) => {
        if (err) {
            // Log an error message if closing the pool encounters an error
            return console.error('Error closing MySQL pool:', err.message);
        }
        // Log a message if the MySQL pool is closed successfully
        console.log('MySQL pool closed');
        // Terminate the Node.js process with a status code of 0
        process.exit(0);
    });
});

// Export the MySQL connection pool for use in other parts of the application
module.exports = pool;
