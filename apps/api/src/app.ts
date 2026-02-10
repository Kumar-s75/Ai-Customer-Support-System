// import { Hono } from "hono";
// import { errorMiddleware } from "./middlewares/error.middleware.ts";
// import { registerRoutes } from "./routes.ts";


// export function createApp() {
//   const app = new Hono();

//   // Global error handling
//   app.use("*", errorMiddleware);

//   // Register routes
//   registerRoutes(app);

//   return app;
// }
// import { Hono } from "hono";

// export function createApp() {
//   const app = new Hono();

//   app.get("/health", (c) => c.json({ status: "ok" }));

//   return app;
// }

import { Hono } from "hono";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { registerRoutes } from "./routes.ts";

export function createApp() {
  const app = new Hono();

  app.use("*", errorMiddleware);

  // register all API routes
  registerRoutes(app);

  return app;
}
