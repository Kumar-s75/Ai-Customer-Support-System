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
  contextText: string
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

  // Context-aware fallback (simple but valid)
  if (contextText.length > 0) {
    return "Thanks for the details so far. Based on our conversation, let’s take the next step together.";
  }

  return "Thanks for reaching out! I'm looking into your request and will guide you through the next steps.";
}

export const supportAgent = {
  async handle({ message, context }: SupportAgentInput) {
    // Build a lightweight text context from injected messages
    const contextText = context
      .slice(-5)
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const response = generateSupportResponse(message, contextText);

    return {
      role: "assistant",
      content: response,
    };
  },
};
