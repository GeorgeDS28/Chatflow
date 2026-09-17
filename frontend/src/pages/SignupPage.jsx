import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  SparklesIcon,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute top-1/3 -right-32 size-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 size-80 bg-indigo-600/15 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />

      <div className="relative w-full max-w-6xl md:h-[800px] h-[700px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 p-8 md:p-10 flex items-center justify-center md:border-r border-blue-500/15 animate-fade-in-up">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-glow mb-5 animate-float">
                    <MessageCircleIcon className="size-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-100 mb-2">
                    Create Account
                  </h2>
                  <p className="text-blue-300/60">
                    Join thousands of users chatting in real time
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
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

                  <div>
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
                        placeholder="At least 6 characters"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      className="auth-btn"
                      type="submit"
                      disabled={isSigningUp}
                    >
                      {isSigningUp ? (
                        <LoaderIcon className="size-5 animate-spin mx-auto" />
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
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
                  Start Your Journey Today
                </h3>
                <p className="text-blue-300/50 text-sm mb-6 max-w-xs mx-auto">
                  Create your account in seconds and start messaging instantly
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

export default SignUpPage;
