import React from "react";

const AnimatedBadge = ({ gifSrc, size = 32, alt = "badge", className = "" }) => {
  return (
    <div
      className={`w-[${size}px] h-[${size}px] rounded-full overflow-hidden border-2 border-white animate-pulse shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={gifSrc}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
};