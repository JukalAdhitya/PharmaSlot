const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a booking
router.post('/', async (req, res) => {
    const { user_id, user_name, user_contact, pharmacy_id, medicine_id, quantity, slot_time } = req.body;

    // Basic validation
    if (!user_name || !user_contact || !pharmacy_id || !medicine_id || !quantity || !slot_time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Start transaction
        await db.query('BEGIN');

        // Check inventory
        const invRes = await db.query(
            'SELECT quantity FROM inventory WHERE pharmacy_id = $1 AND medicine_id = $2 FOR UPDATE',
            [pharmacy_id, medicine_id]
        );

        if (invRes.rows.length === 0 || invRes.rows[0].quantity < quantity) {
            await db.query('ROLLBACK');
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Deduct inventory
        await db.query(
            'UPDATE inventory SET quantity = quantity - $1 WHERE pharmacy_id = $2 AND medicine_id = $3',
            [quantity, pharmacy_id, medicine_id]
        );

        // Create booking
        // Expires in 2 hours
        const expires_at = new Date(new Date(slot_time).getTime() + 2 * 60 * 60 * 1000);

        const bookingRes = await db.query(
            `INSERT INTO bookings (user_id, user_name, user_contact, pharmacy_id, medicine_id, quantity, slot_time, expires_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING id`,
            [user_id, user_name, user_contact, pharmacy_id, medicine_id, quantity, slot_time, expires_at]
        );

        await db.query('COMMIT');
        res.status(201).json({ id: bookingRes.rows[0].id, message: 'Booking confirmed' });

    } catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Booking failed' });
    }
});

// Get User Bookings
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await db.query(
            `SELECT b.*, m.name as medicine_name, p.name as pharmacy_name 
             FROM bookings b
             JOIN medicines m ON b.medicine_id = m.id
             JOIN pharmacies p ON b.pharmacy_id = p.id
             WHERE b.user_id = $1
             ORDER BY b.created_at DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Booking Status
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const result = await db.query(
            'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;
