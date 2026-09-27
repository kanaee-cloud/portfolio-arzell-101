import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useWindowManager } from '../../store/windowManager';
import type { WindowId } from '../../types';

interface MacWindowProps {
  id: WindowId;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

const MIN_W = 380;
const MIN_H = 280;

// Resize handle definitions: direction → position + cursor
const RESIZE_HANDLES = [
  { dir: 'n',  cls: 'top-0 left-3 right-3 h-[5px]',        cursor: 'ns-resize'   },
  { dir: 's',  cls: 'bottom-0 left-3 right-3 h-[5px]',     cursor: 'ns-resize'   },
  { dir: 'e',  cls: 'right-0 top-3 bottom-3 w-[5px]',      cursor: 'ew-resize'   },
  { dir: 'w',  cls: 'left-0 top-3 bottom-3 w-[5px]',       cursor: 'ew-resize'   },
  { dir: 'ne', cls: 'top-0 right-0 w-4 h-4',               cursor: 'ne-resize'   },
  { dir: 'nw', cls: 'top-0 left-0 w-4 h-4',                cursor: 'nw-resize'   },
  { dir: 'se', cls: 'bottom-0 right-0 w-4 h-4',            cursor: 'se-resize'   },
  { dir: 'sw', cls: 'bottom-0 left-0 w-4 h-4',             cursor: 'sw-resize'   },
] as const;

const TrafficLight = ({
  color,
  symbol,
  onClick,
}: {
  color: string;
  symbol: string;
  onClick: (e: React.MouseEvent) => void;
}) => (
  <button
    onMouseDown={(e) => e.stopPropagation()}
    onClick={onClick}
    className="w-3 h-3 rounded-full flex-shrink-0 relative group"
    style={{ background: color }}
  >
    <span
      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-black/50 font-bold transition-opacity duration-100 select-none"
      style={{ fontSize: '7px', lineHeight: 1 }}
    >
      {symbol}
    </span>
  </button>
);

const WindowInner = ({
  id,
  children,
  defaultWidth,
  defaultHeight,
  isMinimizing,
}: Required<MacWindowProps> & { isMinimizing: boolean }) => {
  const win = useWindowManager((s) => s.windows[id]);
  const focusedWindowId = useWindowManager((s) => s.focusedWindowId);
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } = useWindowManager();

  // Motion values own the position — no re-render snap on drag end
  const x = useMotionValue(win.position.x);
  const y = useMotionValue(win.position.y);

  // Local size state for real-time resize feedback
  const [size, setSize] = useState({ w: defaultWidth as number, h: defaultHeight as number });

  // Sync motion values only when window is first opened (position reset)
  const lastOpenKey = useRef('');
  useEffect(() => {
    const key = `${id}-${win.isOpen}`;
    if (key !== lastOpenKey.current) {
      lastOpenKey.current = key;
      x.set(win.position.x);
      y.set(win.position.y);
      setSize({ w: defaultWidth as number, h: defaultHeight as number });
    }
  }, [win.isOpen]);

  // Resize state stored in ref (no re-render on each mouse move)
  const resizing = useRef<{
    dir: string;
    sx: number; sy: number;   // start mouse coords
    sw: number; sh: number;   // start size
    spx: number; spy: number; // start position (motion values)
  } | null>(null);

  const startResize = (e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    e.stopPropagation(); // prevent drag from starting
    focusWindow(id);
    resizing.current = {
      dir,
      sx: e.clientX,
      sy: e.clientY,
      sw: size.w,
      sh: size.h,
      spx: x.get(),
      spy: y.get(),
    };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = resizing.current;
      if (!r) return;

      const dx = e.clientX - r.sx;
      const dy = e.clientY - r.sy;

      let nw = r.sw;
      let nh = r.sh;
      let nx = r.spx;
      let ny = r.spy;

      if (r.dir.includes('e')) nw = Math.max(MIN_W, r.sw + dx);
      if (r.dir.includes('s')) nh = Math.max(MIN_H, r.sh + dy);
      if (r.dir.includes('w')) {
        nw = Math.max(MIN_W, r.sw - dx);
        nx = r.spx + (r.sw - nw);
      }
      if (r.dir.includes('n')) {
        nh = Math.max(MIN_H, r.sh - dy);
        ny = r.spy + (r.sh - nh);
      }

      setSize({ w: nw, h: nh });
      x.set(nx);
      y.set(ny);
    };

    const onUp = () => {
      if (!resizing.current) return;
      updatePosition(id, { x: x.get(), y: y.get() });
      resizing.current = null;
      // Restore cursor/select
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []); // stable — uses refs

  const isFocused = focusedWindowId === id;
  const width  = win.isMaximized ? '100vw'                    : size.w;
  const height = win.isMaximized ? 'calc(100vh - 28px - 72px)' : size.h;

  return (
    <motion.div
      key={id}
      initial={{ scale: 0.88, opacity: 0, y: 24 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={
        isMinimizing
          ? {
              scaleX: 0.15,
              scaleY: 0.05,
              y: 'calc(100vh - 60px)',
              opacity: 0,
              originX: 0.5,
              originY: 1,
              transition: { duration: 0.38, ease: [0.6, 0, 0.8, 0] },
            }
          : {
              scale: 0.88,
              opacity: 0,
              y: 12,
              transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
            }
      }
      transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.9 }}
      drag={!win.isMaximized && !resizing.current}
      dragMomentum={false}
      dragElastic={0}
      style={{
        x: win.isMaximized ? 0 : x,
        y: win.isMaximized ? 0 : y,
        position: 'absolute',
        left: 0,
        top: 0,
        width,
        height,
        zIndex: win.zIndex,
      }}
      onDragEnd={() => updatePosition(id, { x: x.get(), y: y.get() })}
      onMouseDown={() => focusWindow(id)}
      className="flex flex-col overflow-hidden rounded-[10px]"
    >
      {/* Shadow + ring */}
      <div
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{
          boxShadow: isFocused
            ? '0 24px 64px rgba(0,0,0,0.75), 0 0 0 0.5px rgba(255,255,255,0.1)'
            : '0 10px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.05)',
          transition: 'box-shadow 0.25s ease',
        }}
      />

      {/* ── Resize handles (invisible, z-20 so they sit above content) ── */}
      {!win.isMaximized && RESIZE_HANDLES.map(({ dir, cls, cursor }) => (
        <div
          key={dir}
          className={`absolute z-20 ${cls}`}
          style={{ cursor }}
          onMouseDown={(e) => {
            // Lock cursor + disable text select for the duration
            document.body.style.cursor = cursor;
            document.body.style.userSelect = 'none';
            startResize(e, dir);
          }}
        />
      ))}

      {/* SE resize grip visual hint */}
      {!win.isMaximized && (
        <div className="absolute bottom-1.5 right-1.5 pointer-events-none z-30 opacity-25">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="9" y1="1" x2="1" y2="9" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="9" y1="5" x2="5" y2="9" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      {/* ── Title bar ── */}
      <div
        className="flex items-center px-3 h-[38px] flex-shrink-0 select-none"
        style={{
          background: isFocused ? 'rgba(40,32,26,0.98)' : 'rgba(28,22,18,0.98)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderBottom: '1px solid rgba(255,200,150,0.07)',
          cursor: 'grab',
          transition: 'background 0.2s ease',
        }}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div className="flex items-center gap-2 mr-4">
          <TrafficLight color="#FF5F57" symbol="✕" onClick={(e) => { e.stopPropagation(); closeWindow(id); }} />
          <TrafficLight color="#FFBD2E" symbol="−" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} />
          <TrafficLight color="#27C93F" symbol="+" onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} />
        </div>

        <span
          className="flex-1 text-center text-[12px] font-medium truncate"
          style={{
            color: isFocused ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)',
            transition: 'color 0.2s ease',
            letterSpacing: '-0.01em',
          }}
        >
          {win.title}
        </span>

        {/* Size indicator shown while resizing */}
        <div
          className="w-[52px] text-right text-[9px] tabular-nums transition-opacity duration-150"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          {size.w}×{size.h}
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="flex-1 overflow-hidden"
        style={{ background: 'rgba(14,10,8,0.98)', cursor: 'default' }}
      >
        <div className="h-full overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const MacWindow = ({ id, children, defaultWidth = 700, defaultHeight = 520 }: MacWindowProps) => {
  const win = useWindowManager((s) => s.windows[id]);
  const isVisible = win?.isOpen && !win?.isMinimized;
  const isMinimizing = !!(win?.isOpen && win?.isMinimized);

  return (
    <AnimatePresence custom={isMinimizing}>
      {isVisible && (
        <WindowInner
          key={id}
          id={id}
          defaultWidth={defaultWidth}
          defaultHeight={defaultHeight}
          isMinimizing={isMinimizing}
        >
          {children}
        </WindowInner>
      )}
    </AnimatePresence>
  );
};
