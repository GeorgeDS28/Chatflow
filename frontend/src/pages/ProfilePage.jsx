import { useState, useRef } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  ArrowLeftIcon,
  CameraIcon,
  MailIcon,
  SettingsIcon,
  UserIcon,
  ShieldCheckIcon,
} from "lucide-react";

function ProfilePage() {
  const { authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  if (!authUser) return null;

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="nav-pill">
          <ArrowLeftIcon className="size-4" />
          Back to Chat
        </Link>
        <Link to="/settings" className="nav-pill">
          <SettingsIcon className="size-4" />
          Settings
        </Link>
      </div>

      <BorderAnimatedContainer>
        <div className="p-8 md:p-10 bg-blue-950/30 backdrop-blur-xl">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse-glow" />
              <button
                onClick={() => fileInputRef.current.click()}
                className="relative size-32 rounded-full overflow-hidden ring-4 ring-blue-500/30 ring-offset-4 ring-offset-blue-950 group"
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt={authUser.fullName}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                  <CameraIcon className="size-6 text-blue-300 mb-1" />
                  <span className="text-xs text-blue-200">Change photo</span>
                </div>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">
              {authUser.fullName}
            </h1>
            <p className="text-blue-300/60 text-sm">{authUser.email}</p>

            <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Active now
            </div>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="settings-row">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <UserIcon className="size-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-400">Full Name</p>
                  <p className="font-medium text-slate-100">{authUser.fullName}</p>
                </div>
              </div>
            </div>

            <div className="settings-row">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <MailIcon className="size-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-400">Email Address</p>
                  <p className="font-medium text-slate-100">{authUser.email}</p>
                </div>
              </div>
            </div>

            <div className="settings-row">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <ShieldCheckIcon className="size-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-400">Account Status</p>
                  <p className="font-medium text-emerald-400">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ProfilePage;
