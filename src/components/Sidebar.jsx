import React, { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 1, name: "Home", icon: <GoHome size={20} />, link: "/" },
    { id: 2, name: "About", icon: <BiUserCircle size={20} />, link: "/about" },
    { id: 3, name: "Certificate", icon: <TbCertificate size={18} />, link: "/certificate" },
    { id: 4, name: "Project", icon: <RiGitRepositoryLine size={18} />, link: "/work" },
    { id: 5, name: "GitHub", icon: <FaGithub size={18} />, link: "/github" },
    { id: 6, name: "Contact", icon: <MdContacts size={18} />, link: "/contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <nav className="sidebar-glass h-full lg:w-[240px] flex flex-col justify-between p-5">
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-ios-blue via-ios-indigo to-ios-purple rounded-full opacity-30 group-hover:opacity-50 blur-md transition-all duration-500" />
              <img
                src="/assets/rei.jpg"
                alt="Profile"
                className="relative w-20 h-20 object-cover rounded-full ring-2 ring-white/10 group-hover:ring-ios-blue/40 transition-all duration-500"
              />
            </div>
            <h1 className="flex items-center gap-1.5 mt-4 text-[15px] font-semibold tracking-tight text-white">
              Arsal Nawfal
              <MdOutlineVerified className="text-ios-blue" size={16} />
            </h1>
            <div className="text-[13px] text-label-secondary mt-0.5">
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  2500,
                  "Front-end Developer",
                  2500,
                  "Software Engineer",
                  2500,
                ]}
                speed={50}
                className="text-ios-blue"
                wrapper="span"
                repeat={Infinity}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="ios-separator" />

          {/* Nav Items */}
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-all duration-200 ${
                    isActive(item.link)
                      ? "ios-nav-active"
                      : "text-label-secondary hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span className={isActive(item.link) ? "text-ios-blue" : ""}>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer separator */}
        <div className="ios-separator" />
      </nav>
    );
  }

  // Mobile Navbar
  return (
    <div className="w-full">
      <nav className="w-full flex flex-col fixed top-0 left-0 z-50"
           style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(50px) saturate(180%)', WebkitBackdropFilter: 'blur(50px) saturate(180%)', borderBottom: '1px solid rgba(84,84,88,0.35)' }}>
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/assets/rei.jpg"
                alt="Profile"
                className="w-9 h-9 object-cover rounded-full ring-1 ring-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-ios-green rounded-full ring-2 ring-black" />
            </div>
            <div>
              <h1 className="flex items-center gap-1 text-[14px] font-semibold tracking-tight text-white">
                Arsal Nawfal
                <MdOutlineVerified className="text-ios-blue" size={14} />
              </h1>
              <div className="text-[11px] text-label-secondary">
                <TypeAnimation
                  sequence={[
                    "Web Developer",
                    2500,
                    "Front-end Developer",
                    2500,
                    "Software Engineer",
                    2500,
                  ]}
                  speed={50}
                  className="text-ios-blue"
                  wrapper="span"
                  repeat={Infinity}
                />
              </div>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="text-white p-2 rounded-[10px] hover:bg-white/[0.06] transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <RiCloseLine size={22} className="text-ios-blue" />
            ) : (
              <RiMenu4Line size={22} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="overflow-hidden"
            >
              <ul className="px-3 pb-3 space-y-0.5">
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        delay: item.id * 0.04,
                      },
                    }}
                  >
                    <a
                      href={item.link}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-all duration-200 ${
                        isActive(item.link)
                          ? "ios-nav-active"
                          : "text-label-secondary hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className={isActive(item.link) ? "text-ios-blue" : ""}>{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-14"></div>
    </div>
  );
};

export default ResponsiveNavbar;