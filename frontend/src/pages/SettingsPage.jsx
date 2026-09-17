/*SettingsPage.jsx */

import { useState, useRef } from "react";
import toast from "react-hot-toast";

import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  ArrowLeftIcon,
  BellIcon,
  CameraIcon,
  LogOutIcon,
  Trash2Icon,
  MailIcon,
  UserIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function SettingsPage() {
  const { authUser, logout, deleteAccount, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleSoundToggle = () => {
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch(() => {});
    toggleSound();
  };

  //handle delete account confirmation
  const handleDeleteAccount = async () => {
    setShowDeleteConfirm(false);
    await deleteAccount();
  };

  if (!authUser) return null;

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      <div className="mb-6">
        <Link to="/" className="nav-pill">
          <ArrowLeftIcon className="size-4" />
          Back to Chat
        </Link>
      </div>

      <BorderAnimatedContainer>
        <div className="p-8 md:p-10 bg-blue-950/30 backdrop-blur-xl">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">
              Settings
            </h1>
            <p className="text-blue-300/60 text-sm">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Photo */}
          <section
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            <h2 className="section-title">Profile Photo</h2>
            <p className="section-desc">
              Update your avatar visible to other users
            </p>

            <div className="flex items-center gap-5 p-4 rounded-xl bg-blue-950/40 border border-blue-500/15">
              <button
                onClick={() => fileInputRef.current.click()}
                className="relative size-20 rounded-full overflow-hidden ring-2 ring-blue-500/30 group shrink-0"
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <CameraIcon className="size-5 text-blue-300" />
                </div>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="text-left">
                <p className="font-medium text-slate-100">
                  {authUser.fullName}
                </p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-sm text-blue-400 hover:text-blue-300 mt-1 transition-colors"
                >
                  Upload new photo
                </button>
              </div>
            </div>
          </section>

          {/* Account */}
          <section
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="section-title">Account</h2>
            <p className="section-desc">Your account information</p>

            <div className="space-y-2">
              <div className="settings-row">
                <div className="flex items-center gap-3">
                  <UserIcon className="size-5 text-blue-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-slate-500">Full Name</p>
                    <p className="text-slate-100">{authUser.fullName}</p>
                  </div>
                </div>
              </div>
              <div className="settings-row">
                <div className="flex items-center gap-3">
                  <MailIcon className="size-5 text-blue-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-slate-100">{authUser.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <h2 className="section-title">Preferences</h2>
            <p className="section-desc">Customize your chat experience</p>

            <div className="space-y-2">
              <div className="settings-row">
                <div className="flex items-center gap-3">
                  {isSoundEnabled ? (
                    <Volume2Icon className="size-5 text-blue-400" />
                  ) : (
                    <VolumeOffIcon className="size-5 text-blue-400" />
                  )}
                  <div className="text-left">
                    <p className="text-slate-100 font-medium">Sound Effects</p>
                    <p className="text-xs text-slate-500">
                      Play sounds for typing and clicks
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  checked={isSoundEnabled}
                  onChange={handleSoundToggle}
                />
              </div>

              <div className="settings-row opacity-60">
                <div className="flex items-center gap-3">
                  <BellIcon className="size-5 text-blue-400" />
                  <div className="text-left">
                    <p className="text-slate-100 font-medium">Notifications</p>
                    <p className="text-xs text-slate-500">Coming soon</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  disabled
                />
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="section-title text-red-400">Session</h2>
            <p className="section-desc">
              Sign out of your account on this device
            </p>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                bg-red-500/10 border border-red-500/25 text-red-400 font-medium
                hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200"
            >
              <LogOutIcon className="size-5" />
              Log Out
            </button>

            <div className="mt-4">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
      bg-red-500/5 border border-red-500/20 text-red-400 font-medium
      hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200"
              >
                <Trash2Icon className="size-5" />
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </BorderAnimatedContainer>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-blue-950 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-100 mb-2">
              Delete your account?
            </h2>

            <p className="text-sm text-slate-400 mb-6">
              This action cannot be undone. Your account will be permanently
              deleted.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-slate-600/40
            text-slate-300 hover:bg-slate-800/50 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 rounded-xl bg-red-500/15
            border border-red-500/30 text-red-400
            hover:bg-red-500/25 transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
