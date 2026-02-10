const API_BASE = "http://localhost:3000/api";

export async function fetchConversations() {
  const res = await fetch(`${API_BASE}/chat/conversations`, {
    cache: "no-store",
  });
  return res.json();
}

export async function fetchConversation(id: string) {
  const res = await fetch(`${API_BASE}/chat/conversations/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function sendMessageStream(
  conversationId: string | undefined,
  content: string,
  onChunk: (chunk: any) => void
) {
  const res = await fetch(`${API_BASE}/chat/messages/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, content }),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    decoder
      .decode(value)
      .trim()
      .split("\n")
      .forEach((line) => {
        if (line) onChunk(JSON.parse(line));
      });
  }
}
