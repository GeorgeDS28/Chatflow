// ===============================================
// PHASE 6(d): AXIOS CONFIGURATION
// Purpose:
// Create reusable API service
// ===============================================

import axios from "axios";

// ===============================================
// Step 6(d)-1
// Create Axios Instance
// ===============================================
export const axiosInstance = axios.create({
  // ===============================================
  // Dynamic Base URL
  //
  // Development:
  // http://localhost:3000/api
  //
  // Production:
  // /api
  // ===============================================
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",

  // ===============================================
  // withCredentials: true
  //
  // Sends cookies automatically
  //
  // Required for JWT authentication
  // ===============================================
  withCredentials: true,
});
