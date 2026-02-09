import { prisma } from "@repo/db";

export const conversationTool = {
  async getRecentMessages(conversationId: string, limit = 10) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        role: true,
        content: true,
        createdAt: true,
      },
    });
  },

  async getConversationSummary(conversationId: string) {
    const convo = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { summary: true },
    });

    return convo?.summary ?? null;
  },
};
