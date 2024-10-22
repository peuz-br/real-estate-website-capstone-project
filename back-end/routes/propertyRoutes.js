const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the MySQL connection

// Fetch

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Properties';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch properties' });
    res.json(results);
  });
});

// Create

router.post('/', (req, res) => {
  const { title, description, price, location, user_id } = req.body;
  const sql = 'INSERT INTO Properties (title, description, price, location, user_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, price, location, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error creating property' });
    res.status(201).json({ property_id: result.insertId, title, description, price, location });
  });
});

module.exports = router;
