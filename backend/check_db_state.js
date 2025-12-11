const db = require('./src/db');

async function check() {
    try {
        const res = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables:', res.rows.map(r => r.table_name));

        const users = await db.query("SELECT * FROM information_schema.tables WHERE table_name = 'users'");
        if (users.rows.length === 0) {
            console.log('Users table MISSING');
        } else {
            console.log('Users table EXISTS');
            // Check columns
            const cols = await db.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'");
            console.log('Columns:', cols.rows.map(r => r.column_name));
        }
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

check();
