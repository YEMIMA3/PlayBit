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
    const token = localStorage.getItem('adminToken');
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
      localStorage.removeItem('adminToken');
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

  // Coach management operations - ADD THESE
  getCoaches: (params = {}) => api.get('/admin/coaches', { params }),
  getCoach: (id) => api.get(`/admin/coaches/${id}`),
  verifyCoach: (id) => api.put(`/admin/coaches/${id}/verify`),
  rejectCoach: (id) => api.put(`/admin/coaches/${id}/reject`),
  getCoachStats: () => api.get('/admin/coaches/stats'),
  searchCoaches: (params = {}) => api.get('/admin/coaches/search', { params }),

  // Athlete management operations
  getAthletes: (params = {}) => api.get('/admin/athletes', { params }),
  getAthlete: (id) => api.get(`/admin/athletes/${id}`),
  getAthleteStats: () => api.get('/admin/athletes/stats'),
  updateAthleteStatus: (id, status) => api.put(`/admin/athletes/${id}/status`, { status }),
  verifyAthlete: (id) => api.put(`/admin/athletes/${id}/verify`),
  deleteAthlete: (id) => api.delete(`/admin/athletes/${id}`),
  getAthleteFilterOptions: () => api.get('/admin/athletes/filters/options'),
};

export default api;