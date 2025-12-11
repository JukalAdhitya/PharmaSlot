const fs = require('fs');
const path = require('path');
const db = require('./src/db'); // Assuming db module exports query or pool

async function runMigration() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'migrations', '002_add_users.sql'), 'utf8');
        console.log('Running migration...');
        await db.query(sql);
        console.log('Migration successful');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

runMigration();
