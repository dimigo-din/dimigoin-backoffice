import authClient from "./client";

export const makeTopic = async ({ topic }: { topic: string }) => {
  await authClient.post("/common/gpt", { subject: topic });
};

export const getRoadMap = async () => {
  const { data } = await authClient.get("/common/subject");
  return data;
};

export const getRoadMapData = async ({ id }: { id: string }) => {
  const { data } = await authClient.post("/common/content", { subject: id });
  return data;
};
