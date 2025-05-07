import { Server, Socket } from "socket.io";
import { prisma } from "../../db/db";

export const BidSocketHandler = (socket: Socket, io: Server) => {
  const userId = socket.data.user.id;

  socket.on("bid:place-bid", async ({ roomCode, auctionItemId, amount }: { roomCode: string; auctionItemId: string; amount: number }, callback) => {
    try {
      const room = await prisma.auctionRoom.findUnique({ where: { roomCode } });
      if (!room) throw new Error("Room not found");

      const bid = await prisma.bid.create({
        data: {
          auctionRoomId: room.id,
          auctionItemId,
          userId,
          amount,
        },
        include: { user: { select: { name: true } } },
      });

      // Update current price of the auction item
      await prisma.auctionItem.update({
        where: { id: auctionItemId },
        data: { currentPrice: amount },
      });

      io.to(roomCode).emit("bid:new-bid", {
        id: bid.id,
        auctionItemId,
        amount: bid.amount,
        user: bid.user,
        createdAt: bid.createdAt,
      });

      callback({ success: true, message: "Bid placed" });
    } catch (error: any) {
      callback({ success: false, message: error.message });
    }
  });
};