const mysql = require('mysql2/promise');
const dotenv = require('dotenv')
// Load environment variables from a .env file
dotenv.config();
// Load a connection pool from env vars. Keep the pool small for local use and allow
// enough connections for light concurrent work.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
