"use client";

import { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSend,
  disabled = false,
}: MessageInputProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim()) return;

    onSend(value.trim());
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginTop: 12,
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type your message…"
        style={{
          flex: 1,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          padding: "8px 16px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}
