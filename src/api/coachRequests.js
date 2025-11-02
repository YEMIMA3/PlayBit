import axios from "axios";

// Create axios instance for coach request APIs
const api = axios.create({
  baseURL: "http://localhost:3000/api/coach", // Coach base URL
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('coach_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get coach's incoming requests
export const getCoachRequests = async () => {
  try {
    const response = await api.get("/requests");
    console.log('✅ GET Coach Requests API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Coach Requests API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('coach_token');
      localStorage.removeItem('coach_data');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch requests" };
  }
};

// ✅ Accept or reject request
export const updateRequestStatus = async (requestId, status) => {
  try {
    console.log('🔄 Updating request status:', { requestId, status });
    const response = await api.put(`/requests/${requestId}`, { status });
    console.log('✅ UPDATE Request Status API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ UPDATE Request Status API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('coach_token');
      localStorage.removeItem('coach_data');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to update request" };
  }
};

// ✅ Get coach's accepted athletes
export const getAcceptedAthletes = async () => {
  try {
    const response = await api.get("/requests/accepted-athletes");
    console.log('✅ GET Accepted Athletes API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ GET Accepted Athletes API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('coach_token');
      localStorage.removeItem('coach_data');
      window.location.href = '/coach/login';
    }
    
    throw error.response?.data || { message: "Failed to fetch accepted athletes" };
  }
};

// Export coach requests service
export const coachRequestsService = {
  getCoachRequests,
  updateRequestStatus,
  getAcceptedAthletes
};