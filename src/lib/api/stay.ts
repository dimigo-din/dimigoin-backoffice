import authClient from "./client";

export const getStaySeats = async () => {
  const { data } = await authClient.get("/manage/stay/seat");
  return data;
};

export const getStaySchedule = async () => {
  const { data } = await authClient.get("/manage/stay/schedule");
  return data;
};

export const getStayApplication = async () => {
  const { data } = await authClient.get("/manage/stay");
  return data;
};
