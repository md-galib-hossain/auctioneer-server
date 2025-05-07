import { prisma } from "../db/db";

export const verifySocketAuth = async (token: string) => {
    if (!token) throw new Error("No token provided");
  const extractedToken = token.split(".")[0]
    // Verify token using your auth system
    const session = await prisma.session.findUnique({ where: { token:extractedToken } });
    console.log(session,'sdfjg')
    if (!session || session.expiresAt < new Date()) {
      throw new Error("Invalid or expired token");
    }
  
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });
  
    if (!user || user.banned) {
      throw new Error("User not found or banned");
    }
  
    return user;
  };