import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { BsArrowUpRight, BsBriefcase, BsCalendar3, BsGeoAlt, BsBuilding, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Badge from "./Badges/Badge";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, data]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!data) return null;

  const images = data.gallery && data.gallery.length > 0 ? data.gallery : (data.img ? [data.img] : []);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl rounded-t-[20px] sm:rounded-ios-xl overflow-hidden shadow-ios-lg"
            style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile handle bar */}
            <div className="sm:hidden flex justify-center pt-2 pb-0">
              <div className="w-9 h-1 rounded-full bg-gray-3" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div className="w-8" />
              <h3 className="text-[15px] font-semibold text-white truncate max-w-[70%]">{data.name}</h3>
              <button
                className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-label-secondary hover:text-white hover:bg-white/[0.1] transition-all duration-200"
                onClick={onClose}
              >
                <IoMdClose size={16} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto scroll-container max-h-[75vh] sm:max-h-[70vh]">
              {/* Main Thumbnail */}
              {data.img && (
                <div className="w-full relative overflow-hidden bg-black/10 border-b border-white/[0.06]">
                  <img
                    src={data.img}
                    alt={`${data.name} thumbnail`}
                    className="w-full h-52 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Details */}
              <div className="p-5 space-y-4">
                {/* Metadata pills */}
                <div className="flex flex-wrap gap-2">
                  {data.periode && (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-ios-blue font-medium px-2.5 py-1 rounded-full bg-ios-blue/10">
                      <BsCalendar3 size={10} />
                      {data.periode}
                    </span>
                  )}
                  {data.role && (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-ios-green font-medium px-2.5 py-1 rounded-full bg-ios-green/10">
                      <BsBriefcase size={10} />
                      {data.role}
                    </span>
                  )}
                  {data.place && (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-ios-orange font-medium px-2.5 py-1 rounded-full bg-ios-orange/10">
                      <BsGeoAlt size={10} />
                      {data.place}
                    </span>
                  )}
                </div>

                {/* Company / Issuer */}
                {data.company && (
                  <div className="flex items-center gap-2">
                    <BsBuilding size={14} className="text-label-tertiary" />
                    <p className="text-[14px] text-label-secondary font-medium">{data.company}</p>
                  </div>
                )}

                {/* Description */}
                {data.description && (
                  <p className="text-[14px] text-label-secondary leading-relaxed">
                    {data.description}
                  </p>
                )}

                {/* Image Carousel (Gallery) */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[11px] text-label-tertiary font-medium uppercase tracking-wider mb-2">Project Gallery</p>
                    <div className="relative group rounded-xl overflow-hidden bg-black/30 ring-1 ring-white/10">
                      <div className="w-full relative flex items-center justify-center min-h-[250px] sm:min-h-[350px]">
                        <AnimatePresence initial={false} mode="wait">
                          <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt={`${data.name} gallery image ${currentImageIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-h-[50vh] object-contain"
                          />
                        </AnimatePresence>
                      </div>
                      
                      {/* Carousel Controls */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
                          >
                            <BsChevronLeft size={16} />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
                          >
                            <BsChevronRight size={16} />
                          </button>
                          
                          {/* Dots */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2 py-1.5 rounded-full">
                            {images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  currentImageIndex === idx ? 'w-4 bg-white' : 'bg-white/50 hover:bg-white/80'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Tech Badges */}
                {data.frameworks && data.frameworks.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[11px] text-label-tertiary font-medium uppercase tracking-wider mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {data.frameworks.map((fw, i) => (
                        <Badge key={i} name={fw} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {data.url && (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-btn inline-flex items-center gap-2 mt-4"
                  >
                    <BsArrowUpRight size={14} />
                    View Project
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render modal content as a portal attached directly to document body 
  // to avoid being trapped inside the overflow scroll container.
  return createPortal(modalContent, document.body);
};

export default Modal;
