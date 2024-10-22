const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//fetch

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.json(results);
  });
});

router.post('/register', async (req, res) => {
  const { name, email, password_hash, role } = req.body;

  // validation
  if (!name || !email || !password_hash || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const sqlCheck = 'SELECT * FROM Users WHERE email = ?';
    db.query(sqlCheck, [email], async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password_hash, salt);

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

// user login

router.post('/login', (req, res) => {
  const { email, password_hash } = req.body;

 
  if (!email || !password_hash) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM Users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = results[0];


    const isMatch = await bcrypt.compare(password_hash, user.password_hash);
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

module.exports = router;
