import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, { ...options }) => {
  return cookies.set(name, value, { secure: true, path: "/", ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: "/" });
};
