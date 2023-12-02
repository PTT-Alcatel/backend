// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Log the error details to the console
    console.error("An error occurred", err);

    // Check specific error conditions and provide custom messages

    // Check for MySQL error: ER_BAD_NULL_ERROR (Bad Request - Missing required information)
    if (err.code === 'ER_BAD_NULL_ERROR') {
        res.status(400).json({ error: 'Bad Request. Missing required information.' });
    }
    // Check for MySQL error: ER_DUP_ENTRY (Conflict - Duplicate entry found)
    else if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'Conflict. Duplicate entry found.' });
    }
    // Check for MySQL error: ER_ROW_IS_REFERENCED_2 (Not Found - Resource not found)
    else if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(404).json({ error: 'Not Found. Resource not found.' });
    }
    // Check for custom error message: 'Bubble not found' (Not Found - Bubble not found)
    else if (err.message === 'Bubble not found') {
        res.status(404).json({ error: 'Bubble not found' });
    }
    // If none of the specific error conditions match, return a generic Internal Server Error
    else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Export the middleware for use in other parts of the application
module.exports = errorHandler;
