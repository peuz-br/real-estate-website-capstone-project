import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../services/propertyService';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };
    loadProperties();
  }, []);

  return (
    <div>
      <h2>Property Listings</h2>
      {properties.map((property) => (
        <div key={property.property_id}>
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p>Price: {property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
