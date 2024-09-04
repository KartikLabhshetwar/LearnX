// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // adjust this to match your backend URL
});

export default api;