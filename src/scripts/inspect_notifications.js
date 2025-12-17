require('dotenv').config();
const pool = require('../db/pool');

async function inspect() {
    try {
        console.log('--- Notifications ---');
        const res = await pool.query(`
            SELECT id, user_id, title, is_read FROM notifications LIMIT 10
        `);
        console.log(res.rows);
        process.exit(0);
    } catch (error) {
        console.error('Inspection Failed:', error);
        process.exit(1);
    }
}

inspect();
