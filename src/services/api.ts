import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = "https://api.the-odds-api.com/v4";
const API_KEY = import.meta.env.VITE_ODDS_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add API key to every request
axiosInstance.interceptors.request.use((config) => {
  if (!config.params) config.params = {};
  config.params["apiKey"] = API_KEY;
  return config;
});

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
};
