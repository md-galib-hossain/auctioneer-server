import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect(); 
    console.log("✅ Prisma connected to the database");
  } catch (error) {
    console.error("❌ Prisma connection error:", error);
    process.exit(1);
  }
}
