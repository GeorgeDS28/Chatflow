import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  const suggestions = ["👋 Say Hello", "🤝 How are you?", "📅 Meet up soon?"];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 size-20 bg-blue-500/20 rounded-full blur-2xl animate-pulse-glow" />
        <div className="relative size-20 bg-gradient-to-br from-blue-500/20 to-blue-700/10 rounded-full flex items-center justify-center border border-blue-500/20 animate-float">
          <MessageCircleIcon className="size-9 text-blue-400" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        Start your conversation with {name}
      </h3>

      <p className="text-blue-300/50 text-sm max-w-sm mb-5 leading-relaxed">
        This is the beginning of your conversation. Send a message to start chatting!
      </p>

      <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-5" />

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((text) => (
          <button
            key={text}
            className="px-4 py-2 text-xs font-medium text-blue-300
              bg-blue-500/10 border border-blue-500/20 rounded-full
              hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-200"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
