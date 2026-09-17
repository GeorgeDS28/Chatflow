/* useAuthStore.js */

// Zustand is used for global state management.
// Unlike useState, Zustand state can be accessed
// from any component in the application.
import { create } from "zustand";

// Pre-configured Axios instance.
// Contains backend base URL and credentials configuration.
import { axiosInstance } from "../lib/axios";

// Used to show popup notifications.
// Example: Login successful, Signup failed, etc.
import toast from "react-hot-toast";

// Socket.IO client used for real-time communication.
// Enables online users tracking and instant messaging.
import { io } from "socket.io-client";

// BASE_URL decides where Socket.IO should connect.
//
// Development:
// Frontend -> localhost:5173
// Backend  -> localhost:3000
//
// Production:
// Uses same deployed server.
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

// Create Zustand Store.
//
// set() -> Updates state
// get() -> Reads current state
export const useAuthStore = create((set, get) => ({
  // ==================================================
  // STATE VARIABLES
  // ==================================================

  // Stores currently logged-in user.
  // null means no authenticated user.
  authUser: null,

  // Used while checking authentication status.
  // Prevents app from rendering too early.
  isCheckingAuth: true,

  // Controls signup button loading spinner.
  isSigningUp: false,

  // Controls login button loading spinner.
  isLoggingIn: false,

  // Stores active socket connection object.
  socket: null,

  // Stores IDs of currently online users.
  // Updated through socket events.
  onlineUsers: [],

  // ==================================================
  // CHECK AUTHENTICATION
  // ==================================================

  // Runs when application starts.
  // Verifies whether user already has a valid JWT cookie.
  checkAuth: async () => {
    try {
      // Backend checks JWT cookie.
      // Returns user information if valid.
      const res = await axiosInstance.get("/auth/check");

      // Save authenticated user globally.
      set({ authUser: res.data });

      // Once authenticated, connect socket.
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);

      // Authentication failed.
      // Remove any existing user.
      set({ authUser: null });
    } finally {
      // Auth checking finished regardless of result.
      set({ isCheckingAuth: false });
    }
  },

  // ==================================================
  // SIGNUP
  // ==================================================

  // Creates new user account.
  // Called from SignUp page.
  signup: async (data) => {
    // Show loading spinner.
    set({ isSigningUp: true });

    try {
      // Send signup request to backend.
      const res = await axiosInstance.post("/auth/signup", data);

      // Store newly created user.
      set({ authUser: res.data });

      // Success notification.
      toast.success("Account created successfully!");

      // Connect socket immediately after signup.
      get().connectSocket();
    } catch (error) {
      // Display backend error message.
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      // Hide loading spinner.
      set({ isSigningUp: false });
    }
  },

  // ==================================================
  // LOGIN
  // ==================================================

  // Logs existing user into application.
  // Called from Login page.
  login: async (data) => {
    // Enable login loading state.
    set({ isLoggingIn: true });

    try {
      // Send credentials to backend.
      const res = await axiosInstance.post("/auth/login", data);

      // Store authenticated user.
      set({ authUser: res.data });

      // Success popup.
      toast.success("Logged in successfully");

      // Start socket connection.
      get().connectSocket();
    } catch (error) {
      // Show backend validation error.
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      // Disable loading state.
      set({ isLoggingIn: false });
    }
  },

  // ==================================================
  // LOGOUT
  // ==================================================

  // Removes user session and disconnects socket.
  logout: async () => {
    try {
      // Backend clears JWT cookie.
      await axiosInstance.post("/auth/logout");

      // Remove authenticated user.
      set({ authUser: null });

      // Success notification.
      toast.success("Logged out successfully");

      // Close active socket connection.
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");

      console.log("Logout error:", error);
    }
  },

  //delete account
  deleteAccount: async () => {
    try {
      await axiosInstance.delete("/auth/delete-account");

      set({ authUser: null });

      get().disconnectSocket();

      toast.success("Account deleted successfully");
    } catch (error) {
      console.log("Delete account error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete account. Please try again.",
      );
    }
  },

  // ==================================================
  // UPDATE PROFILE
  // ==================================================

  // Updates user's profile picture.
  // Called when image is uploaded from ProfileHeader.
  updateProfile: async (data) => {
    try {
      // Send profile image to backend.
      const res = await axiosInstance.put("/auth/update-profile", data);

      // Update auth user with latest data.
      set({ authUser: res.data });

      // Success notification.
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);

      toast.error(error.response.data.message);
    }
  },

  // ==================================================
  // CONNECT SOCKET
  // ==================================================

  // Creates Socket.IO connection.
  // Enables real-time communication.
  connectSocket: () => {
    // Get currently logged-in user.
    const { authUser } = get();

    // Prevent duplicate socket connections.
    // Also stop if no user exists.
    if (!authUser || get().socket?.connected) return;

    // Create socket instance.
    const socket = io(BASE_URL, {
      // Send cookies along with socket connection.
      // Allows backend to identify user.
      withCredentials: true,
    });

    // Establish connection.
    socket.connect();

    // Save socket globally.
    set({ socket });

    // ==========================================
    // ONLINE USERS EVENT
    // ==========================================

    // Backend emits currently online user IDs.
    // Store updates whenever users connect/disconnect.
    socket.on("getOnlineUsers", (userIds) => {
      set({
        onlineUsers: userIds,
      });
    });
  },

  // ==================================================
  // DISCONNECT SOCKET
  // ==================================================

  // Safely closes active socket connection.
  // Usually called during logout.
  disconnectSocket: () => {
    // Only disconnect if socket exists and is connected.
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
