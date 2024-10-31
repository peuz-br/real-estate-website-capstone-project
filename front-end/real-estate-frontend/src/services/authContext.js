import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile(token)
        .then((userData) => setUser(userData))
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    getUserProfile(token)
      .then((userData) => setUser(userData))
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
