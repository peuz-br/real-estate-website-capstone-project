const API_URL = 'http://localhost:5000';


//registration

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || 'Registration failed';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// login

export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    console.log('Response:', response);

    const data = await response.json();
    
    console.log('Data:', data); 
    
    if (!response.ok) {
      const errorMessage = data.message || 'Login failed';
      throw new Error(errorMessage);
    }

    return data; 
  } catch (error) {
    console.error('Error logging in user:', error);
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
      const data = await response.json();
  
      if (!response.ok) {
        const errorMessage = data.message || 'Update failed';
        throw new Error(errorMessage);
      }
  
      return data.user; 
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

