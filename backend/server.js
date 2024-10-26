// backend/src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pool = require('./db/config'); // Import the pool from config
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', ruleRoutes);

// Function to create tables from SQL file
const createTables = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '..', 'database', 'init.sql')).toString();
        await pool.query(sql);
        console.log('Database tables created successfully or already exist.');
    } catch (error) {
        console.error('Error creating database tables:', error);
        process.exit(1); // Exit the process on error
    }
};

// Call the function to create the tables
createTables();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
