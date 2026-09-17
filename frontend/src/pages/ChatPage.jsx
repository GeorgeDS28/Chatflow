import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { MessageCircleIcon } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[min(800px,90vh)] animate-fade-in">
      <div className="absolute -top-20 left-1/4 size-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute -bottom-16 right-1/4 size-64 bg-indigo-600/15 rounded-full blur-[90px] animate-pulse-glow pointer-events-none" />

      <BorderAnimatedContainer>
        <div className="w-80 shrink-0 bg-blue-950/40 backdrop-blur-md flex flex-col border-r border-blue-500/10 animate-slide-in-left">
          <div className="flex items-center gap-2 px-5 pt-4 pb-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <MessageCircleIcon className="size-4 text-white" />
            </div>
            <span className="font-semibold text-slate-100 tracking-tight">ChatFlow</span>
          </div>

          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-blue-950/20 backdrop-blur-sm min-w-0 animate-slide-in-right">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
