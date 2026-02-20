import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Banner from "./components/Banner";
import Certificate from "./components/Certificate";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Github from "./components/Github";
import BotModal from "./components/bot/BotModal";
import AuroraBackground from "./components/Background/AuroraBackground";
import { LuSparkles } from "react-icons/lu";

const App = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  return (
    <Router>
      <AuroraBackground />

      <div className="relative mx-auto flex flex-col lg:flex-row gap-0 h-screen font-primary">
        <aside className="w-full lg:w-auto">
          <Sidebar />
        </aside>

        <main className="flex-1 flex p-3 lg:p-4">
          <div className="rounded-ios-xl py-6 scroll-container px-6 lg:px-8 text-white w-full h-full overflow-y-auto"
               style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <Routes>
              <Route path="/" element={<Banner />} />
              <Route path="/about" element={<About />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/work" element={<Services />} />
              <Route path="/github" element={<Github />} />
            </Routes>
          </div>
        </main>

        {/* Floating AI Button */}
        <button
          onClick={() => setIsBotOpen(true)}
          className="fixed bottom-6 right-6 bg-ios-blue hover:bg-[#409CFF] text-white p-4 rounded-full shadow-ios-lg transition-all duration-300 z-50 group hover:scale-105 active:scale-95"
        >
          <LuSparkles size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        </button>

        {/* Chatbot Modal */}
        <BotModal isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      </div>
    </Router>
  );
};

export default App;
