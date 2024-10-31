import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlaWtpMTIyIiwiYSI6ImNtMmw4emd1azBhcjMycXBxZzZnd3E3dWgifQ.PxSRi28Y2mToHG_rcttfGg';

const Map = ({ onMarkerClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [properties, setProperties] = useState([]);

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

  useEffect(() => {
  
    // map init

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-74.5, 40],
        zoom: 9,
      });
    }

    // geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.current.addControl(geocoder);
    geocoder.on('result', (event) => {
      console.log('Geocoder result:', event.result);
    });
    return () => {
      if (geocoder) {
        geocoder.off('result', () => {});  
        map.current.removeControl(geocoder);
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [properties, onMarkerClick]);

  useEffect(() => {
    if (map.current) {
      properties.forEach((property) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(property.title);
        const marker = new mapboxgl.Marker()
          .setLngLat([property.longitude, property.latitude])
          .setPopup(popup)
          .addTo(map.current);

        marker.getElement().addEventListener('click', () => onMarkerClick(property));
      });
    }
  }, [properties, onMarkerClick]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Map;
