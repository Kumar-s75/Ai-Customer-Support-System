"use client";

import { useEffect, useState } from "react";
import { fetchConversations, fetchConversation } from "../lib/api";
import { Conversation, Message } from "../types";
import ChatWindow from "./components/ChatWindow";
import ConversationList from "./components/ConversationList";

export default function Page() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchConversations().then(setConversations);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    fetchConversation(activeId).then((c) => setMessages(c.messages));
  }, [activeId]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ConversationList
        conversations={conversations}
        onSelect={setActiveId}
      />
      <ChatWindow
        conversationId={activeId ?? undefined}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
