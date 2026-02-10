import type { Message } from "@repo/db";

const MAX_RECENT_MESSAGES = 10;

export function compactMessages(messages: Message[]) {
  if (messages.length <= MAX_RECENT_MESSAGES) {
    return {
      summary: null,
      recent: messages,
    };
  }

  const older = messages.slice(0, -MAX_RECENT_MESSAGES);
  const recent = messages.slice(-MAX_RECENT_MESSAGES);

  const summary = older
    .map((m) => `${m.role}: ${m.content}`)
    .join(" | ")
    .slice(0, 1000); 

  return { summary, recent };
}
