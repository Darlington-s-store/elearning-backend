const pool = require('../db/pool');
require('dotenv').config();

async function check() {
    console.log('Checking connection...');
    console.log('URL:', process.env.DATABASE_URL ? 'Defined (Starts with: ' + process.env.DATABASE_URL.substring(0, 15) + '...)' : 'Undefined');

    try {
        await pool.query('SELECT NOW()');
        console.log('Database Connected Successfully');
        process.exit(0);
    } catch (error) {
        console.error('Database Connection Failed:', error.message);
        process.exit(1);
    }
}

check();
