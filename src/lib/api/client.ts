import axios from "axios";
import defaultClient from "./defaultClient";
import { getCookie, removeCookie } from "./cookie";
import { refreshJWT } from "./auth";

const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("jwt");

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (_) => {}
);

authClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      removeCookie("jwt");
      const refreshToken = getCookie("refresh");
      refreshJWT({ token: refreshToken });
    }
    return Promise.reject(error);
  }
);

export default authClient;
