import { Cookies } from "react-cookie";
import authClient from "./client";
import { removeCookie, setCookie } from "./cookie";
import defaultClient from "./defaultClient";
export const logout = async () => {
  removeCookie("jwt");
  removeCookie("refresh");
  window.location.href = "/auth";
  window.location.reload();
};
export const getPong = async () => {
  const { data } = await defaultClient.get("auth/ping");
  return data;
};

export const googleLogin = async ({ token }: { token: string }) => {
  const { data } = await defaultClient.post("auth/login/dimigo?isWeb=true", {
    token,
  });
  setCookie("jwt", data.accessToken, {});
  setCookie("refresh", data.refreshToken, {});
  window.location.href = "/dashboard";
  return data;
};

export const refreshJWT = async ({ token }: { token: string }) => {
  const { data } = await defaultClient.post("/auth/refresh", { token });
  setCookie("jwt", data.accessToken, {});
  setCookie("refresh", data.refreshToken, {});
};