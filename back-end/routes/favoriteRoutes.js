
const express = require('express');
const router = express.Router();
const db = require('../db/db');
const authenticateToken = require('../auth');

// favorite property
router.post('/', authenticateToken, (req, res) => {
  const { property_id } = req.body;
  const user_id = req.user.user_id; // Obter o ID do usuário autenticado
  const sql = 'INSERT INTO Favorites (user_id, property_id) VALUES (?, ?)';
  db.query(sql, [user_id, property_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error adding to favorites' });
    res.status(201).json({ favorite_id: result.insertId, user_id, property_id });
  });
});

// check for favorite properties
router.get('/', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;

  const sql = `
    SELECT Properties.* FROM Properties
    JOIN Favorites ON Properties.property_id = Favorites.property_id
    WHERE Favorites.user_id = ?
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching favorite properties' });
    res.json(results);
  });
});

module.exports = router;
