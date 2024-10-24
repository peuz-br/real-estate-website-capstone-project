import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';

import background1 from '../assets/images/background2.jpg';
import background2 from '../assets/images/background3.jpg';
import background3 from '../assets/images/background4.jpg';

import { registerUser, loginUser } from '../services/authService';

const HeroSection = ({ showLogin, showSignUp, children }) => {
  const backgrounds = [background1, background2, background3];
  const [currentBackground, setCurrentBackground] = useState(0);

  const messages = [
    'We Know Real Estate',
    "We're here to help you make the right choice",
    'Come Find Your Dream Home',
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenMessages = 2000;

  const typingTimeoutRef = useRef(null);


  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [registerMessage, setRegisterMessage] = useState('');


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const slideChangeInterval = setInterval(() => {
      setCurrentBackground((prevBackground) => (prevBackground + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(slideChangeInterval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentMessage = messages[currentMessageIndex];

      if (!isDeleting) {
        const newText = currentMessage.substring(0, displayedText.length + 1);
        setDisplayedText(newText);

        if (newText === currentMessage) {
          typingTimeoutRef.current = setTimeout(() => setIsDeleting(true), delayBetweenMessages);
        } else {
          typingTimeoutRef.current = setTimeout(handleTyping, typingSpeed);
        }
      } else {
        const newText = currentMessage.substring(0, displayedText.length - 1);
        setDisplayedText(newText);

        if (newText === '') {
          setIsDeleting(false);
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }
        typingTimeoutRef.current = setTimeout(handleTyping, deletingSpeed);
      }
    };

    typingTimeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(typingTimeoutRef.current);
  }, [currentMessageIndex, displayedText, isDeleting, messages]);

  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form data being submitted:', registerData);

    try {
      const response = await registerUser(registerData);
      console.log('User registered:', response);

      setRegisterMessage('User registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterMessage(`Registration failed: ${error.message}`);
    }
  };

  // Funções para o formulário de login
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form data being submitted:', loginData);

    try {
      const response = await loginUser(loginData);
      console.log('User logged in:', response);

      setLoginMessage('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div
      className={`hero-section ${showLogin || showSignUp ? 'show-form' : ''}`}
      style={{
        backgroundImage: `url(${backgrounds[currentBackground]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
      <div className="hero-content">
        {!showLogin && !showSignUp && (
          <div className="text-center">
            <h1>{displayedText}</h1>
            <button onClick={handleLearnMoreClick}>Learn More</button>
          </div>
        )}

        {showLogin && (
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  required
                />
              </div>

              <button type="submit">Login</button>
            </form>
            {loginMessage && <p>{loginMessage}</p>}
          </div>
        )}

        {showSignUp && (
          <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Choose Role:</label>
                <select
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                  required
                >
                  <option value="">--Select a Role--</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="agent">Agent</option>
                </select>
              </div>

              <button type="submit">Register</button>
            </form>
            {registerMessage && <p>{registerMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
