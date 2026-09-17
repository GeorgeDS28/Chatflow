import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  LogOutIcon,
  VolumeOffIcon,
  Volume2Icon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
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

  return (
    <div className="p-5 border-b border-blue-500/15 bg-gradient-to-r from-blue-950/40 to-transparent">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group ring-2 ring-blue-500/30 ring-offset-2 ring-offset-blue-950"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="text-blue-200 text-xs font-medium">Edit</span>
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

          <div className="min-w-0 text-left">
            <h3 className="text-slate-100 font-semibold truncate">
              {authUser.fullName}
            </h3>
            <p className="text-blue-400/70 text-xs flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/profile" className="icon-btn" title="Profile">
            <UserIcon className="size-5" />
          </Link>
          <Link to="/settings" className="icon-btn" title="Settings">
            <SettingsIcon className="size-5" />
          </Link>
          <button
            className="icon-btn"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
            title="Toggle sound"
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
          <button className="icon-btn hover:text-red-400" onClick={logout} title="Logout">
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
