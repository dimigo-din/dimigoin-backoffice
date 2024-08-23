import { washerType } from "../types/laundry";
import authClient from "./client";

export const getWasher = async () => {
  const { data } = await authClient.get<washerType[]>("/manage/laundry");
  return data;
};

export const getCurrentWasher = async () => {
  const { data } = await authClient.get("/laundry");
  return data;
};
