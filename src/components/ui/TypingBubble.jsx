import { BsDot } from "react-icons/bs";

const TypingBubble = () => {
  return (
    <div className="message bot flex items-center gap-1">
      <span className="animate-bounce delay-[0ms]"><BsDot size={28} /></span>
      <span className="animate-bounce delay-[150ms]"><BsDot size={28} /></span>
      <span className="animate-bounce delay-[300ms]"><BsDot size={28} /></span>
    </div>
  );
};

export default TypingBubble;