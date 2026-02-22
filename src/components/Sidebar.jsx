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
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 1, name: "Home", icon: GoHome, size: 20, link: "/" },
    { id: 2, name: "About", icon: BiUserCircle, size: 20, link: "/about" },
    { id: 3, name: "Certificate", icon: TbCertificate, size: 18, link: "/certificate" },
    { id: 4, name: "Project", icon: RiGitRepositoryLine, size: 18, link: "/work" },
    { id: 5, name: "GitHub", icon: FaGithub, size: 18, link: "/github" },
    { id: 6, name: "Contact", icon: MdContacts, size: 18, link: "/contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNav = (e, link) => {
    e.preventDefault();
    navigate(link);
    setIsMenuOpen(false);
  };

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <nav className="sidebar-glass h-full lg:w-[240px] flex flex-col justify-between p-5 overflow-hidden">
        <div>
          {/* Profile */}
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
          >
            <div className="relative group cursor-pointer">
              {/* Animated glow ring */}
              <motion.div
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #0A84FF, #5E5CE6, #BF5AF2, #FF375F, #FF9F0A, #30D158, #0A84FF)",
                  opacity: 0.25,
                  filter: "blur(8px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -inset-1.5 rounded-full bg-black/50" />
              <img
                src="/assets/rei.jpg"
                alt="Profile"
                className="relative w-20 h-20 object-cover rounded-full ring-2 ring-white/15 group-hover:ring-white/30 transition-all duration-500"
              />
              {/* Online indicator */}
              <motion.div
                className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-ios-green rounded-full ring-[2.5px] ring-[#1C1C1E]"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <h1 className="flex items-center gap-1.5 mt-4 text-[15px] font-semibold tracking-tight text-white">
              Arsal Nawfal
              <motion.span
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.5 }}
              >
                <MdOutlineVerified className="text-ios-blue" size={16} />
              </motion.span>
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
          </motion.div>

          {/* Separator */}
          <div className="ios-separator" />

          {/* Nav Items */}
          <ul className="space-y-1 relative">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.link);
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: 0.15 + index * 0.05,
                  }}
                >
                  <a
                    href={item.link}
                    onClick={(e) => handleNav(e, item.link)}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors duration-200"
                    style={{ color: active ? "#0A84FF" : undefined }}
                  >
                    {/* Active/Hover background pill */}
                    {active && (
                      <motion.div
                        className="absolute inset-0 rounded-[10px]"
                        style={{ background: "rgba(10, 132, 255, 0.12)" }}
                        layoutId="navActivePill"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {hoveredNav === item.id && !active && (
                      <motion.div
                        className="absolute inset-0 rounded-[10px] bg-white/[0.05]"
                        layoutId="navHoverPill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}

                    <motion.span
                      className={`relative z-10 ${active ? "text-ios-blue" : "text-label-secondary"}`}
                      whileHover={{ scale: 1.15, rotate: active ? 0 : -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Icon size={item.size} />
                    </motion.span>
                    <span className={`relative z-10 ${active ? "text-ios-blue" : "text-label-secondary hover:text-white"} transition-colors duration-200`}>
                      {item.name}
                    </span>

                    {/* Active dot indicator */}
                    {active && (
                      <motion.div
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-ios-blue"
                        layoutId="navActiveDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="ios-separator" />
          <div className="flex items-center justify-center gap-1.5 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ios-green animate-pulse" />
            <span className="text-[11px] text-label-quaternary font-medium tracking-wide">Available for work</span>
          </div>
        </motion.div>
      </nav>
    );
  }

  // Mobile Navbar
  return (
    <div className="w-full">
      <nav
        className="w-full flex flex-col fixed top-0 left-0 z-50"
        style={{
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(50px) saturate(180%)",
          WebkitBackdropFilter: "blur(50px) saturate(180%)",
          borderBottom: "1px solid rgba(84,84,88,0.35)",
        }}
      >
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/assets/rei.jpg"
                alt="Profile"
                className="w-9 h-9 object-cover rounded-full ring-1 ring-white/10"
              />
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-ios-green rounded-full ring-2 ring-black"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
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

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 rounded-[10px] hover:bg-white/[0.06] transition-all duration-200"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiCloseLine size={22} className="text-ios-blue" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiMenu4Line size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <ul className="px-3 pb-3 space-y-0.5">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.link);
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 28,
                          delay: index * 0.04,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -16,
                        transition: { duration: 0.15, delay: (navItems.length - index) * 0.02 },
                      }}
                    >
                      <a
                        href={item.link}
                        onClick={(e) => handleNav(e, item.link)}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-all duration-200 ${
                          active
                            ? "text-ios-blue"
                            : "text-label-secondary hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        {active && (
                          <motion.div
                            className="absolute inset-0 rounded-[10px]"
                            style={{ background: "rgba(10, 132, 255, 0.12)" }}
                            layoutId="mobileNavPill"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 ${active ? "text-ios-blue" : ""}`}>
                          <Icon size={item.size} />
                        </span>
                        <span className="relative z-10">{item.name}</span>
                        {active && (
                          <motion.div
                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-ios-blue"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile footer */}
              <motion.div
                className="flex items-center justify-center gap-1.5 pb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-ios-green animate-pulse" />
                <span className="text-[11px] text-label-quaternary font-medium">Available for work</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-14"></div>
    </div>
  );
};

export default ResponsiveNavbar;