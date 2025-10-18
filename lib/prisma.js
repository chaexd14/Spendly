import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const globalForPrisma = globalThis;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
