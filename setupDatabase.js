const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Read SQL file
const sql = fs.readFileSync(path.join(__dirname, 'causeconnect.sql')).toString();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true // Allows execution of multiple SQL statements in one query
});

// Connect to MySQL and run the SQL file
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL.');

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL:', err);
        } else {
            console.log('Database setup completed.');
        }
        db.end();
    });
});
