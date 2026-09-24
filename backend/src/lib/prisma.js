import { PrismaClient } from '@prisma/client';

const prisma = globalThis.__forkityPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__forkityPrisma = prisma;
}

export default prisma;
