import { prisma } from "@repo/db"


export async function getOrderStatus(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  })

  if (!order) {
    return { error: "Order not found" }
  }

  return {
    status: order.status,
    tracking: order.tracking
  }
}


export async function checkRefundStatus(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId }
  })

  if (!invoice) {
    return { error: "Invoice not found" }
  }

  return {
    refundStatus: invoice.refundStatus,
    amount: invoice.amount
  }
}
