import axios from "axios";

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

authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
