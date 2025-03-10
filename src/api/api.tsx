import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to log outgoing requests
api.interceptors.request.use((config) => {
  console.log('Request Interceptor:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    withCredentials: config.withCredentials,
  });
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

export const apiPrivate = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});



export default api;
