import { prisma } from "@repo/db";

interface SendMessageInput {
  conversationId?: string;
  content: string;
}

export const chatService = {
  async sendMessage(input: SendMessageInput) {
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


    await prisma.message.create({
      data: {
        conversationId: activeConversation.id,
        role: "user",
        content,
      },
    });

    const assistantMessage = await prisma.message.create({
      data: {
        conversationId: activeConversation.id,
        role: "assistant",
        content: "Thanks for your message. I’m looking into it.",
      },
    });

    return {
      conversationId: activeConversation.id,
      message: assistantMessage,
    };
  },
};
