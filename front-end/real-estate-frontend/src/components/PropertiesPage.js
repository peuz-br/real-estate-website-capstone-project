import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleShowFavorites = async () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      try {
        const response = await axios.get('http://localhost:5000/favorites', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching favorite properties:', error);
      }
    } else {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching all properties:', error);
      }
    }
  };
  

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckDetails = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="properties-page">
      <div className="properties-container">
        <div className="properties-header">
          <h1>Properties</h1>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={toggleShowFavorites}>
              {showFavorites ? "Show All Properties" : "Show Favorites"}
            </button>
          </div>
        </div>
        <div className="property-list">
          {filteredProperties.map((property) => (
            <div key={property.property_id} className="property-item">
              {property.images && property.images !== 'null' ? (
                <img
                  src={`http://localhost:5000/${JSON.parse(property.images)[0].replace(/\\/g, '/')}`}
                  alt={property.title}
                />
              ) : (
                <img src="default-placeholder.jpg" alt="Placeholder" />
              )}
              <h2>{property.title}</h2>
              <p>{property.location}</p>
              <p>Price: ${property.price}</p>
              <button onClick={() => handleCheckDetails(property.property_id)}>
                Check Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
