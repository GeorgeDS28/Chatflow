//ChatContainer.jsx

import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 px-4 md:px-6 overflow-y-auto py-6 bg-gradient-to-b from-blue-950/10 to-transparent">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg, index) => {
              const isSent = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  style={{ animationDelay: `${index * 30}ms` }}
                  className={`flex animate-fade-in-up ${isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 ${
                      isSent ? "msg-bubble-sent" : "msg-bubble-received"
                    }`}
                  >
                    {/* ===============================================
                        Image message
    =============================================== */}

                    {msg.image && (
                      <a
                        href={msg.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={msg.image}
                          alt="attachment"
                          className="max-w-[200px] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </a>
                    )}

                    {/* 
                  Document message
                  */}
                    {msg.file && (
                      <a
                        href={msg.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-950/50 border border-blue-400/20 hover:border-blue-400/50 hover:bg-blue-900/40 transition-colors"
                      >
                        <div className="text-2xl">📄</div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">
                            {msg.file.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-0.5">
                            {msg.file.size
                              ? `${(msg.file.size / 1024 / 1024).toFixed(2)} MB`
                              : msg.file.type}
                          </p>

                          <p className="text-xs text-blue-400 mt-1">
                            Click to open
                          </p>
                        </div>
                      </a>
                    )}

                    {/* ===============================================
                             Text message
    =============================================== */}

                    {msg.text && (
                      <p
                        className={`text-sm leading-relaxed ${
                          msg.image || msg.file ? "mt-2" : ""
                        }`}
                      >
                        {msg.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
