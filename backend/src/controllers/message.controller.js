// ===============================================
// PHASE 5: MESSAGE CONTROLLER
// Purpose:
// Handles all chat/message business logic
// ===============================================

// ===============================================
// Import Cloudinary
// Used for image and document uploads
// ===============================================

import cloudinary from "../lib/cloudinary.js";

// ===============================================
// Import Socket.io utilities
// ===============================================

import { getReceiverSocketId, io } from "../lib/socket.js";

// ===============================================
// Import database models
// ===============================================

import Message from "../models/Message.js";
import User from "../models/User.js";

// ======================================================
// Step 5(b)
// GET ALL CONTACTS
//
// Purpose:
// Fetch all users except logged-in user
// ======================================================

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================================
// Step 5(c)
// GET MESSAGES BY USER ID
//
// Purpose:
// Fetch complete conversation between:
// logged-in user ↔ selected user
// ======================================================

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ======================================================
// Step 5(d)
// SEND MESSAGE
//
// Purpose:
// Send text/image/document message
//
// Flow:
// Validate → Upload attachment → Save DB → Emit socket
// ======================================================

export const sendMessage = async (req, res) => {
  try {
    // ===============================================
    // Extract message data
    // ===============================================

    const { text, image, file } = req.body;

    // ===============================================
    // Receiver ID from URL params
    // ===============================================

    const { id: receiverId } = req.params;

    // ===============================================
    // Sender ID from authenticated user
    // ===============================================

    const senderId = req.user._id;

    // ===============================================
    // Validation 1:
    // Prevent empty messages
    // ===============================================

    if (!text && !image && !file) {
      return res.status(400).json({
        message: "Text, image, or file is required.",
      });
    }

    // ===============================================
    // Validation 2:
    // Prevent user messaging themselves
    // ===============================================

    if (senderId.equals(receiverId)) {
      return res.status(400).json({
        message: "Cannot send messages to yourself.",
      });
    }

    // ===============================================
    // Validation 3:
    // Ensure receiver exists
    // ===============================================

    const receiverExists = await User.exists({
      _id: receiverId,
    });

    if (!receiverExists) {
      return res.status(404).json({
        message: "Receiver not found.",
      });
    }

    // ===============================================
    // Upload image to Cloudinary if present
    // ===============================================

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);

      imageUrl = uploadResponse.secure_url;
    }

    // ===============================================
    // Upload document to Cloudinary if present
    // ===============================================

    let fileData;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const uploadResponse = await cloudinary.uploader.upload(file.data, {
        resource_type: "raw",
        type: "upload",
        access_mode: "public",
        public_id: fileName,
      });

      fileData = {
        url: uploadResponse.secure_url,
        name: file.name,
        type: file.type,
        size: file.size,
      };
    }

    // ===============================================
    // Create new message object
    // ===============================================

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      file: fileData,
    });

    // ===============================================
    // Save message to MongoDB
    // ===============================================

    await newMessage.save();

    // ==================================================
    // Step 5(e)
    // REAL-TIME SOCKET COMMUNICATION
    // ==================================================

    const receiverSocketId = getReceiverSocketId(receiverId);

    // ===============================================
    // If receiver is online:
    // Emit real-time message instantly
    // ===============================================

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // ===============================================
    // Send response to sender
    // ===============================================

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ======================================================
// Step 5(f)
// GET CHAT PARTNERS
//
// Purpose:
// Fetch users with whom current user has chatted
//
// Used in sidebar/recent chats
// ======================================================

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners:", error.message);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
