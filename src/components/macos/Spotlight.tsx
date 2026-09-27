import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderOpen, User, Terminal, Award, Github, Mail, MessageCircle, Home, ArrowRight } from 'lucide-react';
import { useWindowManager } from '../../store/windowManager';
import { useNotifications } from '../../store/notifications';
import { projects } from '../../data/projects';
import { skills } from '../../data/skills';
import type { WindowId } from '../../types';

interface SpotlightResult {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  accent: string;
  action: () => void;
}

const WINDOW_META: Record<WindowId, { label: string; icon: React.ReactNode; accent: string }> = {
  welcome:      { label: 'Home',         icon: <Home size={16} />,          accent: '#007AFF' },
  about:        { label: 'About Me',     icon: <User size={16} />,          accent: '#BF5AF2' },
  projects:     { label: 'Projects',     icon: <FolderOpen size={16} />,    accent: '#FF9F0A' },
  terminal:     { label: 'Terminal',     icon: <Terminal size={16} />,      accent: '#64D2FF' },
  certificates: { label: 'Certificates', icon: <Award size={16} />,         accent: '#FF9F0A' },
  github:       { label: 'GitHub',       icon: <Github size={16} />,        accent: '#ffffff' },
  contact:      { label: 'Mail',         icon: <Mail size={16} />,          accent: '#30D158' },
  chatbot:      { label: 'AI Chat',      icon: <MessageCircle size={16} />, accent: '#5E5CE6' },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Spotlight = ({ open, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindowManager();
  const { push } = useNotifications();

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  const results = useMemo<SpotlightResult[]>(() => {
    const q = query.trim().toLowerCase();

    // Window shortcuts (always shown when empty or matching)
    const windowResults: SpotlightResult[] = (Object.entries(WINDOW_META) as [WindowId, typeof WINDOW_META[WindowId]][])
      .filter(([, m]) => !q || m.label.toLowerCase().includes(q))
      .map(([id, m]) => ({
        id: `win-${id}`,
        label: m.label,
        sublabel: 'Open window',
        icon: m.icon,
        accent: m.accent,
        action: () => { openWindow(id); onClose(); push({ title: `Opened ${m.label}`, type: 'info', icon: '🪟', duration: 2500 }); },
      }));

    if (!q) return windowResults;

    // Projects
    const projectResults: SpotlightResult[] = projects
      .filter((p) => p.name.toLowerCase().includes(q) || p.frameworks.some((f) => f.toLowerCase().includes(q)))
      .slice(0, 3)
      .map((p) => ({
        id: `proj-${p.name}`,
        label: p.name,
        sublabel: p.frameworks.slice(0, 3).join(' · '),
        icon: <FolderOpen size={16} />,
        accent: '#FF9F0A',
        action: () => { openWindow('projects'); onClose(); },
      }));

    // Skills
    const skillResults: SpotlightResult[] = skills
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((s) => ({
        id: `skill-${s.name}`,
        label: s.name,
        sublabel: 'Open Terminal → skills',
        icon: <Terminal size={16} />,
        accent: '#64D2FF',
        action: () => { openWindow('terminal'); onClose(); },
      }));

    return [...windowResults, ...projectResults, ...skillResults];
  }, [query]);

  // Clamp selection
  useEffect(() => {
    setSelectedIdx((i) => Math.min(i, Math.max(results.length - 1, 0)));
  }, [results.length]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[selectedIdx]) results[selectedIdx].action();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[3000]"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed z-[3001] left-1/2 overflow-hidden"
            style={{
              top: '18%',
              transform: 'translateX(-50%)',
              width: 620,
              background: 'rgba(28,28,38,0.85)',
              backdropFilter: 'blur(50px) saturate(200%)',
              WebkitBackdropFilter: 'blur(50px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 18,
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: results.length ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
            >
              <Search size={18} className="text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
                onKeyDown={handleKey}
                placeholder="Spotlight Search…"
                className="flex-1 bg-transparent text-[17px] text-white placeholder-white/25 outline-none font-medium"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 text-[11px] px-2 py-0.5 rounded-md border border-white/10">
                  esc
                </button>
              )}
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="py-2 max-h-[360px] overflow-y-auto">
                {results.map((r, i) => (
                  <button
                    key={r.id}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100"
                    style={{
                      background: i === selectedIdx ? 'rgba(255,255,255,0.08)' : 'transparent',
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                    onClick={r.action}
                  >
                    {/* Icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${r.accent}20`, color: r.accent }}
                    >
                      {r.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-white truncate">{r.label}</p>
                      {r.sublabel && (
                        <p className="text-[11px] text-white/40 truncate">{r.sublabel}</p>
                      )}
                    </div>

                    {i === selectedIdx && (
                      <ArrowRight size={14} className="text-white/30 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Empty */}
            {query && results.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-[13px] text-white/30">No results for "{query}"</p>
              </div>
            )}

            {/* Footer hint */}
            <div
              className="flex items-center justify-between px-5 py-2.5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center gap-3 text-[11px] text-white/25">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> open</span>
                <span><kbd className="font-mono">esc</kbd> close</span>
              </div>
              <span className="text-[11px] text-white/20">Spotlight</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
