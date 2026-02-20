import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Chatbot from "./ChatBot";
import { motion, AnimatePresence } from "framer-motion";

const BotModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(25px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 z-10 w-8 h-8 rounded-full bg-gray-6 border border-white/[0.08] flex items-center justify-center text-label-secondary hover:text-white hover:bg-gray-5 transition-all duration-200"
            >
              <IoMdClose size={16} />
            </button>

            <Chatbot />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BotModal;
