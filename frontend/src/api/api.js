import axios from 'axios';

// Set up a reusable axios instance with a base URL
const API = axios.create({ baseURL: 'http://localhost:4000/' });

// Insert token in headers of every request if present in local storage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
