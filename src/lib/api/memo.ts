import authClient from "./client";

export const submitMemo = async ({
  subject,
  topic,
  concept,
  memo,
}: {
  subject: string;
  topic: string;
  concept: string;
  memo: string;
}) => {
  return await authClient.post("/memo/submit", {
    subject,
    topic,
    concept,
    memo,
  });
};

export const saveMemo = async ({
  subject,
  topic,
  concept,
  memo,
}: {
  subject: string;
  topic: string;
  concept: string;
  memo: string;
}) => {
  console.log(subject, topic, concept, memo);
  return await authClient.post("/memo/save", {
    subject,
    topic,
    concept,
    memo,
  });
};

export const recallMemo = async ({
  subject,
  topic,
  concept,
}: {
  subject: string;
  topic: string;
  concept: string;
}) => {
  return await authClient.post("/memo/recall", {
    subject,
    topic,
    concept,
  });
};
