import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
  isError?: boolean;
}

const TypingDots = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

export const ChatBotWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const basePrompt = import.meta.env.VITE_BASE_PROMPT || '';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setInputText('');

    setMessages((prev) => [
      ...prev,
      { text: userMsg, sender: 'user' },
      { text: '', sender: 'bot', isTyping: true },
    ]);
    setIsLoading(true);

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: basePrompt + userMsg }] }] }
      );
      const botText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that.';
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: botText, sender: 'bot' };
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: 'Connection error. Please try again.', sender: 'bot', isError: true };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      >
        <img
          src="https://i.pinimg.com/736x/f6/2d/eb/f62deb95183ef30aab05b3dbdffac995.jpg"
          alt="bot"
          className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
        />
        <div>
          <h3 className="text-[13px] font-semibold text-white">Ayasaka Meido</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#27C93F] rounded-full animate-pulse" />
            <span className="text-[10px] text-white/35">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-[12px] text-white/30">Start a conversation</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                msg.sender === 'user'
                  ? 'text-white rounded-tr-sm'
                  : msg.isError
                  ? 'text-[#FF5F57] rounded-tl-sm'
                  : 'text-white/80 rounded-tl-sm'
              }`}
              style={{
                background: msg.sender === 'user'
                  ? '#007AFF'
                  : msg.isError
                  ? 'rgba(255,95,87,0.1)'
                  : 'rgba(255,255,255,0.07)',
                border: msg.sender !== 'user' ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {msg.isTyping ? (
                <TypingDots />
              ) : (
                <div className="prose prose-invert prose-xs max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="p-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-[13px] text-white placeholder-white/25 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputText.trim()}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: '#007AFF' }}
          >
            {isLoading ? (
              <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="text-white text-[11px]">↑</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
