// src/helpers/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access-token');
  console.log("Token in Axios interceptor:", JSON.parse(localStorage.getItem('access-token')).token); // Add this line
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
