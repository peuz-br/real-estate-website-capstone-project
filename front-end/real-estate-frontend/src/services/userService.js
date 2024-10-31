const API_URL = 'http://localhost:5000';

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = response.statusText || 'Failed to fetch user profile';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

  
export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = response.statusText || 'Update failed';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
