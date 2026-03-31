import { prisma } from "./prisma/prismaClient.js"; // твой prisma client

export async function getAllFeedbacks() {
  return await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }, // чтобы получить имя и email
  });
}

export async function addFeedback(name, email, message) {
  // ищем пользователя по email, если нет — создаём
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { name, email },
    });
  }

  return await prisma.review.create({
    data: {
      message,
      userId: user.id,
    },
    include: { user: true },
  });
}