import axios from 'axios';

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: SERVER_URL,
});

export default api;
