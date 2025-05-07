import { Server, Socket } from "socket.io";
import { verifySocketAuth } from "../utils/authSocket";
import { AuctionRoomSocketHandler } from "../modules/AuctionRoom/auction-room.socket";
import { AuctionChatSocketHandler } from "../modules/AuctionChat/auction-chat.socket";
import { BidSocketHandler } from "../modules/AuctionBid/auction-bid.socket";

export const initializeSocket = (io: Server) => {
  // Middleware for authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      console.log(token)
      if (!token) {
        return next(new Error("No token provided"));
      }
      const user = await verifySocketAuth(token); // Verify token
      if (!user) {
        return next(new Error("Invalid token or user not found"));
      }
      socket.data.user = user; // Attach user to socket
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket: Socket) => {
    // Defensive check for socket.data.user
    if (!socket.data.user) {
      console.error("No user data attached to socket");
      socket.disconnect(true); // Disconnect unauthenticated socket
      return;
    }

    console.log(`🔌 User connected: ${socket.data.user.id}`);


 // Listen for "test-message" from client
 socket.on("test-message", (message: string) => {
    console.log("Received test-message:", message);
    socket.emit("test-response", `Server received: ${message}`);
  });

    // Initialize module-specific socket handlers
    AuctionRoomSocketHandler(socket, io);
    AuctionChatSocketHandler(socket, io);
    BidSocketHandler(socket, io);

    socket.on("disconnect", () => {
      console.log(`🔌 User disconnected: ${socket.data.user?.id || "unknown"}`);
    });
  });
};