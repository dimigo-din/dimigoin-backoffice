import authClient from "./client";

export const getStudentByID = async ({ id }: { id: string }) => {
  const { data } = await authClient.get("/manage/user/student/" + id);
  return data;
};
