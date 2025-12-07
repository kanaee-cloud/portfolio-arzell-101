import React from "react";
import { IoMdClose } from "react-icons/io";
import Chatbot from "./ChatBot";

const BotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className=" w-full max-w-2xl rounded-2xl p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition"
        >
          <IoMdClose size={28} />
        </button>

        <Chatbot />
      </div>
    </div>
  );
};

export default BotModal;
