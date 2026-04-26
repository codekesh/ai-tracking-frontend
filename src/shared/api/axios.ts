import axios, { type InternalAxiosRequestConfig } from "axios";

const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const API = import.meta.env.VITE_API_URL;

export const authAPI = axios.create({
  baseURL: API,
});

export const trackingAPI = axios.create({
  baseURL: API,
});

export const analyticsAPI = axios.create({
  baseURL: API,
});

export const aiChatAPI = axios.create({
  baseURL: API,
});

authAPI.interceptors.request.use(attachToken);
trackingAPI.interceptors.request.use(attachToken);
analyticsAPI.interceptors.request.use(attachToken);
aiChatAPI.interceptors.request.use(attachToken);
