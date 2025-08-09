import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'https://link-server-2d02.onrender.com' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;