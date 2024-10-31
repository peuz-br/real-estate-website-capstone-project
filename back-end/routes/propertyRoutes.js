const express = require('express');
const router = express.Router();
const db = require('../db/db');
const authenticateToken = require('../auth');
const multer = require('multer');
const axios = require('axios');

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });

// get coordinates
async function getCoordinates(location) {
  const accessToken = 'pk.eyJ1IjoiYnJlaWtpMTIyIiwiYSI6ImNtMmw4emd1azBhcjMycXBxZzZnd3E3dWgifQ.PxSRi28Y2mToHG_rcttfGg';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    const [longitude, latitude] = response.data.features[0].center;
    return { latitude, longitude };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw new Error('Failed to fetch coordinates');
  }
}

// add property 
router.post('/', authenticateToken, upload.array('images', 5), async (req, res) => {
  const { title, description, price, location, bedrooms, bathrooms, size } = req.body;
  const user_id = req.user.user_id; 
  console.log("Data added on request:", req.body);


  if (req.user.role !== 'agent' && req.user.role !== 'seller') {
    return res.status(403).json({ error: 'Access denied. Only agents or sellers can add properties.' });
  }

  try {

    const { latitude, longitude } = await getCoordinates(location);
    console.log("Coordinates received:", latitude, longitude);

 
    const imagePaths = req.files.map(file => file.path);
    console.log("Image Location:", imagePaths);

    // insert to database
    const sql = 'INSERT INTO Properties (title, description, price, location, bedrooms, bathrooms, size, user_id, images, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, price, location, bedrooms, bathrooms, size, user_id, JSON.stringify(imagePaths), latitude, longitude], (err, result) => {
      if (err) {
        console.log("Error in inputting data inside Database:", err); 
        return res.status(500).json({ error: 'Error creating property' });
      }
      console.log("Property created successfully:", result.insertId); 
      res.status(201).json({ property_id: result.insertId, title, description, price, location, bedrooms, bathrooms, size, images: imagePaths, latitude, longitude });
    });
  } catch (error) {
    console.log("Unknown error:", error);
    res.status(500).json({ error: 'Failed to add property with coordinates' });
  }
});

// Fetch by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log("Fetching property with ID:", id);
  const sql = 'SELECT * FROM Properties WHERE property_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching property' });
    if (result.length === 0) return res.status(404).json({ error: 'Property not found' });
    res.json(result[0]);
  });
});

// Fetch all
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Properties';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching properties' });
    res.json(results);
  });
});

// Delete
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'agent' && req.user.role !== 'seller') {
    return res.status(403).json({ error: 'Access denied. Only agents or sellers can delete properties.' });
  }

  const sql = 'DELETE FROM Properties WHERE property_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting property' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  });
});

module.exports = router;
