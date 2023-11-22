import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://jun2-ish.fun'
    : 'http://localhost:8080';
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || url;

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
