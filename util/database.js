const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsmain',
    password: 'mysql555'
});

module.exports = pool.promise();