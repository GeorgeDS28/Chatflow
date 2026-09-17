import { Link, useLocation } from "react-router";
import { MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { authUser } = useAuthStore();
  const { pathname } = useLocation();

  return (
    <nav className="relative z-20 w-full flex items-center justify-between px-4 md:px-6 py-3 bg-blue-950/60 backdrop-blur-md border-b border-blue-500/15 shrink-0">
      <Link to={authUser ? "/" : "/login"} className="flex items-center gap-2.5 group">
        <div className="size-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:shadow-blue-500/40 transition-shadow">
          <MessageCircleIcon className="size-5 text-white" />
        </div>
        <span className="font-semibold text-slate-100 tracking-tight">ChatFlow</span>
      </Link>

      {authUser ? (
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-sm text-blue-300/60 hidden sm:block max-w-[120px] truncate">
            {authUser.fullName}
          </span>
          <Link
            to="/profile"
            className={`icon-btn ${pathname === "/profile" ? "bg-blue-500/20 text-blue-200" : ""}`}
            title="Profile"
          >
            <UserIcon className="size-5" />
          </Link>
          <Link
            to="/settings"
            className={`icon-btn ${pathname === "/settings" ? "bg-blue-500/20 text-blue-200" : ""}`}
            title="Settings"
          >
            <SettingsIcon className="size-5" />
          </Link>
          <Link to="/profile" className="avatar online">
            <div className="size-9 rounded-full ring-2 ring-blue-500/30">
              <img
                src={authUser.profilePic || "/avatar.png"}
                alt={authUser.fullName}
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className={`nav-pill ${pathname === "/login" ? "bg-blue-500/25 border-blue-400/40 text-blue-200" : ""}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              pathname === "/signup"
                ? "bg-blue-500 text-white shadow-md shadow-blue-600/30"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/30 hover:from-blue-500 hover:to-blue-400"
            }`}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
