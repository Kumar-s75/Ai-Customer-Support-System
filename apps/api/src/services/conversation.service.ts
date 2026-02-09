import { prisma } from "@repo/db";

export const conversationService = {
  async listConversations() {
    return prisma.conversation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
  },

  async getConversationById(conversationId: string) {
    return prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  },

  async deleteConversation(conversationId: string) {
    // delete messages first to avoid FK issues
    await prisma.message.deleteMany({
      where: {
        conversationId,
      },
    });

    return prisma.conversation.delete({
      where: {
        id: conversationId,
      },
    });
  },
};
