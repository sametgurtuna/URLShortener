import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

const apiService = {
  // URL kısaltma
  shortenUrl: async (data) => {
    const response = await api.post('/urls/shorten', data);
    return response.data;
  },

  // Tüm URL'leri getir
  getUrls: async () => {
    const response = await api.get('/urls');
    return response.data;
  },

  // URL istatistiklerini getir
  getUrlStats: async (shortCode) => {
    const response = await api.get(`/urls/stats/${shortCode}`);
    return response.data;
  },

  // URL sil
  deleteUrl: async (shortCode) => {
    const response = await api.delete(`/urls/${shortCode}`);
    return response.data;
  },
};

export default apiService;
