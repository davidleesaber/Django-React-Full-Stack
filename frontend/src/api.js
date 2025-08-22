import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const apiUrl = "https://428b147e-5e12-43ed-8553-9f4c574399b7-dev.e1-us-east-azure.choreoapis.dev/react-django-full-stack/backend/v1";  // Ensure trailing slash

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? (import.meta.env.VITE_API_URL.endsWith('/') ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL + '/')
    : apiUrl
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
