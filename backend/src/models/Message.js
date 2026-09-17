// ===============================================
// PHASE 5(a): MESSAGE MODEL / SCHEMA
// Purpose:
// Define structure of messages stored in MongoDB
// ===============================================

// ===============================================
// PHASE 5(a): MESSAGE MODEL / SCHEMA
//
// Purpose:
// Define structure of messages stored in MongoDB
// ===============================================

import mongoose from "mongoose";

// ===============================================
// Step 5(a)-1
// Create Message Schema
// ===============================================

const messageSchema = new mongoose.Schema(
  {
    // ===============================================
    // Step 5(a)-2
    // senderId
    //
    // Purpose:
    // Stores the user who sent the message
    // ===============================================

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===============================================
    // Step 5(a)-3
    // receiverId
    //
    // Purpose:
    // Stores the user receiving the message
    // ===============================================

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===============================================
    // Step 5(a)-4
    // text
    //
    // Purpose:
    // Stores text message content
    // ===============================================

    text: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    // ===============================================
    // Step 5(a)-5
    // image
    //
    // Purpose:
    // Stores Cloudinary image URL
    //
    // Existing photo messaging continues
    // using this field.
    // ===============================================

    image: {
      type: String,
    },

    // ===============================================
    // Step 8.2
    // file
    //
    // Purpose:
    // Stores document attachment information
    //
    // Used for:
    // PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
    // ===============================================

    file: {
      url: {
        type: String,
      },

      name: {
        type: String,
      },

      type: {
        type: String,
      },

      size: {
        type: Number,
      },
    },
  },

  // ===============================================
  // Step 5(a)-6
  // timestamps
  //
  // Automatically adds:
  // createdAt
  // updatedAt
  // ===============================================

  { timestamps: true },
);

// ===============================================
// Step 5(a)-7
// Create Message Model
// ===============================================

const Message = mongoose.model("Message", messageSchema);

// ===============================================
// Step 5(a)-8
// Export model
// ===============================================

export default Message;
