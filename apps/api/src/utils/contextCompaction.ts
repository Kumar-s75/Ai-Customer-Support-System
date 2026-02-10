type CompactableMessage = {
  role: string;
  content: string;
  createdAt: Date;
};

export function compactMessages(
  messages: CompactableMessage[]
): {
  summary: string | null;
  recent: CompactableMessage[];
} {
  const MAX_RECENT = 6;
  const SUMMARY_THRESHOLD = 12;

  if (messages.length <= SUMMARY_THRESHOLD) {
    return {
      summary: null,
      recent: messages.slice(-MAX_RECENT),
    };
  }

  const olderMessages = messages.slice(0, messages.length - MAX_RECENT);
  const recentMessages = messages.slice(-MAX_RECENT);

  const summary = olderMessages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n")
    .slice(0, 1000);

  return {
    summary,
    recent: recentMessages,
  };
}
