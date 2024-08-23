import { currentFrigoType } from "../types/friday";
import authClient from "./client";

export const getFridayCurrentOuting = async () => {
  const res = await authClient.get<currentFrigoType>("/manage/frigo/current");

  console.log(res);
  return res.data;
};

export const setFrigo = async ({ id }: { id: string }) => {
  console.log(id);
  const { data } = await authClient.patch("/manage/frigo/current" + id);
  return data;
};

export const unSetFrigo = async ({ id }: { id: string }) => {
  const { data } = await authClient.delete("/manage/frigo/current/" + id);
  return data;
};
