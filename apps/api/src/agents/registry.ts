import type { AgentCapability, AgentType } from "@repo/shared";

export const AGENT_REGISTRY: Record<AgentType, AgentCapability> = {
  support: {
    type: "support",
    description:
      "Handles general support inquiries, FAQs, and troubleshooting using conversation context.",
  },
  order: {
    type: "order",
    description:
      "Handles order-related queries such as order status, tracking, and delivery information.",
  },
  billing: {
    type: "billing",
    description:
      "Handles billing inquiries including payments, refunds, invoices, and subscriptions.",
  },
};
