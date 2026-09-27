import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, User, Terminal, RefreshCw, Info, Palette, MessageCircle } from 'lucide-react';
import { useWindowManager } from '../../store/windowManager';
import { useNotifications } from '../../store/notifications';
import type { WindowId } from '../../types';

export interface ContextMenuState {
  x: number;
  y: number;
  open: boolean;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  accent?: string;
  dividerAfter?: boolean;
}

interface Props {
  menu: ContextMenuState;
  onClose: () => void;
  onSpotlight: () => void;
}

export const ContextMenu = ({ menu, onClose, onSpotlight }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowManager();
  const { push } = useNotifications();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (menu.open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menu.open]);

  const items: MenuItem[] = [
    {
      label: 'New Finder Window',
      icon: <FolderOpen size={14} />,
      accent: '#FF9F0A',
      action: () => { openWindow('projects'); onClose(); },
      dividerAfter: true,
    },
    {
      label: 'About This Portfolio',
      icon: <Info size={14} />,
      accent: '#007AFF',
      action: () => { openWindow('about'); onClose(); },
    },
    {
      label: 'Open Terminal',
      icon: <Terminal size={14} />,
      accent: '#64D2FF',
      action: () => { openWindow('terminal'); onClose(); },
    },
    {
      label: 'Contact Me',
      icon: <User size={14} />,
      accent: '#30D158',
      action: () => { openWindow('contact'); onClose(); },
      dividerAfter: true,
    },
    {
      label: 'Spotlight Search…',
      icon: <RefreshCw size={14} />,
      accent: '#BF5AF2',
      action: () => { onClose(); onSpotlight(); },
    },
    {
      label: 'Open AI Chat',
      icon: <MessageCircle size={14} />,
      accent: '#5E5CE6',
      action: () => { openWindow('chatbot'); onClose(); },
      dividerAfter: true,
    },
    {
      label: 'Refresh Portfolio',
      icon: <Palette size={14} />,
      accent: '#FF453A',
      action: () => {
        onClose();
        push({ title: 'Portfolio refreshed', body: 'All windows reset to default positions', type: 'success', icon: '✨' });
      },
    },
  ];

  // Clamp to viewport
  const menuW = 220;
  const menuH = items.length * 36 + 16;
  const x = Math.min(menu.x, window.innerWidth  - menuW - 8);
  const y = Math.min(menu.y, window.innerHeight - menuH - 8);

  return (
    <AnimatePresence>
      {menu.open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.93, y: -6 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.93, y: -6, transition: { duration: 0.14 } }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="fixed z-[3000] py-1.5 overflow-hidden"
          style={{
            left: x,
            top: y,
            width: menuW,
            background: 'rgba(30,30,42,0.88)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.06)',
          }}
        >
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={item.action}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left group transition-colors duration-100 hover:bg-white/[0.07]"
              >
                <span style={{ color: item.accent ?? 'rgba(255,255,255,0.5)' }}>
                  {item.icon}
                </span>
                <span className="text-[13px] text-white/80 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </button>
              {item.dividerAfter && (
                <div className="mx-3 my-1" style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
