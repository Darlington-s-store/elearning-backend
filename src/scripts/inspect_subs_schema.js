require('dotenv').config();
const pool = require('../db/pool');

async function inspect() {
    try {
        console.log('--- subscriptions ---');
        const s = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'subscriptions';
        `);
        console.log(s.rows);

        console.log('--- plans ---');
        const p = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'plans';
        `);
        console.log(p.rows);

        process.exit(0);
    } catch (error) {
        console.error('Inspection Failed:', error);
        process.exit(1);
    }
}

inspect();
