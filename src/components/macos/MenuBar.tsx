import { useState, useEffect } from 'react';
import { Wifi, BatteryFull, Search } from 'lucide-react';
import { useWindowManager } from '../../store/windowManager';
import type { WindowId } from '../../types';

interface MenuItem {
  label: string;
  windowId: WindowId;
  color: string;
}

const menuItems: MenuItem[] = [
  { label: 'About',    windowId: 'about',        color: '#BF5AF2' },
  { label: 'Projects', windowId: 'projects',     color: '#FF9F0A' },
  { label: 'Skills',   windowId: 'terminal',     color: '#64D2FF' },
  { label: 'Contact',  windowId: 'contact',      color: '#30D158' },
];

export const MenuBar = ({ onSpotlight }: { onSpotlight?: () => void }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const openWindow = useWindowManager((s) => s.openWindow);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-3 h-7 select-none"
      style={{
        background: 'rgba(10,7,5,0.85)',
        backdropFilter: 'blur(30px) saturate(160%)',
        WebkitBackdropFilter: 'blur(30px) saturate(160%)',
        borderBottom: '1px solid rgba(255,200,150,0.06)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-0.5">
        {/* Apple logo */}
        <button
          onClick={() => openWindow('welcome')}
          className="px-2 py-0.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 text-[14px] font-medium"
        >

        </button>

        <span className="text-white/50 text-[13px] font-semibold px-2">Arsal</span>

        <div className="h-3 w-px bg-white/10 mx-1" />

        {menuItems.map((item) => (
          <button
            key={item.windowId}
            onClick={() => openWindow(item.windowId)}
            onMouseEnter={() => setHovered(item.windowId)}
            onMouseLeave={() => setHovered(null)}
            className="px-2.5 py-0.5 text-[13px] rounded transition-all duration-150"
            style={{
              color: hovered === item.windowId ? item.color : 'rgba(255,255,255,0.7)',
              background: hovered === item.windowId ? `${item.color}15` : 'transparent',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5 text-white/60">
        <button
          onClick={onSpotlight}
          title="Spotlight Search (⌘ Space)"
          className="hover:text-white transition-colors duration-150 p-0.5 rounded hover:bg-white/10"
        >
          <Search size={12} />
        </button>
        <BatteryFull size={14} />
        <Wifi size={13} />
        <div className="h-3 w-px bg-white/10" />
        <span className="text-[12px] text-white/50">{date}</span>
        <span className="text-[12px] text-white/80 font-medium tabular-nums min-w-[58px] text-right">{time}</span>
      </div>
    </div>
  );
};
