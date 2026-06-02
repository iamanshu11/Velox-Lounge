import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Attach JWT from Zustand store on every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("dp-auth");
      if (stored) {
        const token = JSON.parse(stored)?.state?.token;
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
    } catch { /* ignore */ }
  }
  return config;
});

// On 401, clear auth and redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      if (!window.location.pathname.startsWith("/auth")) {
        localStorage.removeItem("dp-auth");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
