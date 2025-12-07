import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { LuBot, LuUser, LuSparkles } from "react-icons/lu";
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
            text: "⚠️ Terjadi kesalahan koneksi. Silakan coba lagi.",
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
    <section className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 py-8">
      <div className="relative w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
        <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/5 z-10">
          <div className="p-1.5 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
            <LuSparkles size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              Gemini Assistant
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-slate-400 font-medium">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-container">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-40 space-y-2">
              <LuBot size={48} />
              <p className="text-xs">Mulai percakapan dengan menyapa AI.</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[85%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-slate-700 text-emerald-400 border border-slate-600"
                }`}>
                  {msg.sender === "user" ? <LuUser size={14} /> : <LuBot size={16} />}
                </div>

                {/* Bubble Text: px-5 -> px-4, py-3.5 -> py-2.5 */}
                <div className={`relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : msg.isError
                      ? "bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-none"
                      : "bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-none"
                }`}>
                  {msg.isTyping ? (
                    <TypingBubble />
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none text-xs md:text-sm">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* --- Input Area Compact --- */}
        <div className="p-3 bg-slate-900/90 border-t border-white/5 backdrop-blur-md">
          <div className="relative flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-xl px-2 py-1.5 focus-within:border-indigo-500/50 focus-within:bg-slate-800 transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 bg-transparent text-white px-3 py-1.5 outline-none placeholder:text-slate-500 text-xs md:text-sm"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputText.trim()}
              className={`p-2 rounded-lg transition-all ${
                isLoading || !inputText.trim()
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <IoMdSend size={16} />
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Chatbot;