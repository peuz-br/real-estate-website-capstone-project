import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../components/AddPropertyPage.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlaWtpMTIyIiwiYSI6ImNtMmw4emd1azBhcjMycXBxZzZnd3E3dWgifQ.PxSRi28Y2mToHG_rcttfGg';

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    images: [],
  });

  const geocoderContainer = useRef(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'address',
      placeholder: 'Enter property address',
      mapboxgl: mapboxgl,
    });

    if (geocoderContainer.current) {
      geocoder.addTo(geocoderContainer.current);
    }

    geocoder.on('result', (event) => {
      const { text: location } = event.result;
      setFormData((prevData) => ({ ...prevData, location }));
    });

    return () => {
      if (geocoder && geocoder.off) {
        geocoder.off('result');
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prevData) => ({ ...prevData, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('bedrooms', formData.bedrooms);
    data.append('bathrooms', formData.bathrooms);
    data.append('size', formData.size);
    data.append('user_id', localStorage.getItem('user_id'));

    Array.from(formData.images).forEach((image) => {
      data.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Property added:', response.data);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <div className="add-property-page">
      <div className="add-property-container">
        <h2>Add New Property</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <div ref={geocoderContainer} style={{ marginBottom: '15px' }}></div>
          <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required />
          <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
          <input type="number" name="size" placeholder="Size (sqft)" value={formData.size} onChange={handleChange} required />
          <input type="file" name="images" multiple onChange={handleImageUpload} />
          <button type="submit">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
