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
    return await response.json();
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
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
  
      return data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  export const getToken = () => {
    return localStorage.getItem('token');
  };

