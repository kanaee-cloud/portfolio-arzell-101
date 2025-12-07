import React, { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { MdContacts } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
// import ReactBadge from "./Badges/ReactBadge";
import { LuBot } from "react-icons/lu";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../variants";
import { useLocation } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); 

  const navItems = [
    { id: 1, name: "Home", icon: <GoHome size={25} />, link: "/" },
    { id: 2, name: "About", icon: <BiUserCircle size={25} />, link: "/about" },
    { id: 3, name: "Certificate", icon: <TbCertificate size={22} />, link: "/certificate" },
    { id: 4, name: "Project", icon: <RiGitRepositoryLine size={22} />, link: "/work" },
    { id: 5, name: "Contact", icon: <MdContacts size={22} />, link: "/contact" },
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <nav className="relative sidebar-glass h-full lg:w-60 flex flex-col justify-between p-4 shadow-lg">
        <ul>
          <img
            src="/assets/rei.jpg"
            alt="Icon"
            className="w-24 h-24 hover:scale-110 transition-all duration-300 object-cover rounded-full mb-5"
          />
          <h1 className="flex items-center gap-2">
            Arsal Nawfal
           <MdOutlineVerified className="text-accent"/>
          </h1>
          <motion.div
            className="text-sm font-primary"
            variants={fadeIn("up", 0.3)}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            <TypeAnimation
              sequence={[
                "Web Developer",
                2000,
                "Front-end Developer",
                2000,
                "Software Engineer",
                2000,
                "Weebs",
                2000,
              ]}
              speed={50}
              className="text-accent"
              wrapper="span"
              repeat={Infinity}
            />
          </motion.div>
          <hr className="opacity-30 my-3" />
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-x-2 px-4 py-3 rounded-md cursor-pointer transition-all duration-300 ${
                isActive(item.link)
                  ? "bg-light text-black"
                  : "hover:bg-black/15 text-white/70 hover:text-white"
              }`}
            >
              <a
                href={item.link}
                className="flex items-center gap-x-2 w-full hover:scale-105 transition-all duration-300"
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <hr className="opacity-30 my-3" />
      </nav>
    );
  }

  // Mobile Navbar
  return (
    <div className="w-full">
      <nav className="glassmorphism w-full flex flex-col shadow-lg fixed top-0 left-0 z-50">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/rei.jpg"
              alt="Icon"
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <h1 className="flex items-center gap-1 text-sm">
                Arsal Nawfal
                <MdOutlineVerified className="text-accent" />
              </h1>
              <motion.div
                className="text-xs font-primary"
                variants={fadeIn("up", 0.3)}
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
              >
                <TypeAnimation
                  sequence={[
                    "Web Developer",
                    2000,
                    "Front-end Developer",
                    2000,
                    "UI/UX Designer",
                    2000,
                    "Weebs",
                    2000,
                  ]}
                  speed={50}
                  className="text-accent"
                  wrapper="span"
                  repeat={Infinity}
                />
              </motion.div>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="text-white p-2 rounded-md hover:bg-black/20 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <RiCloseLine size={24} className="text-accent" />
            ) : (
              <RiMenu4Line size={24} />
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
              <ul className="px-2 pb-3">
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: item.id * 0.05
                      }
                    }}
                    className={`flex items-center gap-x-2 px-4 py-3 rounded-md cursor-pointer my-1 transition-all duration-300 ${
                      isActive(item.link)
                        ? "bg-black/30 text-white"
                        : "hover:bg-black/15 text-white/70 hover:text-white"
                    }`}
                  >
                    <a
                      href={item.link}
                      className="flex items-center gap-x-2 w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16"></div> 
    </div>
  );
};

export default ResponsiveNavbar;