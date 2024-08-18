import axios from "axios";
import defaultClient from "./defaultClient";
import { getCookie } from "./cookie";

const authClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwt");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (_) => {}
);

authClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwt");
    }
    return Promise.reject(error);
  }
);

export default authClient;
