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