// Step 4.7(a)-1
// Purpose: Create the reset-password page
// Logic: Read token from URL → submit new password → reset account password

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, LockKeyhole, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

function ResetPasswordPage() {
  // Step 4.7(a)-2
  // Purpose: Get reset token from email URL
  // Logic: React Router provides the token through URL parameters

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Step 4.7(a)-3
  // Purpose: Submit the new password
  // Logic: Validate passwords → send token + password to backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid password reset link");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        {
          password,
        },
      );

      toast.success(response.data.message);

      // Step 4.7(a)-4
      // Purpose: Send user back to login after successful reset
      // Logic: Password is changed, so user can authenticate again

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(error.response?.data?.message || "Unable to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-cyan-500/10">
            <LockKeyhole className="size-7 text-cyan-400" />
          </div>

          <h1 className="text-2xl font-bold text-white">Reset Password</h1>

          <p className="mt-2 text-sm text-slate-400">
            Create a new password for your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="auth-input-label">New Password</label>

            <div className="relative">
              <LockKeyhole className="auth-input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="input pr-12"
                minLength={6}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="auth-input-label">Confirm New Password</label>

            <div className="relative">
              <LockKeyhole className="auth-input-icon" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="input pr-12"
                minLength={6}
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="auth-btn flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Resetting...
              </>
            ) : (
              <>
                <LockKeyhole className="size-4" />
                Reset Password
              </>
            )}
          </button>
        </form>

        {/* Back to login */}
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

export default ResetPasswordPage;
