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

type washerApiType = {
  floor: number;
  position: "L" | "M" | "R" | "-";
  gender: "M" | "F";
};
export const createWasher = async (washerData: washerApiType) => {
  const { data } = await authClient.post("/manage/laundry", washerData);
  return data;
};
