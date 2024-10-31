import React, { useState, useContext } from 'react';
import { loginUser } from '../services/authService';
import { AuthContext } from '../services/authContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(loginData);

      if (response.user) {
        localStorage.setItem('token', response.token);
        login(response.user); 
        setMessage('Login successful!');
        history.push('/');
      } else {
        setMessage('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please try again.');
    }
  };

  return (

    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
