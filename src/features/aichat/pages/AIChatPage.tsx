import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import "../AIChat.css";
import type { ChatMessageTypes } from "../types";
import { askAI } from "../api";

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessageTypes[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const reply = await askAI(input);
      const aiMsg = { text: reply, isUser: false };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && (
          <div className="message ai typing">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your diet..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
