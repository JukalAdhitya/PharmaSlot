const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Pharmacy
router.post('/pharmacies', async (req, res) => {
    const { name, address, contact_number } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO pharmacies (name, address, contact_number) VALUES ($1, $2, $3) RETURNING *',
            [name, address, contact_number]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Pharmacies
router.get('/pharmacies', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM pharmacies ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add Medicine
router.post('/medicines', async (req, res) => {
    const { name, description, manufacturer, price } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO medicines (name, description, manufacturer, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, manufacturer, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Inventory
router.post('/inventory', async (req, res) => {
    const { pharmacy_id, medicine_id, quantity } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO inventory (pharmacy_id, medicine_id, quantity) 
             VALUES ($1, $2, $3)
             ON CONFLICT (pharmacy_id, medicine_id) 
             DO UPDATE SET quantity = inventory.quantity + $3
             RETURNING *`,
            [pharmacy_id, medicine_id, quantity]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Users
router.get('/users', async (req, res) => {
    try {
        const result = await db.query('SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Orders (Bookings)
router.get('/orders', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT b.id, b.user_name, b.user_contact, b.slot_time, b.status, 
                   m.name as medicine_name, p.name as pharmacy_name 
            FROM bookings b
            JOIN medicines m ON b.medicine_id = m.id
            JOIN pharmacies p ON b.pharmacy_id = p.id
            ORDER BY b.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
