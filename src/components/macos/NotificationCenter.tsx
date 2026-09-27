import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNotifications, type NotifType } from '../../store/notifications';

const TYPE_STYLES: Record<NotifType, { bar: string; glow: string }> = {
  info:    { bar: '#007AFF', glow: 'rgba(0,122,255,0.25)' },
  success: { bar: '#30D158', glow: 'rgba(48,209,88,0.25)' },
  warning: { bar: '#FF9F0A', glow: 'rgba(255,159,10,0.25)' },
  error:   { bar: '#FF453A', glow: 'rgba(255,69,58,0.25)'  },
};

export const NotificationCenter = () => {
  const { queue, dismiss } = useNotifications();

  return (
    <div className="fixed top-8 right-4 z-[2000] flex flex-col gap-2 pointer-events-none" style={{ width: 320 }}>
      <AnimatePresence initial={false}>
        {queue.map((n) => {
          const style = TYPE_STYLES[n.type];
          return (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              animate={{ opacity: 1, x: 0,  scale: 1    }}
              exit={{    opacity: 0, x: 60, scale: 0.92, transition: { duration: 0.22 } }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="pointer-events-auto relative overflow-hidden rounded-[14px] flex items-start gap-3 px-4 py-3"
              style={{
                background: 'rgba(32,32,42,0.92)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 30px ${style.glow}`,
              }}
            >
              {/* Colored top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: style.bar }}
              />

              {/* Icon / emoji */}
              <div className="text-xl mt-0.5 flex-shrink-0 leading-none select-none">
                {n.icon ?? (n.type === 'success' ? '✅' : n.type === 'error' ? '❌' : n.type === 'warning' ? '⚠️' : 'ℹ️')}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white leading-tight">{n.title}</p>
                {n.body && (
                  <p className="text-[12px] text-white/50 mt-0.5 leading-snug">{n.body}</p>
                )}
              </div>

              {/* Dismiss */}
              <button
                onClick={() => dismiss(n.id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white/70"
              >
                <X size={12} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
