// agents/router.agent.ts

import type { IntentType } from "@repo/shared";
import { conversationTool } from "../tools/conversation.tool.ts";
import { supportAgent } from "./support.agent.ts";
import { orderAgent } from "./order.agent.ts";
import { billingAgent } from "./billing.agent.ts";

interface RouteInput {
  conversationId: string;
  message: string;
}

type AgentResponse = {
  role: string;
  content: string;
};


function classifyIntent(message: string): IntentType {
  const text = message.toLowerCase();

  if (text.includes("order") || text.includes("delivery") || text.includes("track")) {
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
  async route(input: RouteInput): Promise<AgentResponse> {
    const { conversationId, message } = input;

    const context = await conversationTool.getContext(conversationId);
    const intent = classifyIntent(message);

    switch (intent) {
      case "order":
        return orderAgent.handle({ conversationId, message, context });

      case "billing":
        return billingAgent.handle({ conversationId, message, context });

      default:
        return supportAgent.handle({ conversationId, message, context });
    }
  },

  async *routeStream(input: RouteInput) {
    const { conversationId, message } = input;

    yield { type: "status", value: "Thinking..." };

    const context = await conversationTool.getContext(conversationId);
    const intent = classifyIntent(message);

    yield { type: "status", value: "Searching..." };

    let response: AgentResponse;

    switch (intent) {
      case "order":
        response = await orderAgent.handle({ conversationId, message, context });
        break;

      case "billing":
        response = await billingAgent.handle({ conversationId, message, context });
        break;

      default:
        response = await supportAgent.handle({ conversationId, message, context });
    }

    for (const token of response.content.split(" ")) {
      yield { type: "token", value: token + " " };
      await delay(35);
    }

    yield { type: "done", value: response.content };
  },
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
