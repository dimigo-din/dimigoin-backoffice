import authClient from "./client";

export const getCurrentUser = async () => {
  return await authClient.get("/auth/profile");
};
