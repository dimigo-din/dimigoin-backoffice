import defaultClient from "./defaultClient";

export const getPong = async () => {
  const { data } = await defaultClient.get("auth/ping");
  return data;
};
