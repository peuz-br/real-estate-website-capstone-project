import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import './InteractMap.css';
import { useNavigate } from 'react-router-dom';

const InteractiveMapPage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate(); 

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        console.log("Properties fetched:", response.data);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleMarkerClick = (property) => {
    console.log("Selected Property ID:", property.property_id);
    setSelectedProperty(property);
  };

  const handleCheckProperty = () => {
    if (selectedProperty && selectedProperty.property_id) {
      console.log("Navigating to Property ID:", selectedProperty.property_id); 
      navigate(`/properties/${selectedProperty.property_id}`);
    } else {
      console.error("Error: property_id is undefined or invalid.");
    }
  };

  return (
    <div className="interactive-map-page">
      <h1>Interactive Map</h1>
      <div className="map-container">
        <Map properties={properties} onMarkerClick={handleMarkerClick} />
        {selectedProperty && (
          <div className="property-details">
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.location}</p>
            <img 
              src={
                selectedProperty.images && selectedProperty.images !== 'null'
                  ? `http://localhost:5000/${JSON.parse(selectedProperty.images)[0].replace(/\\/g, '/')}`
                  : 'default-placeholder.jpg'
              }
              alt={selectedProperty.title}
              className="property-image"
            />
            <p>{selectedProperty.description}</p>
            <button onClick={handleCheckProperty}>Check Property</button> 
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMapPage;
