import { Hono } from "hono";
import { registerRoutes } from "./routes.ts";

export function createApp() {
  const app = new Hono();

  // ✅ Global error handler (correct for Hono)
  app.onError((err, c) => {
    console.error("🔥 UNHANDLED ERROR:", err);

    return c.json(
      {
        error: "Failed to process message",
        details: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : null,
      },
      500
    );
  });

  // ✅ Sanity ping route
  app.get("/ping", (c) => c.text("pong"));

  // ✅ Register ALL API routes
  registerRoutes(app);

  return app;
}
