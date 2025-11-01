import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken'); // Fixed key name
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin/auth';
    }
    return Promise.reject(error);
  }
);

export const tournamentService = {
  // Admin tournament operations
  getTournaments: () => api.get('/admin/tournaments'),
  getTournament: (id) => api.get(`/admin/tournaments/${id}`),
  createTournament: (data) => api.post('/admin/tournaments', data),
  updateTournament: (id, data) => api.put(`/admin/tournaments/${id}`, data),
  deleteTournament: (id) => api.delete(`/admin/tournaments/${id}`),
  getTournamentStats: () => api.get('/admin/tournaments/stats/overview'),

  // Coach tournament operations
  getCoachTournaments: () => api.get('/coach/tournaments'),
  registerCoachForTournament: (id) => api.post(`/coach/tournaments/${id}/register`),
  createCoachTournament: (data) => api.post('/coach/tournaments', data),

  // Athlete tournament operations
  getAthleteTournaments: () => api.get('/athlete/tournaments'),
  registerAthleteForTournament: (id) => api.post(`/athlete/tournaments/${id}/register`),
};

export default api;