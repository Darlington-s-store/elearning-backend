require('dotenv').config();
const pool = require('./pool');

async function run() {
    try {
        await pool.query("ALTER TABLE subjects ADD COLUMN IF NOT EXISTS level TEXT;");
        await pool.query("ALTER TABLE subjects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';");
        console.log("Columns added successfully");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

run();
