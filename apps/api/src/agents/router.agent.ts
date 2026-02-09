import type { IntentType } from "@repo/shared";
import { conversationTool } from "../tools/conversation.tool.js";
import { supportAgent } from "./support.agent.js";
import { orderAgent } from "./order.agent.js";
import { billingAgent } from "./billing.agent.js";

interface RouteInput {
  conversationId: string;
  message: string;
}

function classifyIntent(message: string): IntentType {
  const text = message.toLowerCase();

  if (
    text.includes("order") ||
    text.includes("delivery") ||
    text.includes("track")
  ) {
    return "order";
  }

  if (
    text.includes("payment") ||
    text.includes("refund") ||
    text.includes("invoice") ||
    text.includes("billing")
  ) {
    return "billing";
  }

  return "support";
}

export const routerAgent = {

  async route(input: RouteInput) {
    const { conversationId, message } = input;

    const recentMessages = await conversationTool.getRecentMessages(
      conversationId
    );

    const intent = classifyIntent(message);

    switch (intent) {
      case "order":
        return orderAgent.handle({
          conversationId,
          message,
          context: recentMessages,
        });

      case "billing":
        return billingAgent.handle({
          conversationId,
          message,
          context: recentMessages,
        });

      case "support":
        return supportAgent.handle({
          conversationId,
          message,
          context: recentMessages,
        });

      default:
        return {
          role: "assistant",
          content:
            "I'm not sure how to help with that yet. Could you provide more details?",
        };
    }
  },

  
  async *routeStream(input: RouteInput) {
    const { conversationId, message } = input;

  
    yield { type: "status", value: "Thinking..." };

    const recentMessages = await conversationTool.getRecentMessages(
      conversationId
    );

    const intent = classifyIntent(message);

    yield { type: "status", value: "Searching..." };

    let response;

    switch (intent) {
      case "order":
        response = await orderAgent.handle({
          conversationId,
          message,
          context: recentMessages,
        });
        break;

      case "billing":
        response = await billingAgent.handle({
          conversationId,
          message,
          context: recentMessages,
        });
        break;

      default:
        response = await supportAgent.handle({
          conversationId,
          message,
          context: recentMessages,
        });
    }

 
    const tokens = response.content.split(" ");

    for (const token of tokens) {
      yield { type: "token", value: token + " " };
      await delay(35);
    }

    
    yield { type: "done", value: response.content };
  },
};


function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
