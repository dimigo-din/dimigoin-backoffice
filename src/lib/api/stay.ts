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

export const decideStayOutgo = async ({
  stayOutGoId,
  isApprove,
}: {
  stayOutGoId: string;
  isApprove: boolean;
}) => {
  const { data } = await authClient.patch(
    `/manage/stay/outgo/${stayOutGoId}?isApprove=${isApprove}`
  );
  return data;
};
