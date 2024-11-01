import axios from 'axios';
import getCookie from '../utils/csrf';

const csrftoken = getCookie('csrftoken');
console.log(csrftoken);

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken, 
  }
});

export const apiPrivate = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken, 
  }
});



export default api;
