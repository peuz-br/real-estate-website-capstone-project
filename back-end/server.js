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


// mysql connect

const mysql = require('mysql2');


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) {
    console.error('error connecting to MySQL:', err);
    return;
  }
  console.log('connected to MySQL Database');
});
