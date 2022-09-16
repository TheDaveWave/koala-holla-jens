// DB CONNECTION
const pg = require('pg');
const pool = new pg.Pool({
    database: 'koala_holla',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Connected to postgres');
});

pool.on('error', () => {
    console.log('Error connecting to postgres');
});

module.exports = pool;