// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json()); 

// import routes

const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

//user routes

app.use('/users', userRoutes); 
app.use('/properties', propertyRoutes); 
app.use('/inquiries', inquiryRoutes); 
app.use('/favorites', favoriteRoutes);

// basic route test
app.get('/', (req, res) => {
    res.send('Real Estate API running');
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

