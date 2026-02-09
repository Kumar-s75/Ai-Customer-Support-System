import { prisma } from "@repo/db";

export const orderTool = {
  async getOrdersByUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });
  },

  async getOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        createdAt: true,
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
    });
  },
};
