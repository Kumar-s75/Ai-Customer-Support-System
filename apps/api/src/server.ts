import { serve } from "@hono/node-server";
import { createApp } from "./app.ts";

const app = createApp();

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 API server is running on http://localhost:${port}`);
