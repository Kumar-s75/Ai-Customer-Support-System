import type { Hono } from "hono";
import { healthController } from "./controllers/health.controller.js";
import {
  listConversationsController,
  getConversationController,
  deleteConversationController,
} from "./controllers/conversation.controller.js";
import {
  sendMessageController,
  sendMessageStreamController,
} from "./controllers/chat.controller.js";
import {
  listAgentsController,
  agentCapabilitiesController,
} from "./controllers/agents.controller.js";


export function registerRoutes(app: Hono) {
app.get("/api/health", healthController);

app.get("/api/chat/conversations", listConversationsController);
app.get("/api/chat/conversations/:id", getConversationController);
app.get("/api/agents", listAgentsController);
app.get("/api/agents/:type/capabilities", agentCapabilitiesController);

app.delete("/api/chat/conversations/:id", deleteConversationController);
app.post("/api/chat/messages", sendMessageController);
app.post("/api/chat/messages/stream", sendMessageStreamController);
  
}
