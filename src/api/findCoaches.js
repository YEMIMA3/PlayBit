import axios from "axios";

// Create axios instance for coach-related APIs
const api = axios.create({
  baseURL: "http://localhost:3000/api/athlete/find-coaches", // Correct base URL
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('athlete_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get all coaches
export const getAllCoaches = async () => {
  try {
    const response = await api.get("/");
    console.log('✅ GET Coaches API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Coaches API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch coaches" };
  }
};

// ✅ Send request to coach
export const sendCoachRequest = async (coachId, message = "") => {
  try {
    console.log('🔄 Sending request to coach:', coachId);
    const response = await api.post("/send-request", {
      coachId,
      message
    });
    console.log('✅ SEND Coach Request API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ SEND Coach Request API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to send request" };
  }
};

// ✅ Get athlete's sent requests
export const getMyRequests = async () => {
  try {
    const response = await api.get("/my-requests");
    console.log('✅ GET My Requests API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET My Requests API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('athlete_token');
      localStorage.removeItem('athlete_data');
      window.location.href = '/athlete/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch requests" };
  }
};

// Export coach service
export const coachService = {
  getAllCoaches,
  sendCoachRequest,
  getMyRequests
};