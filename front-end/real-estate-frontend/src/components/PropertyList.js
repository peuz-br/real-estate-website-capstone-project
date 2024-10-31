import React from 'react';
import house1 from '../assets/images/house1.jpg';


const PropertyList = () => {
  return (
    <div className="property-list container" data-aos="fade-up">
      <h2>Featured Properties</h2>
      <div className="row">
        <div className="col-md-4" data-aos="fade-left">
          <div className="card">
          <img src={house1} className="card-img-top" alt="Property 1"/>
            <div className="card-body">
              <h5 className="card-title">123 Anywhere St, Any City</h5>
              <p className="card-text">2 Beds | 2 Baths | 1 Car</p>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
}

export default PropertyList;
