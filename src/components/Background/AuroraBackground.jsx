import React from "react";

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">

      <div className="absolute w-[150%] h-[150%] bg-gradientRadial from-green-400/20 via-blue-500/20 to-purple-500/10 blur-3xl animate-auroraMotion left-[-25%] top-[-25%]" />
      <div className="absolute w-[140%] h-[140%] bg-gradientRadial from-cyan-300/30 via-indigo-400/20 to-transparent blur-2xl animate-auroraMotionSlow left-[-20%] top-[10%]" />
      <div className="absolute w-[120%] h-[120%] bg-gradientRadial from-purple-500/20 via-pink-500/10 to-transparent blur-2xl animate-auroraMotionReverse right-[-10%] bottom-[-10%]" />
      
  
      <div className="absolute inset-0 bg-[#0a0a1f]" />
    </div>
  );
};

export default AuroraBackground;
