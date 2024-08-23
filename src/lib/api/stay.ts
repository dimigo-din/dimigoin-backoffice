import { currentStayType } from "../types/stay";
import authClient from "./client";

export const getStay = async () => {
  const { data } = await authClient.get("/manage/stay");
  return data;
};

export const getStayCurrent = async () => {
  const { data } = await authClient.get<currentStayType>(
    "/manage/stay/current"
  );
  return data;
};
