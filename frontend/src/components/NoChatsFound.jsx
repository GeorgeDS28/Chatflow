import { MessageCircleIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4 animate-fade-in">
      <div className="relative mb-5">
        <div className="absolute inset-0 size-16 bg-blue-500/20 rounded-full blur-xl animate-pulse-glow" />
        <div className="relative size-16 bg-gradient-to-br from-blue-500/20 to-blue-700/10 rounded-full flex items-center justify-center border border-blue-500/20">
          <MessageCircleIcon className="size-8 text-blue-400" />
        </div>
      </div>

      <h4 className="text-slate-100 font-semibold mb-1.5">No conversations yet</h4>
      <p className="text-blue-300/50 text-sm mb-5 max-w-[200px] leading-relaxed">
        Start a new chat by selecting a contact from the contacts tab
      </p>

      <button
        onClick={() => setActiveTab("contacts")}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-200
          bg-gradient-to-r from-blue-600/30 to-blue-500/20 border border-blue-500/30
          rounded-xl hover:from-blue-600/40 hover:to-blue-500/30 hover:border-blue-400/40
          transition-all duration-200 hover:-translate-y-0.5"
      >
        <UsersIcon className="size-4" />
        Find contacts
      </button>
    </div>
  );
}

export default NoChatsFound;
