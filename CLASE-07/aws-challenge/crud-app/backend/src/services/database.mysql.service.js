const mysql = require('mysql');
const { promisify } = require('util')

const pool = mysql.createPool({
    host: process.env.DB_URI,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection((err, connection) => {
    if (connection) connection.release();
    console.log("DB is connected")
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;