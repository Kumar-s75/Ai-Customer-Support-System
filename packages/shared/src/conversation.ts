export type MessageRole = "user" | "assistant";

export interface MessageDTO {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface ConversationDTO {
  id: string;
  messages: MessageDTO[];
  summary?: string | null;
  createdAt: Date;
}
