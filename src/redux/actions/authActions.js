import axios from 'axios';

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:5000/register', userData);
      
      console.log("Registration successful, redirecting to login...");
      // Redirecting to login is handled by the backend. No token at this step.
    } catch (error) {
      console.log("Registration error:", error.response?.data);
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data?.message ? { username: 'Username already exists' } : error.response?.data
      });
    }
  };
};

export const loginUser = (loginData, role) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/login_${role}`, loginData);
      
      console.log("Login successful, received tokens:", response.data);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      });
    } catch (error) {
      console.log("Login error:", error.response?.data);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response?.data
      });
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      });
      console.log("User details fetched:", response.data);
      dispatch({
        type: 'FETCH_USER_DETAILS_SUCCESS',
        payload: response.data 
      });
    } catch (error) {
      console.log("Fetching user details error:", error.response?.data);
      dispatch({
        type: 'FETCH_USER_DETAILS_FAIL',
        payload: error.response?.data
      });
    }
  };
};

export const refreshToken = () => {
  return async () => {  // Removed 'dispatch' as it's not used
    try {
      const response = await axios.post('http://localhost:5000/token/refresh', {}, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
        }
      });
      console.log("Refresh token successful, received new access token:", response.data);
      localStorage.setItem('access_token', response.data.access_token);
      // Optionally dispatch an action to update the state
    } catch (error) {
      console.log("Token refresh error:", error.response?.data);
      // Optionally dispatch an action for handling token refresh failure
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    console.log("Logging out...");
    localStorage.removeItem('access_token');
    localStorage.removeItem('refreshToken');
    dispatch({
      type: 'LOGOUT'
    });
  };
};
