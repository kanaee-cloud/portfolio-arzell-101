import React, { useState, useRef, useEffect } from 'react';
import { BiHomeAlt, BiUserCircle } from 'react-icons/bi';
import { BsClipboardData, BsBriefcase, BsChatSquareText } from 'react-icons/bs';
import { HiChevronUp } from 'react-icons/hi';
import { Link } from 'react-scroll';

const Nav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const startY = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Deteksi apakah device adalah touch screen
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleStart = (y) => {
    startY.current = y;
  };

  const handleEnd = (y) => {
    const diffY = (startY.current ?? 0) - y;
    if (!isVisible && diffY > 40) {
      setIsVisible(true); // swipe up
    } else if (isVisible && diffY < -40) {
      setIsVisible(false); // swipe down
    }
  };

  const handleClick = () => {
    if (!isTouchDevice) {
      setIsVisible(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Swipe icon (shown only when nav hidden) */}
      {!isVisible && (
        <div
          onTouchStart={(e) => handleStart(e.touches[0].clientY)}
          onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientY)}
          onClick={handleClick}
          className="h-10 w-full flex justify-center items-center bg-transparent cursor-pointer"
        >
          <HiChevronUp className="text-3xl text-gray-500 animate-bounce" />
        </div>
      )}

      {/* Navigation menu */}
      <div
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientY)}
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-black/70 h-[80px] backdrop-blur-2xl rounded-t-2xl max-w-[460px] mx-auto px-5 flex justify-between items-center text-2xl text-white shadow-lg">
          <Link to="home" activeClass="active" smooth={true} spy={true} offset={-200} className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center">
            <BiHomeAlt />
          </Link>
          <Link to="about" activeClass="active" smooth={true} spy={true} className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center">
            <BiUserCircle />
          </Link>
          <Link to="services" activeClass="active" smooth={true} spy={true} className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center">
            <BsClipboardData />
          </Link>
          <Link to="work" activeClass="active" smooth={true} spy={true} className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center">
            <BsBriefcase />
          </Link>
          <Link to="contact" activeClass="active" smooth={true} spy={true} className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center">
            <BsChatSquareText />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
