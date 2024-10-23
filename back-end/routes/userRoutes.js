const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../auth');

//Fetch 
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.json(results);
  });
});

//Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;


  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const sqlCheck = 'SELECT * FROM Users WHERE email = ?';
    db.query(sqlCheck, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const sql = 'INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)';
      db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error creating user' });
        res.status(201).json({ user_id: result.insertId, name, email, role });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//  login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM Users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login successful' });
  });
});

// Delete 
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Only admins can delete users.' });
  }

  const sql = 'DELETE FROM Users WHERE user_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting user' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
