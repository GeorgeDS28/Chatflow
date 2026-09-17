// Step 6: Database Connection
// What it does: Connects to MongoDB
// Logic: mongoose.connect using env variable

import dns from "dns";
import mongoose from "mongoose";
import { ENV } from "./env.js";

// Node on Windows may fail Atlas SRV lookups via router DNS (querySrv ECONNREFUSED).
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
