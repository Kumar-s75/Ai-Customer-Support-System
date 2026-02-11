"use client";

import { useEffect, useRef, useState } from "react";
import { sendMessageStream } from "../../lib/api";
import MessageInput from "./MessageInput";
import { Message } from "../../types";

interface ChatWindowProps {
  conversationId?: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatWindow({
  conversationId,
  messages,
  setMessages,
}: ChatWindowProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  async function send(content: string) {
    if (!content || isSending) return;

    setIsSending(true);

    setMessages((prev) => [...prev, { role: "user", content }]);

    let assistantText = "";
    let assistantIndex: number | null = null;

    try {
      await sendMessageStream(conversationId, content, (chunk) => {
        if (chunk.type === "status") {
          setStatus(chunk.value);
        }

        if (chunk.type === "token") {
          assistantText += chunk.value;

          setMessages((prev) => {
            const updated = [...prev];

            if (assistantIndex === null) {
              assistantIndex = updated.length;
              updated.push({ role: "assistant", content: assistantText });
            } else {
              updated[assistantIndex] = {
                role: "assistant",
                content: assistantText,
              };
            }

            return updated;
          });
        }

        if (chunk.type === "done") {
          setStatus(null);
        }
      });
    } finally {
      setIsSending(false);
      setStatus(null);
    }
  }

  return (
    <div
      style={{
        flex: 1,
        padding: 16,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 12,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 8,
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <b>{m.role === "user" ? "You" : "Assistant"}:</b> {m.content}
          </div>
        ))}

        {status && (
          <div style={{ fontStyle: "italic", opacity: 0.7 }}>
            {status}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={send} disabled={isSending} />
    </div>
  );
}
