import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/pexels-pixabay-262367.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div className="text-center">
        <h1 className="display-4">We Know Real Estate</h1>
        <p className="lead">We're here to help you make the right choices</p>
        <button className="btn btn-outline-light btn-lg mt-3">Learn more</button>
      </div>
    </div>
  );
}

export default HeroSection;
