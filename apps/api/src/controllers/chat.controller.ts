import type { Context } from "hono";
import { chatService } from "../services/chat.service.js";

export async function sendMessageController(c: Context) {
  return c.json({ message: "Not implemented yet" }, 501);
}
