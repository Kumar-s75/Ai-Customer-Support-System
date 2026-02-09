import type { Hono } from "hono";
import { healthController } from "./controllers/health.controller.js";

export function registerRoutes(app: Hono) {
  app.get("/api/health", healthController);

  // placeholders (no logic yet)
  // app.route("/api/chat", chatRoutes)
  // app.route("/api/agents", agentRoutes)
}
