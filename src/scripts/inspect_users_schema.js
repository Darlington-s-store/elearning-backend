require('dotenv').config();
const pool = require('../db/pool');

async function inspect() {
    try {
        const result = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users';
        `);
        console.log('Users Table Schema:', result.rows);
        process.exit(0);
    } catch (error) {
        console.error('Inspection Failed:', error);
        process.exit(1);
    }
}

inspect();
