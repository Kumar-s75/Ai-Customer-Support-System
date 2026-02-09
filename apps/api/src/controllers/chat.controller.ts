import type { Context } from "hono";
import { chatService } from "../services/chat.service.js";
import { routerAgent } from "../agents/router.agent.js";
import { prisma } from "@repo/db";

export async function sendMessageController(c: Context) {
  const body = await c.req.json();

  if (!body?.content) {
    return c.json({ error: "Message content is required" }, 400);
  }

  const result = await chatService.sendMessage({
    conversationId: body.conversationId,
    content: body.content,
  });

  return c.json(result, 201);
}

// 🔥 ADD THIS (streaming)
export async function sendMessageStreamController(c: Context) {
  const body = await c.req.json();

  if (!body?.content) {
    return c.json({ error: "Message content is required" }, 400);
  }

  const conversationId = body.conversationId;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let finalContent = "";

      for await (const chunk of routerAgent.routeStream({
        conversationId,
        message: body.content,
      })) {
        controller.enqueue(
          encoder.encode(JSON.stringify(chunk) + "\n")
        );

        if (chunk.type === "token") {
          finalContent += chunk.value;
        }

        if (chunk.type === "done") {
          finalContent = chunk.value;
        }
      }

      // persist final streamed message
      if (conversationId && finalContent) {
        await prisma.message.create({
          data: {
            conversationId,
            role: "assistant",
            content: finalContent,
          },
        });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
  });
}
