import { orderTool } from "../tools/order.tool.ts";

interface OrderAgentInput {
  conversationId: string;
  message: string;
  context: {
    role: string;
    content: string;
  }[];
}

export const orderAgent = {
  async handle({ message }: OrderAgentInput) {
    // For assignment simplicity, tool handles user resolution
    const orders = await orderTool.getOrdersForDefaultUser();

    if (!orders || orders.length === 0) {
      return {
        role: "assistant",
        content: "I couldn’t find any orders associated with your account.",
      };
    }

    const mentionedOrder = orders.find((o) =>
      message.toLowerCase().includes(o.id.toLowerCase())
    );

    const selectedOrder = mentionedOrder ?? orders[0];

    if (!selectedOrder) {
      return {
        role: "assistant",
        content: "I’m unable to determine your order details at the moment.",
      };
    }

    return {
      role: "assistant",
      content: `Your order (${selectedOrder.id}) is currently **${selectedOrder.status}**.`,
    };
  },
};
