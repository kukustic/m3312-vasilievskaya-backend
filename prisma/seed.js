import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Начинаем заполнение БД...");

  // создаём Нори
  const cat = await prisma.cat.create({
    data: {
      name: "Нори",
      age: 2,
      description: "Чёрная кошка, любит коробки и внимание",
    },
  });

  console.log("Кот создан:", cat.name);

  // истории
  await prisma.story.createMany({
    data: [
      {
        title: "Неудачный прыжок",
        content: "Нори не рассчитала высоту и упала в кастрюлю 😼",
        catId: cat.id,
      },
      {
        title: "Коробка — лучший дом",
        content: "Нори проигнорировала дорогую лежанку и выбрала коробку",
        catId: cat.id,
      },
    ],
  });

  console.log("Истории добавлены");

  // уход
  await prisma.careRoutine.createMany({
    data: [
      {
        title: "Кормление",
        frequency: "2 раза в день",
        description: "Влажный + сухой корм",
        catId: cat.id,
      },
      {
        title: "Игры",
        frequency: "3 раза в день",
        description: "Любит игрушечную мышку",
        catId: cat.id,
      },
    ],
  });

  console.log("Уход добавлен");

  // пользователь
  const user = await prisma.user.create({
    data: {
      name: "Ксюша",
      email: "ksenia@example.com",
    },
  });

  console.log("Пользователь создан");

  // 💬 отзыв
  await prisma.review.create({
    data: {
      message: "Нори — лучшая кошка 😭❤️",
      userId: user.id,
    },
  });

  console.log("Отзыв добавлен");

  console.log("БД успешно заполнена!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());