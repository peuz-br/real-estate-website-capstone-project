import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../services/authContext';
import './ChatBox.css';

const socket = io('http://localhost:5000');

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!user) {
      alert('You must be logged in to send messages.');
      return;
    }

    if (message.trim()) {
      socket.emit('message', { message, username: user.name || 'Guest' });
      setMessage('');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">Live Chat</div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chatbox-message">
            <strong>{msg.username}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
