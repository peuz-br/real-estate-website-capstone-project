const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the MySQL connection

// Fetch

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Properties WHERE property_id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error fetching property' });
      if (result.length === 0) return res.status(404).json({ error: 'Property not found' });
      res.json(result[0]);
    });
  });
  
  module.exports = router;

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
