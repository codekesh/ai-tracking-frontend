import type { Props } from "../types";

export default function ChatMessage({ message, isUser }: Props) {
  return <div className={`message ${isUser ? "user" : "ai"}`}>{message}</div>;
}
