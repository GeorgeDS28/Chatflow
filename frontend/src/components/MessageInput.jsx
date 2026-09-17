//MessageInput.jsx

import { useState, useRef } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ];

    const isAllowed = allowedTypes.some((type) =>
      type.endsWith("/") ? file.type.startsWith(type) : file.type === type,
    );

    if (!isAllowed) {
      toast.error("Unsupported file type");
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }; //handleImageChange closd

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Prevent empty messages
    if (!text.trim() && !imagePreview && !selectedFile) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    // If an image is selected, use the existing image flow
    if (imagePreview) {
      sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
    }

    // If a document is selected, convert it to base64
    // before sending it to the backend
    else if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        sendMessage({
          text: text.trim(),
          file: {
            data: reader.result,
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
          },
        });
      };

      reader.readAsDataURL(selectedFile);
    }

    // Text-only message
    else {
      sendMessage({
        text: text.trim(),
      });
    }

    // Clear input
    setText("");
    setImagePreview(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-blue-500/15 bg-blue-950/30 backdrop-blur-sm shrink-0">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center animate-fade-in">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-blue-500/30 shadow-md"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 size-6 rounded-full bg-blue-900 border border-blue-500/30 flex items-center justify-center text-slate-200 hover:bg-red-500/80 hover:border-red-400 transition-colors"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {selectedFile && !imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-500/30 bg-blue-950/50">
            <div className="text-2xl">📄</div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate">
                {selectedFile.name}
              </p>

              <p className="text-xs text-slate-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              onClick={removeImage}
              type="button"
              className="size-6 rounded-full bg-blue-900 border border-blue-500/30 flex items-center justify-center text-slate-200 hover:bg-red-500/80 transition-colors"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex gap-2"
      >
        <input
          type="text"
          value={text}
          placeholder="Type your message..."
          className="flex-1 bg-blue-950/50 border border-blue-500/20 rounded-xl py-2.5 px-4 text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) playRandomKeyStrokeSound();
          }}
        />

        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 rounded-xl border transition-all duration-200 ${
            imagePreview
              ? "bg-blue-500/20 border-blue-400/40 text-blue-300"
              : "bg-blue-950/50 border-blue-500/20 text-blue-400/70 hover:text-blue-300 hover:border-blue-400/30"
          }`}
        >
          <ImageIcon className="size-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview && !selectedFile}
          className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/30 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-500"
        >
          <SendIcon className="size-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
