import { currentFrigoType, frigoType } from "../types/friday";
import authClient from "./client";

export const getFridayCurrentOuting = async () => {
  const res = await authClient.get<currentFrigoType>("/manage/frigo/current");
  return res;
};
export const getAllFridayOuting = async () => {
  const res = await authClient.get<frigoType[]>("/manage/frigo");
  return res;
};
export const setFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.patch("/manage/frigo/current/" + id);
  return data;
};

export const unSetFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.delete("/manage/frigo/current/" + id);
  return data;
};

export const makeFrigo = async ({ date }: { date: string }) => {
  const { data } = await authClient.post("/manage/frigo", { date });
  return data;
};

export const deleteFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.delete("/manage/frigo/" + id);
  return data;
};

export const decideFrigo = async ({
  frigoId,
  studentId,
  isApproved,
}: {
  frigoId: string;
  studentId: string;
  isApproved: boolean;
}) => {
  console.log({
    frigoId,
    studentId,
    isApproved,
  });
  const { data } = await authClient.patch(
    `/manage/frigo/${frigoId}/${studentId}?approve=${isApproved}`
  );
  return data;
};
