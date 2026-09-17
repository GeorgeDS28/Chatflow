import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  if (allContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center px-4">
        <p className="text-slate-400 text-sm">No contacts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {allContacts.map((contact, index) => {
        const isActive = selectedUser?._id === contact._id;
        const isOnline = onlineUsers.includes(contact._id);

        return (
          <div
            key={contact._id}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`chat-list-item animate-fade-in-up ${
              isActive ? "chat-list-item-active" : ""
            }`}
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="size-11 rounded-full ring-2 ring-blue-500/20">
                  <img
                    src={contact.profilePic || "/avatar.png"}
                    alt={contact.fullName}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h4 className="text-slate-100 font-medium truncate text-sm">
                  {contact.fullName}
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

export default ContactList;
