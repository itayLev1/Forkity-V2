import { PrismaClient } from '../../node_modules/.prisma/client/index.js';

const prisma = globalThis.__forkityPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__forkityPrisma = prisma;
}

export default prisma;
