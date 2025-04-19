import { PrismaClient, Prisma } from "@prisma/client"; // Import Prisma

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

 
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Use Prisma.UserCreateInput for stronger typing based on your schema
export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  });
}
