import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

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
    let message = "Something went wrong";

    if (error.response) {
      // Server responded with an error
      if (error.response.status === 401) {
        localStorage.removeItem("authToken"); 
  window.location.href = '/login';
        message = "Your session has expired. Please log in again.";
      } else {
        message =
          (error.response.data as any)?.message ||
          `Error ${error.response.status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      // Request was made but no response
      message = "No response from server. Please try again.";
    } else {
      // Something happened while setting up the request
      message = error.message;
    }

    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
