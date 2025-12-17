require('dotenv').config();
const pool = require('../db/pool');

async function inspect() {
    try {
        console.log('--- Notification Types ---');
        const res = await pool.query(`
            SELECT id, type, title FROM notifications LIMIT 10
        `);
        console.log(res.rows);
        process.exit(0);
    } catch (error) {
        console.error('Inspection Failed:', error);
        process.exit(1);
    }
}

inspect();
