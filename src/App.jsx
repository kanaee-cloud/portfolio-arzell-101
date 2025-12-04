
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Banner from "./components/Banner";
import Certificate from "./components/Certificate";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Chatbot from "./components/bot/ChatBot";

const App = () => {
  return (
    <Router>
      <div className="aurora-bg relative h-screen overflow-hidden">
        <div className="aurora-layer"></div>
        <div className="relative  mx-auto h-full flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 font-primary py-10">
            <Sidebar />
          <div className="flex-1 glassmorphism rounded-2xl py-6 px-8 text-white w-full h-full scroll-container overflow-y-auto">
            <Routes>
              <Route path="/" element={<Banner />} />
              <Route path="/about" element={<About />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/work" element={<Services />} />
              <Route path="/bot" element={<Chatbot />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
