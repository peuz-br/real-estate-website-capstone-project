import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../services/authContext';

const InquiriesPage = () => {
  const { user } = useContext(AuthContext); 
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(`http://localhost:5000/inquiries/user/${user.user_id}`);
          setInquiries(response.data);
        } else {
          setError('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setError('Error fetching inquiries. Please try again.');
      }
    };

    fetchInquiries();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!inquiries.length) {
    return <div>No inquiries found.</div>;
  }

  return (
    <div>
      <h2>Your Inquiries</h2>
      <ul>
        {inquiries.map((inquiry) => (
          <li key={inquiry.inquiry_id}>
            <p>Message: {inquiry.message}</p>
            <p>Property ID: {inquiry.property_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InquiriesPage;
