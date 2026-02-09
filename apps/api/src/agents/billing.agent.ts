import { billingTool } from "../tools/billing.tool.js";

interface BillingAgentInput {
  conversationId: string;
  message: string;
  context: {
    role: string;
    content: string;
  }[];
}

export const billingAgent = {
  async handle(input: BillingAgentInput) {
    const { message } = input;

    const orderId = extractOrderId(message);

    if (!orderId) {
      return {
        role: "assistant",
        content:
          "Could you please provide the order ID so I can check your billing details?",
      };
    }

const payments = await billingTool.getPaymentsByOrder(orderId);

if (!payments || payments.length === 0) {
  return {
    role: "assistant",
    content: "I couldn’t find any payment records for this order.",
  };
}

const refunded = payments.find(p => p.status === "refunded");

if (refunded) {
  return {
    role: "assistant",
    content: `Your payment of ₹${refunded.amount} has already been refunded.`,
  };
}

// ✅ Explicitly assign after guard
const latestPayment = payments[0];

if (!latestPayment) {
  // This will realistically never happen, but satisfies TS
  return {
    role: "assistant",
    content: "Unable to determine the payment status at the moment.",
  };
}

return {
  role: "assistant",
  content: `Your payment of ₹${latestPayment.amount} was successful and no refunds are pending.`,
};


  },
};

function extractOrderId(message: string): string | null {
  const match = message.match(/order[-\s]?([a-z0-9]+)/i);
  return match ? match[0] : null;
}
