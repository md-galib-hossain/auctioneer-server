import { Server, Socket } from "socket.io";
import { AuctionRoomService } from "./auction-room.service";
import { prisma } from "../../db/db";

export const AuctionRoomSocketHandler = (socket: Socket, io: Server) => {
  const userId = socket.data.user.id;

  // Handle joining an auction room
  socket.on("auction:join-room", async ({ roomCode, password }: { roomCode: string; password: string }, callback) => {
    try {
      const result = await AuctionRoomService.joinAuctionRoom(userId, roomCode, password);
      
      // Join the socket room (namespace for the auction room)
      socket.join(roomCode);

      // Fetch updated participants
      const participants = await AuctionRoomService.getParticipants(result.roomCode);

      // Broadcast to all clients in the room
      io.to(roomCode).emit("auction:participants-updated", {
        roomCode,
        participants,
      });

      // Send success response to the client
      callback({ success: true, message: result.message });
    } catch (error: any) {
      callback({ success: false, message: error.message });
    }
  });

  // Handle leaving an auction room
  socket.on("auction:leave-room", async ({ roomCode }: { roomCode: string }, callback) => {
    try {
      await prisma.auctionRoom.update({
        where: { roomCode },
        data: { participants: { disconnect: { id: userId } } },
      });

      socket.leave(roomCode);

      const participants = await AuctionRoomService.getParticipants(roomCode);

      io.to(roomCode).emit("auction:participants-updated", {
        roomCode,
        participants,
      });

      callback({ success: true, message: `User left room ${roomCode}` });
    } catch (error: any) {
      callback({ success: false, message: error.message });
    }
  });
};