import { trackingAPI } from "../../shared/api/axios";

export const askAI = async (question: string) => {
  console.log("Asking AI:", question);
  const res = await trackingAPI.post("/ai/chat", { question });
  console.log(res);

  return res.data.answer;
};
