import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-blue-950/50 backdrop-blur-sm border-b border-blue-500/15 px-5 py-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="size-12 rounded-full ring-2 ring-blue-500/30">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-left">
          <h3 className="text-slate-100 font-semibold">{selectedUser.fullName}</h3>
          <p className={`text-xs flex items-center gap-1.5 ${isOnline ? "text-emerald-400" : "text-slate-500"}`}>
            <span
              className={`size-1.5 rounded-full ${isOnline ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}
            />
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="icon-btn hover:bg-red-500/10 hover:text-red-400"
        title="Close chat"
      >
        <XIcon className="size-5" />
      </button>
    </div>
  );
}

export default ChatHeader;
