import { prisma } from "@repo/db";
import { routerAgent } from "../agents/router.agent.ts";

export const chatService = {
  async sendMessage(input: { conversationId?: string; content: string }) {
    const { conversationId, content } = input;

    const conversation =
      conversationId
        ? await prisma.conversation.findUnique({
            where: { id: conversationId },
          })
        : null;

    const activeConversation =
      conversation ??
      (await prisma.conversation.create({
        data: {
          userId: (await prisma.user.findFirst())!.id,
        },
      }));

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: activeConversation.id,
        role: "user",
        content,
      },
    });

    // 🔥 ROUTER AGENT HERE
    const agentResponse = await routerAgent.route({
      conversationId: activeConversation.id,
      message: content,
    });

    // Save assistant response
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId: activeConversation.id,
        role: "assistant",
        content: agentResponse.content,
      },
    });

    return {
      conversationId: activeConversation.id,
      message: assistantMessage,
    };
  },
};
