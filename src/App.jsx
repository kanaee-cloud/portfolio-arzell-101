import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Banner from "./components/Banner";
import Certificate from "./components/Certificate";
import Contact from "./components/Contact";
import Services from "./components/Services";
import BotModal from "./components/bot/BotModal";
import { BiChat } from "react-icons/bi";

const App = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  return (
    <Router>
      <div className="aurora-bg relative min-h-screen overflow-hidden">
        <div className="aurora-layer"></div>

        <div className="relative mx-auto flex flex-col lg:flex-row gap-4 h-screen font-primary">
          <aside className="w-full lg:w-auto">
            <Sidebar />
          </aside>

          <main className="flex-1 flex p-4">
            <div className="glassmorphism rounded-2xl py-6 scroll-container px-8 text-white w-full h-full overflow-y-auto">
              <Routes>
                <Route path="/" element={<Banner />} />
                <Route path="/about" element={<About />} />
                <Route path="/certificate" element={<Certificate />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/work" element={<Services />} />
              </Routes>
            </div>
          </main>

          {/* Floating Button Trigger */}
          <button
            onClick={() => setIsBotOpen(true)}
            className="fixed bottom-6 right-6 glassmorphism hover:bg-slate-900 bg-slate-700 text-white p-4 rounded-full shadow-lg transition z-50"
          >
            <BiChat size={28} />
          </button>

          {/* Chatbot Modal */}
          <BotModal isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
        </div>
      </div>
    </Router>
  );
};

export default App;
