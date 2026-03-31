// prisma/prismaClient.js
import pkg from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;

console.log("DB URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL + '?sslmode=require',
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});