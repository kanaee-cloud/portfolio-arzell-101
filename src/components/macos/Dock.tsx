import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { Home, FolderOpen, Terminal, Award, Github, Mail, MessageCircle, User } from 'lucide-react';
import { useWindowManager } from '../../store/windowManager';
import type { WindowId } from '../../types';

interface DockItem {
  id: WindowId;
  icon: React.ReactNode;
  label: string;
  gradient: string;
  glow: string;
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: 'welcome',
    icon: <Home size={24} strokeWidth={1.8} />,
    label: 'Home',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
    glow: 'rgba(0,122,255,0.5)',
  },
  {
    id: 'about',
    icon: <User size={24} strokeWidth={1.8} />,
    label: 'About Me',
    gradient: 'linear-gradient(135deg, #AF52DE 0%, #BF5AF2 100%)',
    glow: 'rgba(175,82,222,0.5)',
  },
  {
    id: 'projects',
    icon: <FolderOpen size={24} strokeWidth={1.8} />,
    label: 'Projects',
    gradient: 'linear-gradient(135deg, #FF9F0A 0%, #FFD60A 100%)',
    glow: 'rgba(255,159,10,0.5)',
  },
  {
    id: 'terminal',
    icon: <Terminal size={24} strokeWidth={1.8} />,
    label: 'Terminal',
    gradient: 'linear-gradient(135deg, #1D1D1F 0%, #3A3A3C 100%)',
    glow: 'rgba(100,210,255,0.4)',
  },
  {
    id: 'certificates',
    icon: <Award size={24} strokeWidth={1.8} />,
    label: 'Certificates',
    gradient: 'linear-gradient(135deg, #FF9F0A 0%, #FF6B00 100%)',
    glow: 'rgba(255,159,10,0.5)',
  },
  {
    id: 'github',
    icon: <Github size={24} strokeWidth={1.8} />,
    label: 'GitHub',
    gradient: 'linear-gradient(135deg, #2D2D2D 0%, #4A4A4A 100%)',
    glow: 'rgba(255,255,255,0.3)',
  },
  {
    id: 'contact',
    icon: <Mail size={24} strokeWidth={1.8} />,
    label: 'Mail',
    gradient: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
    glow: 'rgba(48,209,88,0.5)',
  },
  {
    id: 'chatbot',
    icon: <MessageCircle size={24} strokeWidth={1.8} />,
    label: 'AI Chat',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #5E5CE6 100%)',
    glow: 'rgba(94,92,230,0.5)',
  },
];

const BASE_SIZE = 52;
const MAX_SCALE = 1.55;
const SPREAD = 90;

// Individual icon with its own spring-based scale
const DockIcon = ({
  item,
  mouseX,
  iconRef,
  isOpen,
  onClick,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue<number | null>>;
  iconRef: (el: HTMLDivElement | null) => void;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (mx) => {
    if (mx === null || !ref.current) return 999;
    const rect = ref.current.getBoundingClientRect();
    return Math.abs(mx - (rect.left + rect.width / 2));
  });

  const rawScale = useTransform(distance, (d) => {
    if (d === 999) return 1;
    return 1 + (MAX_SCALE - 1) * Math.exp(-(d * d) / (2 * SPREAD * SPREAD));
  });

  const scale = useSpring(rawScale, { stiffness: 380, damping: 26, mass: 0.6 });

  return (
    <div
      className="flex flex-col items-center relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-full mb-3 px-2.5 py-1 rounded-lg text-[12px] font-medium text-white whitespace-nowrap pointer-events-none"
            style={{
              background: 'rgba(36,36,46,0.96)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        ref={(el) => {
          (ref as any).current = el;
          iconRef(el);
        }}
        onClick={onClick}
        style={{
          scale,
          width: BASE_SIZE,
          height: BASE_SIZE,
          transformOrigin: 'bottom center',
          background: item.gradient,
          boxShadow: hovered ? `0 8px 24px ${item.glow}` : '0 2px 8px rgba(0,0,0,0.3)',
        }}
        className="cursor-pointer flex items-center justify-center rounded-[12px] text-white relative transition-shadow duration-200"
        whileTap={{ scale: 0.88 }}
      >
        {item.icon}

        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-[12px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Active dot */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
        className="w-1 h-1 rounded-full mt-1.5"
        style={{ background: 'rgba(255,255,255,0.85)' }}
      />
    </div>
  );
};

export const Dock = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseX = useMotionValue<number | null>(null);

  const windows = useWindowManager((s) => s.windows);
  const focusedWindowId = useWindowManager((s) => s.focusedWindowId);
  const openWindow = useWindowManager((s) => s.openWindow);
  const focusWindow = useWindowManager((s) => s.focusWindow);
  const minimizeWindow = useWindowManager((s) => s.minimizeWindow);

  const handleClick = (id: WindowId) => {
    const win = windows[id];
    if (!win.isOpen || win.isMinimized) {
      // Closed or minimized → open/restore
      openWindow(id);
    } else if (focusedWindowId === id) {
      // Already focused → minimize (suck into dock)
      minimizeWindow(id);
    } else {
      // Open but not focused → bring to front
      focusWindow(id);
    }
  };

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-[999] pointer-events-none">
      <motion.div
        className="flex items-end gap-2.5 px-4 pb-3 pt-4 pointer-events-auto"
        style={{
          background: 'rgba(16,10,6,0.62)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderRadius: '22px',
          border: '1px solid rgba(255,200,150,0.1)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,220,180,0.06)',
        }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {DOCK_ITEMS.map((item, i) => {
          const win = windows[item.id];
          const isOpen = !!win?.isOpen && !win?.isMinimized;

          return (
            <DockIcon
              key={item.id}
              item={item}
              mouseX={mouseX}
              iconRef={(el) => { iconRefs.current[i] = el; }}
              isOpen={isOpen}
              onClick={() => handleClick(item.id)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
