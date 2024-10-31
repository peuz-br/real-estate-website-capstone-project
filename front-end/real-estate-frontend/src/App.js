import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PropertyList from './components/PropertyList';
import PropertiesPage from './components/PropertiesPage';
import InteractiveMapPage from './components/InteractMap';
import AccountSettings from './components/AccountSettings';
import AddPropertyPage from './components/AddPropertyPage';
import PropertyDetailsPage from './components/PropertyDetailsPage'; // Importe o componente de detalhes da propriedade
import InquiriesPage from './components/InquiriesPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setShowProfileSettings(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
    setShowProfileSettings(false);
  };

  const handleAccountSettingsClick = () => {
    setShowProfileSettings(true);
    setShowLogin(false);
    setShowSignUp(false);
  };

  return (
    <Router>
      <Navbar
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
        onAccountSettingsClick={handleAccountSettingsClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection
                showLogin={showLogin}
                showSignUp={showSignUp}
                showProfileSettings={showProfileSettings}
              />
              <AboutSection />
              <PropertyList />
            </>
          }
        />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/interactive-map" element={<InteractiveMapPage />} />
        <Route path="/profile" element={<AccountSettings />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
