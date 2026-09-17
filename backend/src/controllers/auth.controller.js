/*
src/controllers/auth.controller.js
*/

import {
  sendWelcomeEmail,
  sendPasswordResetEmail,
} from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

/*
 Step 4.2(a)-1
 Purpose: Generate cryptographically secure reset tokens
 Logic: Random bytes create an unpredictable token
*/

import crypto from "crypto";

// Step 3(b)-1
// Purpose: Handle user signup
// Logic: Validate → hash → save → generate token → send response

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Step 3(b)-2
    // Purpose: Check required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 3(b)-3
    // Purpose: Enforce password strength
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Step 3(b)-4
    // Purpose: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Step 3(b)-5
    // Purpose: Prevent duplicate accounts
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Step 3(b)-6
    // Purpose: Hash password securely
    // Logic: salt + hash → prevents rainbow table attacks

    // 123456 => $dnjasdkasj_?dmsakmk
    /*
    "I used bcrypt with salting to securely hash 
    passwords, preventing reverse-engineering attacks."
    */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 3(b)-7
    // Purpose: Create new user object
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // before CR:
      // generateToken(newUser._id, res);
      // await newUser.save();

      // after CR:
      // Persist user first, then issue auth cookie

      // Step 3(b)-8
      // Purpose: Save user first, then generate token
      // Logic: Avoid token for non-persisted user (good practice)
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      // Step 3(b)-9
      // Purpose: Send user data (excluding password)
      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });

      // Step 3(b)-10
      // Purpose: Send welcome email (non-blocking UX)
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL,
        );
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
      /* 
      “Email sending is wrapped in a try-catch to avoid breaking 
      the signup flow if the email service fails.”
      */
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 3(c)-1
// Purpose: Authenticate user

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Step 3(c)-2
  // Purpose: Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Step 3(c)-3
    // Purpose: Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    // never tell the client which one is incorrect: password or email

    // Step 3(c)-4
    // Purpose: Compare password securely
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Step 3(c)-5
    // Purpose: Generate JWT cookie
    generateToken(user._id, res);

    // Step 3(c)-6
    // Purpose: Send user data
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 3(d)-1
// Purpose: Logout user by clearing cookie
export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// Step 4.2(b)-1
// Purpose: Start the password-reset process
// Logic: Find user → generate token → hash token → save expiry → send email

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Step 4.2(b)-2
    // Purpose: Validate email input

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Step 4.2(b)-3
    // Purpose: Find the account associated with the email

    const user = await User.findOne({ email });

    // Step 4.2(b)-4
    // Purpose: Prevent email/account enumeration
    // Logic: Don't reveal whether an account exists

    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Step 4.2(b)-5
    // Purpose: Generate a secure random reset token
    // Logic: Token is sent to the user but never stored directly in DB

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Step 4.2(b)-6
    // Purpose: Hash reset token before storing it
    // Logic: Database stores only the hash, not the usable token

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Step 4.2(b)-7
    // Purpose: Set token expiration time
    // Logic: Reset link remains valid for 15 minutes

    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Step 4.2(b)-8
    // Purpose: Store reset token information in MongoDB

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = resetTokenExpiry;

    await user.save();

    // Step 4.2(b)-9
    // Purpose: Create password reset URL
    // Logic: Send the original token because the user needs it
    // The database contains only the hashed version

    const resetURL = `${ENV.CLIENT_URL}/reset-password/${resetToken}`;

    // Step 4.2(b)-10
    // Purpose: Send password reset email

    await sendPasswordResetEmail(user.email, user.fullName, resetURL);

    // Step 4.2(b)-11
    // Purpose: Confirm reset request to frontend

    return res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Error in forgot password controller:", error);

    // Step 4.2(b)-12
    // Purpose: Prevent sensitive error details from reaching client

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Step 4.4(a)-1
// Purpose: Reset user's password using a valid reset token
// Logic: Hash token → find user → verify expiry → hash password → update user

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Step 4.4(a)-2
    // Purpose: Validate token and new password

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and new password are required",
      });
    }

    // Step 4.4(a)-3
    // Purpose: Enforce minimum password length

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Step 4.4(a)-4
    // Purpose: Hash token received from the reset URL
    // Logic: Database contains only the hashed version

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Step 4.4(a)-5
    // Purpose: Find user with matching token
    // Logic: Token must also still be valid based on expiry

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    // Step 4.4(a)-6
    // Purpose: Reject invalid or expired tokens

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired password reset token",
      });
    }

    // Step 4.4(a)-7
    // Purpose: Hash the new password securely
    // Logic: Never store the new password as plain text

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 4.4(a)-8
    // Purpose: Update password and invalidate reset token

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    // Step 4.4(a)-9
    // Purpose: Confirm successful password reset

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in reset password controller:", error);

    // Step 4.4(a)-10
    // Purpose: Handle unexpected server errors

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Step 3(e)-1
// Purpose: Update profile picture
export const updateProfile = async (req, res) => {
  try {
    // Step 3(e)-2
    // Purpose: Validate input
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });

    // Step 3(e)-3
    // Purpose: Get logged-in user
    const userId = req.user._id;

    // Step 3(e)-4
    // Purpose: Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Step 3(e)-5
    // Purpose: Save image URL in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );
    // Step 3(e)-6
    // Purpose: Send updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Purpose: Permanently delete the logged-in user's account
// Logic: Get authenticated user → delete from MongoDB → clear JWT cookie

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete the authenticated user's account
    await User.findByIdAndDelete(userId);

    // Clear authentication cookie
    res.cookie("jwt", "", { maxAge: 0 });

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/*

“I used Cloudinary to offload media storage 
and stored only secure URLs in the database.”

*/
