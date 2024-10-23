const API_URL = 'http://localhost:5000';

// fetch
export const fetchProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/properties`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// create
export const createProperty = async (propertyData) => {
    try {
      const token = localStorage.getItem('token'); 
  
      const response = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(propertyData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  };

  