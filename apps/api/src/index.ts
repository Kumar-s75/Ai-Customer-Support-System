import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { prisma } from "@repo/db";
import { getOrderStatus, checkRefundStatus } from "./tools.js"
const app = new Hono()


app.get("/health", (c) => {
  return c.json({ status: "ok", message: "Hono API running" })
})

app.get("/order/:id", async (c) => {
  const id = c.req.param("id")
  return c.json(await getOrderStatus(id))
})

app.get("/refund/:id", async (c) => {
  const id = c.req.param("id")
  return c.json(await checkRefundStatus(id))
})

app.get("/users", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log("🚀 API running at http://localhost:3000")
