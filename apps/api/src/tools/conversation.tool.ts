import { prisma } from "@repo/db";
import { compactMessages } from "../utils/contextCompaction.js";

export const conversationTool = {
  async getContext(conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          select: {
            role: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    if (!conversation) {
      return [];
    }

    const { summary, recent } = compactMessages(conversation.messages);

    // Persist summary only if newly generated
    if (summary && summary !== conversation.summary) {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { summary },
      });
    }

    const context: { role: string; content: string }[] = [];

    if (conversation.summary) {
      context.push({
        role: "system",
        content: `Conversation summary: ${conversation.summary}`,
      });
    }

    context.push(
      ...recent.map((m) => ({
        role: m.role,
        content: m.content,
      }))
    );

    return context;
  },
};
