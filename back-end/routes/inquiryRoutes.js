const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Create inquiry
router.post('/', (req, res) => {
  const { message, property_id, user_id } = req.body;
  const sql = 'INSERT INTO Inquiries (message, property_id, user_id) VALUES (?, ?, ?)';
  db.query(sql, [message, property_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error creating inquiry' });
    res.status(201).json({ inquiry_id: result.insertId, message, property_id, user_id });
  });
});

// Get inquiries
router.get('/property/:property_id', (req, res) => {
  const { property_id } = req.params;
  const sql = 'SELECT * FROM Inquiries WHERE property_id = ?';
  db.query(sql, [property_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching inquiries' });
    res.json(results);
  });
});

module.exports = router;
