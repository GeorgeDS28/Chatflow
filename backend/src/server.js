// Step 2(a)-1
// Purpose: Import core dependencies
// Logic: These libraries are required to build backend APIs and handle requests

import express from "express"; // Web framework → handles routes & middleware
import cookieParser from "cookie-parser"; // Parses cookies (used for JWT auth)
import path from "path"; // Helps with file paths (for deployment)
import cors from "cors"; // Allows frontend-backend communication

// Step 2(a)-2
// Purpose: Import project modules (routes, DB, env, socket)
// Logic: Keeping code modular & scalable

import authRoutes from "./routes/auth.route.js"; // Auth APIs (signup/login)
import messageRoutes from "./routes/message.route.js"; // Chat APIs
import { connectDB } from "./lib/db.js"; // MongoDB connection
import { ENV } from "./lib/env.js"; // Environment variables
import { app, server } from "./lib/socket.js"; // Express + Socket.io setup

// Step 2(a)-3
// Purpose: Define root directory
// Logic: Needed for serving frontend in production
const __dirname = path.resolve();

// Step 2(a)-4
// Purpose: Define server port
// Logic: Use environment variable (best practice), fallback to 3000

const PORT = ENV.PORT || 3000;

// Step 2(a)-5
// Purpose: Parse incoming JSON requests
// Logic: Allows backend to read req.body
app.use(express.json({ limit: "5mb" })); // req.body

// Step 2(a)-6
// Purpose: Enable CORS
// Logic: Allows frontend (React) to call backend securely
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Step 2(a)-7
// Purpose: Parse cookies
// Logic: Required to read JWT stored in cookies

app.use(cookieParser());

// Step 2(b)-1
// Purpose: Register authentication routes
// Logic: All auth APIs start with /api/auth
app.use("/api/auth", authRoutes);

// Step 2(b)-2
// Purpose: Register messaging routes
// Logic: Handles sending/fetching messages
app.use("/api/messages", messageRoutes);

// API structure
//       /api/auth/signup
//       /api/auth/login
//       /api/messages/send
//      /api/messages/get

// Step 2(c)-1
// Purpose: Serve frontend in production
// Logic: Backend serves React build files
if (ENV.NODE_ENV === "production") {
  // Step 2(c)-2
  // Purpose: Serve static files
  // Logic: Loads React build (HTML, CSS, JS)
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Step 2(c)-3
  // Purpose: Handle all routes (SPA support)
  // Logic: React Router handles routing on frontend

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Step 2(d)-1
// Purpose: Start server
// Logic: Listen on defined port

server.listen(PORT, () => {
  // Step 2(d)-2
  // Purpose: Log server start
  console.log("Server running on port: " + PORT);

  // Step 2(d)-3
  // Purpose: Connect to database
  // Logic: Ensure DB connects when server starts
  connectDB();
});

/*
I configured Express to serve the React build in production, ensuring a single deployment handles 
both frontend and backend.

*/
