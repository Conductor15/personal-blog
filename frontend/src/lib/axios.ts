import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes("/admin/login")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
