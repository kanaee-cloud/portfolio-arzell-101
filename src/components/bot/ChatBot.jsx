import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { LuBot, LuUser } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import TypingBubble from "../ui/TypingBubble";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const basePrompt = process.env.REACT_APP_BASE_PROMPT || "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: "user" };
    setInputText("");

    setMessages((prev) => [
      ...prev,
      userMessage,
      { text: "typing...", sender: "bot", isTyping: true },
    ]);

    setIsLoading(true);

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: basePrompt + userMessage.text }] }],
        }
      );

      const botText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Maaf, saya tidak dapat memproses pesan ini.";

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { text: botText, sender: "bot" }];
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          {
            text: "Connection error. Please try again.",
            sender: "bot",
            isError: true,
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-ios-xl overflow-hidden flex flex-col h-[500px] shadow-ios-lg"
         style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06]">
        <div className="p-2 rounded-full bg-ios-blue/15">
          <img className="w-10 rounded-full object-cover" src="https://i.pinimg.com/736x/f6/2d/eb/f62deb95183ef30aab05b3dbdffac995.jpg" alt="icon" />
        </div>
        <div>
          <h1 className="text-[14px] font-semibold text-white tracking-tight">
            Ayasaka Meido
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-ios-green rounded-full animate-pulse-soft" />
            <p className="text-[11px] text-label-tertiary">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-container">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="p-4 rounded-full bg-gray-5">
              <LuBot size={32} className="text-label-tertiary" />
            </div>
            <p className="text-[13px] text-label-tertiary">Start a conversation with AI.</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[85%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === "user"
                  ? "bg-ios-blue text-white"
                  : "bg-gray-5 text-ios-green ring-1 ring-white/[0.06]"
              }`}>
                {msg.sender === "user" ? <LuUser size={13} /> : <LuBot size={14} />}
              </div>

              <div className={`relative px-4 py-2.5 rounded-ios-lg text-[14px] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-ios-blue text-white rounded-tr-sm"
                  : msg.isError
                    ? "bg-ios-red/10 text-ios-red border border-ios-red/20 rounded-tl-sm"
                    : "bg-gray-5 text-label-primary border border-white/[0.04] rounded-tl-sm"
              }`}>
                {msg.isTyping ? (
                  <TypingBubble />
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none text-[13px]">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.06]" style={{ background: 'rgba(28,28,30,0.95)' }}>
        <div className="flex items-center gap-2 bg-gray-5 border border-white/[0.06] rounded-ios-lg px-3 py-1.5 focus-within:border-ios-blue/40 transition-all duration-200">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 bg-transparent text-white px-1 py-1.5 outline-none placeholder:text-label-quaternary text-[14px]"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputText.trim()}
            className={`p-2 rounded-ios transition-all duration-200 ${
              isLoading || !inputText.trim()
                ? "bg-gray-4 text-label-quaternary cursor-not-allowed"
                : "bg-ios-blue text-white hover:bg-[#409CFF] active:scale-95"
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <IoMdSend size={15} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;