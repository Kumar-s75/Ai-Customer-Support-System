import type { Context } from "hono";
import { chatService } from "../services/chat.service.ts";

export async function sendMessageController(c: Context) {
  try {
    const body = await c.req.json();

    if (!body || typeof body.content !== "string") {
      return c.json({ error: "Message content is required" }, 400);
    }

    const result = await chatService.sendMessage({
      conversationId: body.conversationId,
      content: body.content,
    });

    return c.json(result, 201);
  } catch (err) {
    console.error("chat.controller error:", err);
    return c.json({ error: "Failed to process message" }, 500);
  }
}
