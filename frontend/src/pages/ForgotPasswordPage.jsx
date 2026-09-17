/* 
ForgotPasswordPage.jsx

*/

// Step 4.5(a)-1
// Purpose: Create the forgot-password page
// Logic: User enters email → frontend sends reset request to backend

import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Mail, Send } from "lucide-react";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

function ForgotPasswordPage() {
  // Step 4.5(a)-2
  // Purpose: Store the email entered by the user

  const [email, setEmail] = useState("");

  // Step 4.5(a)-3
  // Purpose: Track whether the request is being submitted

  const [isLoading, setIsLoading] = useState(false);

  // Step 4.5(a)-4
  // Purpose: Send password-reset request to backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);

      // Step 4.5(a)-5
      // Purpose: Call forgot-password API

      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      toast.success(response.data.message);

      // Step 4.5(a)-6
      // Purpose: Clear email field after successful request

      setEmail("");
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Step 4.5(a)-7
          Purpose: Main forgot-password card */}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Step 4.5(a)-8
            Purpose: Page heading */}

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-cyan-500/10">
            <Mail className="size-7 text-cyan-400" />
          </div>

          <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>

          <p className="mt-2 text-sm text-slate-400">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        {/* Step 4.5(a)-9
            Purpose: Forgot-password form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}

          <div>
            <label className="auth-input-label">Email Address</label>

            <div className="relative">
              <Mail className="auth-input-icon" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>
          </div>

          {/* Step 4.5(a)-10
              Purpose: Submit password-reset request */}

          <button
            type="submit"
            disabled={isLoading}
            className="auth-btn flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send Reset Link
              </>
            )}
          </button>
        </form>

        {/* Step 4.5(a)-11
            Purpose: Allow user to return to login */}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            <ArrowLeft className="size-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
