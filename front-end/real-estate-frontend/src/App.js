import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PropertyList from './components/PropertyList';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <PropertyList />
    </div>
  );
}

export default App;
