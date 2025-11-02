import axios from "axios";

// Create axios instance with correct base URL (your backend runs on port 5000)
const api = axios.create({
  baseURL: "http://localhost:3000/api/athlete", // Changed from 3000 to 5000
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
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
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