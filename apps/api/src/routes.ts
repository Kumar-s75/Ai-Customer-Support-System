import type { Hono } from "hono";

import { healthController } from "./controllers/health.controller.ts";
import { sendMessageController } from "./controllers/chat.controller.ts";
import { listAgentsController } from "./controllers/agents.controller.ts";
import { getAgentCapabilitiesController } from "./controllers/agents.controller.ts";
import {
  listConversationsController,
  getConversationController,
  deleteConversationController,
} from "./controllers/conversation.controller.ts";
import { streamChatController } from "./controllers/chat.stream.controller.ts";

export function registerRoutes(app: Hono) {
  // Health
  app.get("/health", healthController);

  // Chat
  app.post("/api/chat/messages", sendMessageController);

  // Conversations
  app.get("/api/chat/conversations", listConversationsController);
  app.get("/api/chat/conversations/:id", getConversationController);
  app.delete("/api/chat/conversations/:id", deleteConversationController);
  app.post("/api/chat/stream", streamChatController);
  
  // Agents
  app.get("/api/agents", listAgentsController);
  app.get(
    "/api/agents/:type/capabilities",
    getAgentCapabilitiesController
  );
}
