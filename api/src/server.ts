import { logger } from "./utils/logger.js";
import { createApp } from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

async function main() {
  const app = createApp();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // Emit the message to all clients
    });

    socket.on("disconnect", () => {});
  });

  server.listen(8080, () => {
    logger.info(`server started at http://localhost:${process.env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
});
