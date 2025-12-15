const pool = require('./pool');

async function cleanupDuplicates() {
    try {
        console.log('Starting cleanup...');

        // 1. Get all subjects
        const result = await pool.query('SELECT id, name FROM subjects ORDER BY name');
        const subjects = result.rows;

        const seen = new Map();
        const duplicates = [];

        for (const subject of subjects) {
            if (seen.has(subject.name)) {
                duplicates.push(subject.id);
            } else {
                seen.set(subject.name, subject.id);
            }
        }

        console.log(`Found ${duplicates.length} duplicates.`);

        // 2. Delete duplicates
        for (const id of duplicates) {
            try {
                await pool.query('DELETE FROM subjects WHERE id = $1', [id]);
                console.log(`Deleted subject with ID: ${id}`);
            } catch (err) {
                console.error(`Failed to delete subject ${id}: ${err.message}`);
                // If FK violation, we might need to handle it, but for now let's try direct delete.
                // Likely these are empty duplicates from a double-seed.
            }
        }

        console.log('Cleanup complete.');
    } catch (error) {
        console.error('Cleanup failed:', error);
    } finally {
        pool.end();
    }
}

cleanupDuplicates();
