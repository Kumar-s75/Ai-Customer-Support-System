// tools/conversation.tool.ts

import { prisma } from "@repo/db";
import { compactMessages } from "../utils/contextCompaction.ts";

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

    const { summary: newSummary, recent } = compactMessages(
      conversation.messages
    );

    const effectiveSummary = newSummary ?? conversation.summary;

    if (newSummary && newSummary !== conversation.summary) {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { summary: newSummary },
      });
    }

    const context: { role: string; content: string }[] = [];

    if (effectiveSummary) {
      context.push({
        role: "system",
        content: `Conversation summary: ${effectiveSummary}`,
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
