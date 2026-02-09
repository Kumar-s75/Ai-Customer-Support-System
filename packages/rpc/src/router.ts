import { Hono } from "hono"

export const appRouter = new Hono()
  .get("/agents", (c) => {
    return c.json([
      { type: "support" },
      { type: "order" },
      { type: "billing" }
    ])
  })

export type AppType = typeof appRouter
