import axios from 'axios';

// Use environment variable for base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE  // No fallback to localhost for production build
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
