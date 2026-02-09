import { prisma } from "@repo/db";

export const billingTool = {
  async getInvoiceByPayment(paymentId: string) {
    return prisma.invoice.findUnique({
      where: { paymentId },
      select: {
        id: true,
        issuedAt: true,
      },
    });
  },

  async getPaymentsByOrder(orderId: string) {
    return prisma.payment.findMany({
      where: { orderId },
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
      },
    });
  },
};
