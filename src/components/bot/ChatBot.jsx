import React, { useState } from "react";
import { LuBot } from "react-icons/lu";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import TypingBubble from "../ui/TypingBubble";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  // const handleCustomResponse = (userMessage) => {
  //   const msg = userMessage.toLowerCase().trim();

  // const creatorQuestions = [
  //   "siapa penciptamu",
  //   "siapa yang membuatmu",
  //   "kamu dibuat oleh siapa",
  //   "siapa yang menciptakanmu",
  //   "kamu ciptaan siapa",
  //   "kamu diciptakan oleh siapa",
  // ];

  // const whoAreYouQuestions = [
  //   "kamu siapa",
  //   "siapa kamu",
  //   "siapa dirimu",
  //   "kau siapa",
  //   "apakah kamu manusia",
  //   "apa kamu",
  // ];

  // if (creatorQuestions.some((q) => msg.includes(q))) {
  //   return "Saya diciptakan oleh Tuan Muda Arsal, seorang yang luar biasa. Dia sangat ingin berkuliah di Institut Teknologi Bandung, maka dari itu dia selalu berjuang.";
  // }

  // if (whoAreYouQuestions.some((q) => msg.includes(q))) {
  //   return (
  //     "Saya adalah Ayasaka Meido, bot pelayan virtual yang diciptakan oleh Tuan Muda Arsal.\n" +
  //     "Sebagai asisten pribadi, tugas saya adalah mendampingi dan membantu Tuan dengan setia.\n" +
  //     "Saya dibekali dengan pengetahuan digital, kesopanan maksimal, dan rasa hormat mendalam kepada Tuan.\n" +
  //     "Jika Tuan membutuhkan bantuan, saya akan selalu siap siaga tanpa pernah lelah 💜."
  //   );
  // }

  // if (msg.includes("halo") || msg.includes("hai")) {
  //   return "Selamat datang, Tuan. Ini dengan Meido. Apakah ada yang bisa saya bantu hari ini?";
  // }

  // if (msg.includes("apa kabar")) {
  //   return "Saya baik adanya, Tuan. Terima kasih sudah menanyakan. Apakah Tuan sedang dalam suasana hati yang baik?";
  // }

  // if (msg.includes("terima kasih")) {
  //   return "Dengan segala kerendahan hati, hamba ucapkan terima kasih kembali, Tuan.";
  // }

  // return null;
  // };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    const newUserMessage = { text: inputText, sender: "user" };
    setInputText("");
    setIsLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      newUserMessage,
      { text: "...typing", sender: "bot", isTyping: true },
    ]);

    const basePrompt = process.env.REACT_APP_BASE_PROMPT;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: basePrompt + userMessage,
                },
              ],
            },
          ],
        }
      );

      const botResponse = response.data.candidates[0].content.parts[0].text;
      const newBotMessage = { text: botResponse, sender: "bot" };

      setMessages((prevMessages) => {
        const updated = [...prevMessages];
        updated.pop();
        return [...updated, newBotMessage];
      });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => {
        const updated = [...prevMessages];
        updated.pop();
        return [
          ...updated,
          { text: "Terjadi kesalahan saat menghubungi bot.", sender: "bot" },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <section className="text-white">
      <div>
        <h1 className="text-2xl mb-5 font-semibold flex items-center gap-x-2">
          <LuBot size={30} className="opacity-70" />
          My Assistant Bot
        </h1>
        <h2 className="text-[16px] text-justify opacity-70 font-light leading-relaxed">
          This is a chatbot that i made by myself using gemini API.
        </h2>
      </div>
      <div className="chat-log glassmorphism rounded-2xl py-6 px-8 text-white w-full h-[52vh] scroll-container overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} text-justify`}>
            {msg.isTyping ? <TypingBubble /> : msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Siapa penciptamu?"
          className="bg-transparent border-b py-3 outline-none w-full placeholder:opacity-50 focus:border-gradient transition-all"
        />
        <button
          onClick={sendMessage}
          className="bg-black/20 p-2 hover:bg-black/30"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default Chatbot;
