import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://money-management-dashboard-backend.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default axiosInstance;


// http://localhost:5000

// 