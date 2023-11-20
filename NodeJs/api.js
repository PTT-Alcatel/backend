const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const api = express();
const PORT = process.env.PORT || 3000;

// Create a connection pooling (better performance and scalability than mysql.createConnection)
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'alcatel',
    password: process.env.DB_PASSWORD || 'alcatel',
    database: process.env.DB_NAME || 'PTT'
});

// Connect to the database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

// Middleware to parse JSON requests
api.use(express.json());

// Define a route to get all bubbles
api.get('/bubbles', (req, res, next) => {
    // Retrieve all bubbles from the database
    pool.query('SELECT * FROM bubble_location', (err, results) => {
        if (err) {
            // Pass the error to the next middleware
            next(err);
        } else {
            // Check the requested format (HTML or JSON)
            const format = req.query.format || 'json';
            if (format === 'html') {
                // Format the results as an HTML table
                const htmlResult = `
                <html>
                    <head>
                        <title>Bubble List</title>
                        <style>
                            table {
                                font-family: Arial, sans-serif;
                                border-collapse: collapse;
                                width: 100%;
                            }
                            th, td {
                                border: 1px solid #dddddd;
                                text-align: left;
                                padding: 8px;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Bubble List</h2>
                        <table>
                            <tr>
                                <th>bubble_GUID</th>
                                <th>name</th>
                                <th>latitude</th>
                                <th>longitude</th>
                                <th>creator</th>
                            </tr>
                            ${results.map(bubble => `
                                <tr>
                                    <td>${bubble.bubble_GUID}</td>
                                    <td>${bubble.name}</td>
                                    <td>${bubble.latitude}</td>
                                    <td>${bubble.longitude}</td>
                                    <td>${bubble.creator}</td>
                                </tr>`).join('')}
                        </table>
                    </body>
                </html>
            `;
                res.send(htmlResult);
            }
            else {
                // Send the results as JSON
                res.json(results);
            }
        };
    })
});

// Define a route to create a new bubble
api.post('/bubbles', (req, res, next) => {
    const { name, latitude, longitude, creator } = req.body;
    if (!name || !latitude || !longitude || !creator) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }
    pool.query(
        'INSERT INTO bubble_location (name, latitude, longitude, creator) VALUES (?, ?, ?, ?)',
        [name, latitude, longitude, creator],
        (err, results) => {
            if (err) {
                next(err);
            } else {
                res.status(201).json({ message: 'Bubble added successfully.', insertId: results.insertId });
            }
        }
    );
});

// Update a bubble by ID
api.put('/bubbles/:id', (req, res, next) => {
    const bubbleId = req.params.id;
    const { name, latitude, longitude, creator } = req.body;
    if (!name || !latitude || !longitude || !creator) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    pool.query(
        'UPDATE bubble_location SET name=?, latitude=?, longitude=?, creator=? WHERE bubble_GUID=?',
        [name, latitude, longitude, creator, bubbleId],
        (err, results) => {
            if (err) {
                next(err);
            } else {
                res.json({ message: 'Bubble updated successfully' });
            }
        }
    );
});

// Delete a bubble by ID
api.delete('/bubbles/:id', (req, res, next) => {
    const bubbleId = req.params.id;
    pool.query(
        'DELETE FROM bubble_location WHERE bubble_GUID=?',
        [bubbleId],
        (err, results) => {
            if (err) {
                next(err);
            } else {
                res.json({ message: 'Bubble deleted successfully' });
            }
        }
    );
});

// Error handling middleware
api.use((err, req, res, next) => {
    console.error("An error occured", err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Close the database connection on application shutdown
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Closed out remaining database connections.');
        process.exit(0);
    });
});

// Start the server
api.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});