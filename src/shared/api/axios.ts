import axios, { type InternalAxiosRequestConfig } from "axios";

const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const authAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  withCredentials: true,
});

export const trackingAPI = axios.create({
  baseURL: import.meta.env.VITE_TRACKING_API_URL,
  withCredentials: true,
});

export const analyticsAPI = axios.create({
  baseURL: import.meta.env.VITE_ANALYTICS_API_URL,
  withCredentials: true,
});

export const aiChatAPI = axios.create({
  baseURL: import.meta.env.VITE_AI_CHAT_API_URL,
  withCredentials: true,
});

authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

trackingAPI.interceptors.request.use(attachToken);
analyticsAPI.interceptors.request.use(attachToken);
analyticsAPI.interceptors.request.use(attachToken);
