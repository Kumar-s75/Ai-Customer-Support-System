import type { Hono } from "hono";
import { healthController } from "./controllers/health.controller.js";
import {
  listConversationsController,
  getConversationController,
  deleteConversationController,
} from "./controllers/conversation.controller.js";
import { sendMessageController } from "./controllers/chat.controller.js";

export function registerRoutes(app: Hono) {
  app.get("/api/health", healthController);

  app.get("/api/chat/conversations", listConversationsController);
  app.get("/api/chat/conversations/:id", getConversationController);
  app.delete("/api/chat/conversations/:id", deleteConversationController);
  app.post("/api/chat/messages", sendMessageController);

}
