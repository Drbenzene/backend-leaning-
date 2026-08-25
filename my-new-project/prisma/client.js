const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});
module.exports = prisma;
