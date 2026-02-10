import { prisma } from "@repo/db";

export const orderTool = {
  async getOrdersForDefaultUser() {
    const user = await prisma.user.findFirst();
    if (!user) return [];

    return prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  },
};
