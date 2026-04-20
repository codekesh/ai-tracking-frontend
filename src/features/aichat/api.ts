import { aiChatAPI } from "../../shared/api/axios";

export const askAI = async (question: string) => {
  console.log("Asking AI:", question);
  const res = await aiChatAPI.post("/ai/chat", { question });
  console.log(res);

  return res.data.answer;
};
