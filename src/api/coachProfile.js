import axios from "axios";

const API_URL = "http://localhost:3000/api/coach/profile";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
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
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

// ✅ Update coach profile
export const updateCoachProfile = async (profileData) => {
  try {
    const response = await api.put("/", profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};