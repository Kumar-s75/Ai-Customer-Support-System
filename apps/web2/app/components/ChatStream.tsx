"use client";

import { useState } from "react";

type StreamEvent =
  | { type: "status"; value: string }
  | { type: "token"; value: string }
  | { type: "done"; value: string };

export default function ChatStream() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  async function sendMessage() {
    setOutput("");
    setStatus(null);

    const res = await fetch("http://localhost:3000/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input }),
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        const event: StreamEvent = JSON.parse(
          line.replace("data: ", "")
        );

        if (event.type === "status") {
          setStatus(event.value);
        }

        if (event.type === "token") {
          setOutput((prev) => prev + event.value);
        }

        if (event.type === "done") {
          setStatus(null);
          setOutput(event.value);
        }
      }
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>AI Support Chat</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        style={{ width: "100%" }}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        Send
      </button>

      {status && (
        <p style={{ fontStyle: "italic", marginTop: 10 }}>
          {status}
        </p>
      )}

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {output}
      </div>
    </div>
  );
}
