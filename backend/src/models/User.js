/* User.js  */

/*

 Step 3(a)-1
 Purpose: Define User schema
Logic: Structure of user data stored in MongoDB




*/
// Step 4.1-1
// Purpose: Define User schema
// Logic: Structure of user data stored in MongoDB

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Step 3(a)-2
    // Purpose: Store user email (unique identifier)
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Step 3(a)-3
    // Purpose: Store user's full name
    fullName: {
      type: String,
      required: true,
    },

    // Step 3(a)-4
    // Purpose: Store hashed password (never plain text)
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Step 3(a)-5
    // Purpose: Profile image (Cloudinary URL)
    profilePic: {
      type: String,
      default: "",
    },

    // Step 4.1-2
    // Purpose: Store hashed password-reset token
    // Logic: Never store the actual reset token in the database
    resetPasswordToken: {
      type: String,
      default: null,
    },

    // Step 4.1-3
    // Purpose: Store reset-token expiration time
    // Logic: Token becomes invalid after the expiry time
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },

  // Step 3(a)-6
  // Purpose: Automatically add createdAt and updatedAt
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
