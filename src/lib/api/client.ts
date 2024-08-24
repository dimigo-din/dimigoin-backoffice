import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import defaultClient from "./defaultClient";
import { getCookie, setCookie, removeCookie } from "./cookie";
import { logout, refreshJWT, removeRefreshToken } from "./auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const accessToken = getCookie("jwt");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = getCookie("refresh");
      refreshJWT({ token: refreshToken }).catch((e) => {
        logout();
      });
    }
  }
);

export default authClient;
