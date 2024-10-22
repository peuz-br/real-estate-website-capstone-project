const express = require('express');
const router = express.Router();
const db = require('../db/db');

// add to favorite
router.post('/', (req, res) => {
  const { user_id, property_id } = req.body;
  const sql = 'INSERT INTO Favorites (user_id, property_id) VALUES (?, ?)';
  db.query(sql, [user_id, property_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error adding to favorites' });
    res.status(201).json({ favorite_id: result.insertId, user_id, property_id });
  });
});

// Get fav property by some user
router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM Favorites WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching favorites' });
    res.json(results);
  });
});

module.exports = router;
