import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-1.5">
      {chats.map((chat, index) => {
        const isActive = selectedUser?._id === chat._id;
        const isOnline = onlineUsers.includes(chat._id);

        return (
          <div
            key={chat._id}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`chat-list-item animate-fade-in-up ${
              isActive ? "chat-list-item-active" : ""
            }`}
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="size-11 rounded-full ring-2 ring-blue-500/20">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h4 className="text-slate-100 font-medium truncate text-sm">
                  {chat.fullName}
                </h4>
                <p className={`text-xs ${isOnline ? "text-emerald-400" : "text-slate-500"}`}>
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;
