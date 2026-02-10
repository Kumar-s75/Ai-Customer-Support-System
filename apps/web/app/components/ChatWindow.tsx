"use client";

import { useState } from "react";
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

  async function send(content: string) {
    if (!content || isSending) return;

    setIsSending(true);

    // 1️⃣ Optimistically add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content },
    ]);

    let assistantText = "";

    try {
      await sendMessageStream(conversationId, content, (chunk) => {
        if (chunk.type === "status") {
          setStatus(chunk.value);
        }

        if (chunk.type === "token") {
          assistantText += chunk.value;

          setMessages((prev) => {
            // remove last assistant message if streaming
            const withoutAssistant = prev.filter(
              (m) => m.role !== "assistant"
            );

            return [
              ...withoutAssistant,
              { role: "assistant", content: assistantText },
            ];
          });
        }

        if (chunk.type === "done") {
          setStatus(null);
        }
      });
    } finally {
      setIsSending(false);
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
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 12,
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}

        {status && (
          <div style={{ fontStyle: "italic", opacity: 0.7 }}>
            {status}
          </div>
        )}
      </div>

      {/* Input */}
      <MessageInput
        onSend={send}
        disabled={isSending}
      />
    </div>
  );
}
