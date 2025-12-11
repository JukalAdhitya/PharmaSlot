const express = require('express');
const router = express.Router();
const db = require('../db');

// Search medicines
router.get('/medicines', async (req, res) => {
    const { query } = req.query;
    try {
        let sql = 'SELECT * FROM medicines';
        const params = [];
        if (query) {
            sql += ' WHERE name ILIKE $1';
            params.push(`%${query}%`);
        }
        const result = await db.query(sql, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get pharmacies for a medicine
router.get('/medicines/:id/pharmacies', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT p.*, i.quantity 
            FROM pharmacies p
            JOIN inventory i ON p.id = i.pharmacy_id
            WHERE i.medicine_id = $1 AND i.quantity > 0
        `;
        const result = await db.query(sql, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
