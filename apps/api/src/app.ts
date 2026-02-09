import { Hono } from "hono";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { registerRoutes } from "./routes.js";

export function createApp() {
  const app = new Hono();

  // Global error handling
  app.use("*", errorMiddleware);

  // Register routes
  registerRoutes(app);

  return app;
}
