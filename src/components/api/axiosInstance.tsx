import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { clearAuthData } from "../context/AuthContext";
import toast from 'react-hot-toast';

// Create an axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL:  process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach token
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Check if response exists
    if (error.response) {
      const errorMsg = (error.response.data as any)?.error || "An error occurred";
      if (errorMsg.errors.code === 401) {
        toast.error("Session expired. Please log in again.");
       clearAuthData();
        window.location.href = '/auth';
      }
    } else {
      // Handle network or unknown errors
      console.error("Network or unknown error", error.message);
    }

    return Promise.reject(error);
  }
);



export default axiosInstance;
