import { Server, Socket } from "socket.io";
import { prisma } from "../../db/db";

export const AuctionChatSocketHandler = (socket: Socket, io: Server) => {
  const userId = socket.data.user.id;

  socket.on("chat:send-message", async ({ roomCode, content }: { roomCode: string; content: string }, callback) => {
    try {
      const room = await prisma.auctionRoom.findUnique({ where: { roomCode } });
      if (!room) throw new Error("Room not found");

      const message = await prisma.chatMessage.create({
        data: {
          auctionRoomId: room.id,
          userId,
          content,
        },
        include: { user: { select: { name: true } } },
      });

      io.to(roomCode).emit("chat:new-message", {
        id: message.id,
        content: message.content,
        user: message.user,
        createdAt: message.createdAt,
      });

      callback({ success: true, message: "Message sent" });
    } catch (error: any) {
      callback({ success: false, message: error.message });
    }
  });
};