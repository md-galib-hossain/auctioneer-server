import { Server } from "http";
import config from "./app/config";
import app from "./app";
import { connectDB, prisma } from "./app/db/db";

let server: Server;

const exitHandler = async () => {
  if (server) {
    server.close(() => {
      console.log("💀 Server closed gracefully");
    });
  }

  try {
    await prisma.$disconnect(); // 👈 disconnect prisma
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



const main = async () => {
  try {
    await connectDB();
    server = app.listen(config.PORT, () => {
      console.log(`🚀 Server listening on port: ${config.PORT}`);
    });

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received. Shutting down gracefully");
      if (server) {
        server.close(async () => {
          await prisma.$disconnect(); // also disconnect on SIGTERM
          console.log("💀 Server and Prisma closed after SIGTERM");
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
