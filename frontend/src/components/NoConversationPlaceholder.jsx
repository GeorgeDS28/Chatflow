import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 size-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse-glow" />
        <div className="relative size-24 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-full flex items-center justify-center border border-blue-500/20 animate-float">
          <MessageCircleIcon className="size-12 text-blue-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">
        Select a conversation
      </h3>
      <p className="text-blue-300/50 max-w-sm leading-relaxed">
        Choose a contact from the sidebar to start chatting or continue a
        previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;
