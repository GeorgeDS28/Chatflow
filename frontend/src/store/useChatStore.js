//useChatStore.js

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  // Stores all users available for starting a conversation
  allContacts: [],

  // Stores users with whom current user already has chats
  chats: [],

  // Stores messages of currently selected conversation
  messages: [],

  // Controls which sidebar tab is active
  // Possible values: "chats" or "contacts"
  activeTab: "chats",

  // Stores currently opened chat user
  selectedUser: null,

  // Used to show loading skeleton for contacts/chats list
  isUsersLoading: false,

  // Used to show loading skeleton for messages
  isMessagesLoading: false,

  // Load sound preference from localStorage on app startup
  // This ensures the setting persists across page refreshes
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  // Toggle notification and typing sounds
  // Also save updated preference in localStorage
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);

    set({
      isSoundEnabled: !get().isSoundEnabled,
    });
  },

  // Switch between Chats tab and Contacts tab
  setActiveTab: (tab) =>
    set({
      activeTab: tab,
    }),

  // Set currently selected user when a chat/contact is clicked
  setSelectedUser: (selectedUser) =>
    set({
      selectedUser,
    }),

  // Fetch all registered users from backend
  // Used in Contacts tab
  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/contacts");

      // Save contacts in Zustand store
      set({
        allContacts: res.data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isUsersLoading: false,
      });
    }
  },

  // Fetch users with whom current user has chatted before
  // Used in Chats tab
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/chats");

      // Store chat partners in state
      set({
        chats: res.data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isUsersLoading: false,
      });
    }
  },

  // Fetch complete conversation between
  // current user and selected user
  getMessagesByUserId: async (userId) => {
    set({
      isMessagesLoading: true,
    });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      // Replace current messages with fetched conversation
      set({
        messages: res.data,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({
        isMessagesLoading: false,
      });
    }
  },

  // ===============================================
  // Send text/image/document message to backend
  //
  // Uses optimistic UI for instant feedback
  // ===============================================

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    // Get logged in user from Auth Store
    const { authUser } = useAuthStore.getState();

    // Temporary ID used before MongoDB generates real ID
    const tempId = `temp-${Date.now()}`;

    // Create temporary message shown instantly
    // before backend responds
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      file: messageData.file,
      createdAt: new Date().toISOString(),

      // Useful for debugging optimistic updates
      isOptimistic: true,
    };

    // Immediately show message in UI
    // This makes chat feel much faster
    set({
      messages: [...messages, optimisticMessage],
    });

    try {
      // Send message to backend
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      // Replace optimistic state with actual backend message
      set({
        messages: [...messages, res.data],
      });
    } catch (error) {
      // If request fails, remove optimistic message
      set({
        messages: messages,
      });

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // Subscribe to real-time incoming messages
  // Uses Socket.IO connection from Auth Store
  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();

    // No chat selected means no subscription needed
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      // Ignore messages from users other than
      // the currently opened conversation
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      // Get latest messages from state
      const currentMessages = get().messages;

      // Append new incoming message
      set({
        messages: [...currentMessages, newMessage],
      });

      // Play notification sound if enabled
      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");

        // Restart sound from beginning
        notificationSound.currentTime = 0;

        notificationSound
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  // Remove socket listener when chat changes
  // Prevents duplicate event listeners
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
  },
}));
