const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const path = require('path');
const http = require('http'); 
const { Server } = require('socket.io'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

// User routes
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/inquiries', inquiryRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Track online users
const users = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user
  socket.on('register', (username) => {
    users[socket.id] = username;
    io.emit('users', Object.values(users)); // Send updated online users list
    console.log('Users online:', users);
  });

  // Handle public message
  socket.on('message', (data) => {
    io.emit('message', { message: data.message, username: users[socket.id] });
  });

  // Handle private message
  socket.on('private_message', ({ message, to }) => {
    const recipientSocketId = Object.keys(users).find(key => users[key] === to);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit('private_message', { message, from: users[socket.id] });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users', Object.values(users)); // Update users list
    console.log('User disconnected:', socket.id);
  });
});

// Basic route test
app.get('/', (req, res) => {
  res.send('Real Estate API running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
