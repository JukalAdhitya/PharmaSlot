const db = require('./db');

async function releaseExpiredBookings() {
    try {
        await db.query('BEGIN');

        // Find expired bookings that are still PENDING
        const expiredRes = await db.query(
            "SELECT id, pharmacy_id, medicine_id, quantity FROM bookings WHERE status = 'PENDING' AND expires_at < NOW() FOR UPDATE"
        );

        for (const booking of expiredRes.rows) {
            // Restore inventory
            await db.query(
                'UPDATE inventory SET quantity = quantity + $1 WHERE pharmacy_id = $2 AND medicine_id = $3',
                [booking.quantity, booking.pharmacy_id, booking.medicine_id]
            );

            // Update booking status
            await db.query(
                "UPDATE bookings SET status = 'EXPIRED' WHERE id = $1",
                [booking.id]
            );
        }

        await db.query('COMMIT');
        if (expiredRes.rows.length > 0) {
            console.log(`Released ${expiredRes.rows.length} expired bookings.`);
        }
    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Error releasing expired bookings:', err);
    }
}

// Run every minute
setInterval(releaseExpiredBookings, 60 * 1000);

console.log('Worker started...');
