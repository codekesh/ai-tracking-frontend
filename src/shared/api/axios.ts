import axios, { type InternalAxiosRequestConfig } from "axios";

const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const authAPI = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const trackingAPI = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
});

export const analyticsAPI = axios.create({
  baseURL: "http://localhost:8082",
  withCredentials: true,
});

export const aiChatAPI = axios.create({
  baseURL: "http://localhost:8083",
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
