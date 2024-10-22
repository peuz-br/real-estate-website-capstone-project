
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Fetch
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.json(results);
  });
});

// Create
router.post('/', (req, res) => {
  const { name, email, password_hash, role } = req.body;
  const sql = 'INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password_hash, role], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error creating user' });
    res.status(201).json({ user_id: result.insertId, name, email, role });
  });
});

module.exports = router;
