// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://learnx-ckg5.onrender.com/api/v1', // adjust this to match your backend URL
});

export default api;
