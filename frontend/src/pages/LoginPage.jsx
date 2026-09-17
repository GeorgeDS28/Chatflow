/* 
LoginPage.jsx
*/

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  MailIcon,
  LoaderIcon,
  LockIcon,
  SparklesIcon,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password");
      return;
    }

    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute top-1/4 -left-32 size-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 size-80 bg-indigo-600/15 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />

      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 p-8 md:p-10 flex items-center justify-center md:border-r border-blue-500/15 animate-fade-in-up">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow mb-5 animate-float">
                    <MessageCircleIcon className="size-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-100 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-blue-300/60">
                    Sign in to continue your conversations
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div
                    className="animate-fade-in-up pt-1"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <button
                      className="auth-btn"
                      type="submit"
                      disabled={isLoggingIn}
                    >
                      {isLoggingIn ? (
                        <LoaderIcon className="size-5 animate-spin mx-auto" />
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </form>

                <div
                  className="mt-6 text-center animate-fade-in-up space-y-3"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Link to="/forgot-password" className="auth-link">
                    Forgot your password?
                  </Link>

                  <div>
                    <Link to="/signup" className="auth-link">
                      Don&apos;t have an account? Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-8 bg-gradient-to-bl from-blue-600/10 via-transparent to-transparent">
              <div
                className="text-center animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative mb-8 flex justify-center">
                  <div className="absolute size-48 bg-blue-500/20 blur-3xl rounded-full" />
                  <div className="relative size-40 rounded-3xl bg-gradient-to-br from-blue-600/30 to-blue-800/20 border border-blue-500/25 flex items-center justify-center animate-float shadow-glow">
                    <MessageCircleIcon className="size-20 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-3">
                  Connect anytime, anywhere
                </h3>
                <p className="text-blue-300/50 text-sm mb-6 max-w-xs mx-auto">
                  Real-time messaging with a beautiful, secure experience
                </p>
                <div className="flex justify-center gap-3">
                  <span className="auth-badge flex items-center gap-1">
                    <SparklesIcon className="size-3" /> Free
                  </span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
