import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../services/authContext';
import { updateUser } from '../services/userService';
import './AccountSettings.css';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUser(formData);
      login(updatedUser.token);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };


  const handleAddPropertyClick = () => {
    navigate('/add-property');
  };

  
  const handleInquiriesClick = () => {
    navigate('/inquiries'); 
  };

  if (!user) {
    return <p>Loading user data...</p>; 
  }

  return (
    <div className="profile-background">
      <div className="form-container">
        <h2>Account Settings</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <button type="submit">Save Changes</button>
        </form>
        {message && <p>{message}</p>}

        
        {(user.role === 'agent' || user.role === 'seller') && (
          <>
            <button className="add-property-button" onClick={handleAddPropertyClick}>
              Add Your Property
            </button>
            <button className="inquiries-button" onClick={handleInquiriesClick}>
              Inquiries
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
