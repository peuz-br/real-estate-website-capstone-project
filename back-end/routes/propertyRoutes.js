const express = require('express');
const router = express.Router();
const db = require('../db/db');
const authenticateToken = require('../auth');

// Fetch

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Properties WHERE property_id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error fetching property' });
      if (result.length === 0) return res.status(404).json({ error: 'property not found' });
      res.json(result[0]);
    });
  });
  

  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Properties';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: 'error fetching properties' });
      res.json(results);
    });
  });

// Create

router.post('/', (req, res) => {
  const { title, description, price, location, user_id } = req.body;
  const sql = 'INSERT INTO Properties (title, description, price, location, user_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, price, location, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'error creating property' });
    res.status(201).json({ property_id: result.insertId, title, description, price, location });
  });
});

// delete

router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'agent' && req.user.role !== 'seller') {
    return res.status(403).json({ error: 'access denied. Only agents or sellers can delete properties.' });
  }

  const sql = 'DELETE FROM Properties WHERE property_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'error deleting property' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'property not found' });
    res.json({ message: 'property deleted successfully' });
  });
});


module.exports = router;
