import type { Context } from "hono";
import { prisma } from "@repo/db";
import { routerAgent } from "../agents/router.agent.ts";

export async function streamChatController(c: Context) {
  const body = await c.req.json();

  if (!body?.content) {
    return c.json({ error: "Message content is required" }, 400);
  }

  // 1️⃣ Get or create conversation
  const conversation =
    body.conversationId
      ? await prisma.conversation.findUnique({
          where: { id: body.conversationId },
        })
      : null;

  const activeConversation =
    conversation ??
    (await prisma.conversation.create({
      data: {
        userId: (await prisma.user.findFirst())!.id,
      },
    }));


  await prisma.message.create({
    data: {
      conversationId: activeConversation.id,
      role: "user",
      content: body.content,
    },
  });

  // 3️⃣ Create SSE stream
  const stream = new ReadableStream({
    async start(controller) {
      for await (const event of routerAgent.routeStream({
        conversationId: activeConversation.id,
        message: body.content,
      })) {
        controller.enqueue(
          `data: ${JSON.stringify(event)}\n\n`
        );
      }

      controller.close();
    },
  });

  return c.newResponse(stream, 200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
}
