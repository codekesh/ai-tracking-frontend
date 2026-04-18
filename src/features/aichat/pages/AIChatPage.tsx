import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import "../AIChat.css";
import { askAI } from "../../../shared/api/axios";
import type { ChatMessageTypes } from "../types";

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessageTypes[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    try {
      const reply = await askAI(input);

      const aiMsg = { text: reply, isUser: false };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your diet..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
