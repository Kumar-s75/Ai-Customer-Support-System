import type { Context } from "hono";
import { chatService } from "../services/chat.service.js";

export async function sendMessageController(c: Context) {
  const body = await c.req.json();

  if (!body?.content) {
    return c.json({ error: "Message content is required" }, 400);
  }

  const result = await chatService.sendMessage({
    conversationId: body.conversationId,
    content: body.content,
  });

  return c.json(result, 201);
}
