import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlaWtpMTIyIiwiYSI6ImNtMmw4emd1azBhcjMycXBxZzZnd3E3dWgifQ.PxSRi28Y2mToHG_rcttfGg';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current, 
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-74.5, 40], 
      zoom: 9,
    });
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Map;
