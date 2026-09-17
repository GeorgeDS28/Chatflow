/* index.js*/

import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { initializeSocket } from "./lib/socket.js";

const app = express();

const server = http.createServer(app);

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

initializeSocket(server);

connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
