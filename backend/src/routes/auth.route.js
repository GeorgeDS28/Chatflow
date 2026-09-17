/*
src/routes/auth.route.js

*/

import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  forgotPassword,
  resetPassword,
  deleteAccount,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

// Step 3(f)-1
// Purpose: Initialize router

const router = express.Router();

// Step 3(f)-2
// Purpose: Apply rate limiting globally

router.use(arcjetProtection);

// Step 3(f)-3
// Public routes

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Step 4.4(b)-1
// Purpose: Request password reset
// Logic: Public route because user cannot be expected to be logged in

router.post("/forgot-password", forgotPassword);

// Step 4.4(b)-2
// Purpose: Set a new password using reset token
// Logic: Public route because authentication is replaced by reset token

router.post("/reset-password/:token", resetPassword);

// Step 3(f)-4
// Protected routes
router.put("/update-profile", protectRoute, updateProfile);
router.delete("/delete-account", protectRoute, deleteAccount);

// Step 3(f)-5
// Purpose: Check auth status

router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
