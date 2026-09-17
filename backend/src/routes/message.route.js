// ===============================================
// PHASE 5(g): MESSAGE ROUTES
// Purpose:
// Define all chat/message related API endpoints
// ===============================================

import express from "express";

// ===============================================
// Import controller functions
// ===============================================
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";

// ===============================================
// Import middlewares
// ===============================================
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

// ===============================================
// Step 5(g)-1
// Create Express Router
// ===============================================
const router = express.Router();

// ===============================================
// Step 5(g)-2
// Apply Global Middlewares
//
// Order matters:
//
// 1. arcjetProtection
//    → blocks spam / abuse first
//
// 2. protectRoute
//    → verifies JWT authentication
//
// This improves performance & security
// ===============================================
router.use(arcjetProtection, protectRoute);

// ===============================================
// Step 5(g)-3
// GET /api/messages/contacts
//
// Purpose:
// Fetch all available users except logged-in user
// ===============================================
router.get("/contacts", getAllContacts);

// ===============================================
// Step 5(g)-4
// GET /api/messages/chats
//
// Purpose:
// Fetch users with whom current user has chatted
// Used for sidebar recent chats
// ===============================================
router.get("/chats", getChatPartners);

// ===============================================
// Step 5(g)-5
// GET /api/messages/:id
//
// Purpose:
// Fetch conversation between:
// logged-in user ↔ selected user
// ===============================================
router.get("/:id", getMessagesByUserId);

// ===============================================
// Step 5(g)-6
// POST /api/messages/send/:id
//
// Purpose:
// Send message to another user
//
// Supports:
// - text messages
// - image messages
// ===============================================
router.post("/send/:id", sendMessage);

// ===============================================
// Step 5(g)-7
// Export router
// ===============================================
export default router;
