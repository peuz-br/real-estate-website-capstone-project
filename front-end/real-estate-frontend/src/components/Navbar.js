import React from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  return (
    <nav className="navbar">
      <ul>
        
        <li onClick={onLoginClick}>Login</li>
        <li onClick={onSignUpClick}>Sign Up</li>
        <li>Interactive Map</li>
        <li>Contact</li>
      </ul>

    </nav>
  );

};

export default Navbar;