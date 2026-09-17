/*App.jsx */

import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";

// Step 4.7(b)-1
// Purpose: Import the reset-password page
// Logic: This component handles the token received from the email

import ResetPasswordPage from "./pages/ResetPasswordPage";

// Step 4.5(b)-1
// Purpose: Import forgot-password page

import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col overflow-hidden">
      <Navbar />

      <main className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f15_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 size-96 bg-blue-500/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 w-full flex items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={authUser ? <ChatPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
            />
            {/* Step 4.5(b)-2
    Purpose: Display forgot-password page
    Logic: Public route because user is not authenticated */}
            <Route
              path="/forgot-password"
              element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/" />}
            />
            // Step 4.7(b)-2 // Purpose: Handle password-reset links from email
            // Logic: Token is extracted from the URL by ResetPasswordPage
            <Route
              path="/reset-password/:token"
              element={!authUser ? <ResetPasswordPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </main>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0c1929",
            color: "#e2e8f0",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          },
        }}
      />
    </div>
  );
}

export default App;
