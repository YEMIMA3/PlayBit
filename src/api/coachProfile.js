import axios from "axios";

// Create axios instance with correct base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api/coach",
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('coach_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get coach profile
export const getCoachProfile = async () => {
  try {
    const response = await api.get("/profile");
    console.log('✅ GET Profile API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Profile API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('coach_token');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

// ✅ Update coach profile
export const updateCoachProfile = async (profileData) => {
  try {
    console.log('🔄 Sending update data:', profileData);
    const response = await api.put("/profile", profileData);
    console.log('✅ UPDATE Profile API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ UPDATE Profile API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('coach_token');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to update profile" };
  }
};

// ✅ TOURNAMENT METHODS - ONLY GET AND CREATE

// Get tournaments available for coach
export const getCoachTournaments = async () => {
  try {
    const response = await api.get("/tournaments");
    console.log('✅ GET Tournaments API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Tournaments API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('coach_token');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch tournaments" };
  }
};

// Create new tournament
export const createTournament = async (tournamentData) => {
  try {
    console.log('🔄 Creating tournament:', tournamentData);
    const response = await api.post("/tournaments", tournamentData);
    console.log('✅ CREATE Tournament API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ CREATE Tournament API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('coach_token');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to create tournament" };
  }
};

// Export only the needed methods
export const tournamentService = {
  getCoachTournaments,
  createTournament
};