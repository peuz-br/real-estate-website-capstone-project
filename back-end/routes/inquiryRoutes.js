const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Create inquiry
router.post('/', (req, res) => {
  const { message, property_id, user_id } = req.body;
  
 
  console.log("Creating inquiry with data:", { message, property_id, user_id });
  
 
  if (!message || !property_id || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const sql = 'INSERT INTO Inquiries (message, property_id, user_id) VALUES (?, ?, ?)';
  db.query(sql, [message, property_id, user_id], (err, result) => {
    if (err) {
      console.error("Error creating inquiry:", err);
      return res.status(500).json({ error: 'Error creating inquiry' });
    }
    res.status(201).json({ inquiry_id: result.insertId, message, property_id, user_id });
  });
});


router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM Inquiries WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching inquiries' });
    if (results.length === 0) return res.status(404).json({ error: 'No inquiries found' });
    res.json(results);
  });
});

module.exports = router;

