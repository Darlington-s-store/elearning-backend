require('dotenv').config();
const pool = require('../db/pool');

async function inspect() {
    try {
        console.log('--- teacher_subjects ---');
        const ts = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'teacher_subjects';
        `);
        console.log(ts.rows);

        console.log('--- user_xp ---');
        const ux = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user_xp';
        `);
        console.log(ux.rows);

        process.exit(0);
    } catch (error) {
        console.error('Inspection Failed:', error);
        process.exit(1);
    }
}

inspect();
