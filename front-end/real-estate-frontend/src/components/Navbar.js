import React, { useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLoginClick, onSignUpClick, onAccountSettingsClick }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-custom">
      <div>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/properties')}>Properties</button>
        <button onClick={() => navigate('/interactive-map')}>Interactive Map</button>
        {user ? (
          <div className="user-menu">
            <span onClick={onAccountSettingsClick}>{user.name}</span>
            <button onClick={logout}>Logout</button>
            {user.role === 'agent' || user.role === 'seller' ? (
              <button onClick={() => navigate('/add-property')}>Add Your Property</button>
            ) : null}
          </div>
        ) : (
          <div>
            <button onClick={onLoginClick}>Login</button>
            <button onClick={onSignUpClick}>Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
