import { washerTimetableType, washerType } from "../types/laundry";
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

type washerTimetableApiType = {
  gender: "M" | "F";
  grade: number[];
  laundryId: string;
  sequence: string[];
  type: number;
};
export const editWasherTimeTable = async (
  timetable: washerTimetableApiType
) => {
  const { data } = await authClient.put("/manage/laundry/timetable", timetable);
  return data;
};

export const deleteAllWasherApplication = async () => {
  const { data } = await authClient.delete("/manage/laundry");
  return data;
};
