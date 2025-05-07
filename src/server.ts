import { createServer, Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import config from "./app/config";
import app from "./app";
import { connectDB, prisma } from "./app/db/db";
import { auth } from "./app/utils/auth";
import { initializeSocket } from "./app/socket"; // 👈 New socket initialization

let server: Server = createServer(app);
let io: SocketIOServer; // 👈 Socket.IO instance

const exitHandler = async () => {
  if (server) {
    server.close(() => {
      console.log("💀 Server closed gracefully");
    });
  }
  if (io) {
    io.close(() => {
      console.log("💀 Socket.IO closed gracefully");
    });
  }

  try {
    await prisma.$disconnect();
    console.log("🛑 Prisma disconnected gracefully");
  } catch (err) {
    console.error("❌ Error while disconnecting Prisma: ", err);
  }

  process.exit(1);
};

const unexpectedErrorHandler = (error: unknown) => {
  console.error("🔥 Unexpected Error: ", error);
  exitHandler();
};

const seedSuperAdmin = async () => {
  const exists = await prisma.user.findFirst({
    where: { email: "mdgalib23@gmail.com" },
  });
  if (!exists) {
    const user = await auth.api.signUpEmail({
      body: {
        name: "Md Galib Hossain",
        email: "mdgalib23@gmail.com",
        password: "12345678",
      },
    });
    if (user.user.id) {
      await prisma.user.update({
        where: { id: user.user.id },
        data: {
          role: { set: "superadmin" },
        },
      });
    }
  }
};

const main = async () => {
  try {
    await connectDB();
    
    // Initialize Socket.IO
    io = new SocketIOServer(server, {
      cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
      },
    });

    // Initialize socket handlers
    initializeSocket(io);

    server.listen(config.PORT, () => {
      console.log(`🚀 Server listening on port: ${config.PORT}`);
    });
    await seedSuperAdmin();

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received. Shutting down gracefully");
      if (server) {
        server.close(async () => {
          if (io) io.close();
          await prisma.$disconnect();
          console.log("💀 Server, Socket.IO, and Prisma closed after SIGTERM");
          process.exit(0);
        });
      }
    });
  } catch (error) {
    console.error("❌ Failed to start server: ", error);
    process.exit(1);
  }
};

main();