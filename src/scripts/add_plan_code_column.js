require('dotenv').config();
const pool = require('../db/pool');

async function migrate() {
    try {
        console.log('Adding paystack_plan_code column to plans table...');

        await pool.query(`
            ALTER TABLE plans 
            ADD COLUMN IF NOT EXISTS paystack_plan_code VARCHAR(255);
        `);

        console.log('Column added successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
    }
}

migrate();
