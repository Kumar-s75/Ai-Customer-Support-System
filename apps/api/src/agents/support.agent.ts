import { conversationTool } from "../tools/conversation.tool.js";

interface SupportAgentInput {
  conversationId: string;
  message: string;
  context: {
    role: string;
    content: string;
  }[];
}

function generateSupportResponse(
  message: string,
  context: {
    summary: string | null;
    recentContext: string;
  }
): string {
  const text = message.toLowerCase();

  if (text.includes("help")) {
    return "I'm here to help! Could you please describe the issue you're facing in a bit more detail?";
  }

  if (text.includes("problem") || text.includes("issue")) {
    return "Sorry to hear you're having trouble. Can you tell me what exactly isn't working?";
  }

  if (text.includes("contact") || text.includes("support")) {
    return "You can reach our support team through this chat. Just let me know what you need help with.";
  }

  // Fallback support response
  return "Thanks for reaching out! I'm looking into your request and will guide you through the next steps.";
}


export const supportAgent = {
  async handle(input: SupportAgentInput) {
    const { conversationId, message, context } = input;

    // 1️⃣ Load conversation summary (for future compaction)
    const summary =
      await conversationTool.getConversationSummary(conversationId);

    // 2️⃣ Build lightweight context
    const recentContext = context
      .slice(0, 5)
      .reverse()
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    // 3️⃣ Basic FAQ / support logic (deterministic)
    const response = generateSupportResponse(message, {
      summary,
      recentContext,
    });

    return {
      role: "assistant",
      content: response,
    };
  },
};
