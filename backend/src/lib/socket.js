//socket.js
import { Server } from "socket.io";
import { ENV } from "./env.js";
import { isAllowedOrigin } from "./cors.js";

let io;

const userSocketMap = {};

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: isAllowedOrigin,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);

      if (userId) {
        delete userSocketMap[userId];
      }
    });
  });

  return io;
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { io };
