import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import defaultClient from "./defaultClient";
import { getCookie, setCookie, removeCookie } from "./cookie";
import { refreshJWT, removeRefreshToken } from "./auth";

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
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401) {
      try {
        const refreshToken = getCookie("refresh");
        await refreshJWT({ token: refreshToken });
        window.location.reload();
        const newAccessToken = getCookie("jwt");

        if (newAccessToken) {
          authClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          return authClient(originalRequest);
        } else {
          if (typeof window !== "undefined") {
            window.location.href = "/auth";
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        removeCookie("jwt");
        removeCookie("refresh");
        // if (typeof window !== "undefined") {
        //   window.location.href = "/auth";
        // }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default authClient;
