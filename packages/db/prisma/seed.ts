import "dotenv/config";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {

  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
    },
  });


  const conversation1 = await prisma.conversation.create({
    data: {
      userId: user1.id,
    },
  });

  const conversation2 = await prisma.conversation.create({
    data: {
      userId: user1.id,
    },
  });

  const conversation3 = await prisma.conversation.create({
    data: {
      userId: user2.id,
    },
  });


  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation1.id,
        role: "user",
        content: "Hi, I need help with my recent order.",
      },
      {
        conversationId: conversation1.id,
        role: "assistant",
        content: "Sure! Can you share your order ID?",
      },
      {
        conversationId: conversation1.id,
        role: "user",
        content: "Yes, it's ORD-1001.",
      },

      {
        conversationId: conversation2.id,
        role: "user",
        content: "I was charged twice for my subscription.",
      },
      {
        conversationId: conversation2.id,
        role: "assistant",
        content: "Let me check your billing details.",
      },

      {
        conversationId: conversation3.id,
        role: "user",
        content: "Where is my order?",
      },
      {
        conversationId: conversation3.id,
        role: "assistant",
        content: "Checking the delivery status for you.",
      },
    ],
  });


  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: "shipped",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: "delivered",
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: user2.id,
      status: "pending",
    },
  });

 
  const payment1 = await prisma.payment.create({
    data: {
      orderId: order1.id,
      amount: 199.99,
      status: "paid",
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      orderId: order2.id,
      amount: 99.99,
      status: "refunded",
    },
  });

 
  await prisma.invoice.create({
    data: {
      paymentId: payment1.id,
    },
  });

  await prisma.invoice.create({
    data: {
      paymentId: payment2.id,
    },
  });

  console.log(" Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(" Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
