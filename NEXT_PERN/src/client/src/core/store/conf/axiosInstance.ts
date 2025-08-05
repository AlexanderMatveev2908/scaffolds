import { envApp } from "@/core/constants/env";
import axios from "axios";

export const instanceAxs = axios.create({
  baseURL: envApp.BACK_URL,
  withCredentials: true,
});

instanceAxs.interceptors.request.use((config) => {
  config.headers["Content-Type"] =
    config.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";
  return config;
});
