// server.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


// middleware

app.use(cors());
app.use(express.json()); 

// basic route test

app.get('/', (req, res) => {
    res.send('Real Estate API running');
  });





  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });