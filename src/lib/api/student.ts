import { student } from "../types/student";
import authClient from "./client";

export const getStudentByID = async ({ id }: { id: string }) => {
  const { data } = await authClient.get("/manage/user/student/" + id);
  return data;
};

export const getAllStudent = async () => {
  const { data } = await authClient.get<student[]>("/manage/user/student");
  return data;
};
