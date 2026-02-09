import type { Context } from "hono";
import { conversationService } from "../services/conversation.service.js";

export async function listConversationsController(c: Context) {
  const conversations = await conversationService.listConversations();
  return c.json(conversations);
}

export async function getConversationController(c: Context) {
  const id = c.req.param("id");

  const conversation = await conversationService.getConversationById(id);

  if (!conversation) {
    return c.json({ error: "Conversation not found" }, 404);
  }

  return c.json(conversation);
}

export async function deleteConversationController(c: Context) {
  const id = c.req.param("id");

  await conversationService.deleteConversation(id);

  return c.json({ success: true });
}
