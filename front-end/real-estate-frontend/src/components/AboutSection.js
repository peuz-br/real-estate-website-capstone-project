import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div className="about-section container my-5" data-aos="fade-dowm">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="image-container"></div>
        </div>
        <div className="col-md-6">
          <p>
          We are a leading real estate firm committed to providing exceptional service to our clients. With years of experience and a deep understanding of the market, we help you find the perfect property that meets your needs and exceeds your expectations.
          </p>
          <button className="btn">Check our Properties</button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
