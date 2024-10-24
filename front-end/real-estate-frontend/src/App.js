import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PropertyList from './components/PropertyList';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  return (
    <div>
      <HeroSection showLogin={showLogin} showSignUp={showSignUp} >
      <Navbar onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} />
      </HeroSection>
      <AboutSection />
      <PropertyList />
      <Footer />
    </div>
  );
}

export default App;
