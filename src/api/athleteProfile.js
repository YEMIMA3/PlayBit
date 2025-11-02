import axios from "axios";

// Create axios instance with correct base URL - FIXED PORT
const api = axios.create({
  baseURL: "http://localhost:3000/api/athlete", // Your backend runs on port 3000
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('athlete_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get athlete profile
export const getAthleteProfile = async () => {
  try {
    const response = await api.get("/profile");
    console.log('✅ GET Athlete Profile API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Athlete Profile API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

// ✅ Update athlete profile
export const updateAthleteProfile = async (profileData) => {
  try {
    console.log('🔄 Sending athlete update data:', profileData);
    const response = await api.put("/profile", profileData);
    console.log('✅ UPDATE Athlete Profile API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ UPDATE Athlete Profile API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to update profile" };
  }
};

// ✅ TOURNAMENT METHODS

// Get tournaments available for athlete
export const getAthleteTournaments = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Add filters if provided
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.sport) params.append('sport', filters.sport);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/tournaments?${params.toString()}`);
    console.log('✅ GET Athlete Tournaments API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Athlete Tournaments API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch tournaments" };
  }
};

// Register for tournament
export const registerForTournament = async (tournamentId, registrationData = {}) => {
  try {
    console.log('🔄 Registering for tournament:', tournamentId);
    const response = await api.post(`/tournaments/${tournamentId}/register`, registrationData);
    console.log('✅ REGISTER Tournament API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ REGISTER Tournament API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to register for tournament" };
  }
};

// Export tournament service
export const tournamentService = {
  getAthleteTournaments,
  registerForTournament
};