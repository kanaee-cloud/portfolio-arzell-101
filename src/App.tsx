import { useState, useEffect } from 'react';
import { BootScreen } from './components/macos/BootScreen';
import { MenuBar } from './components/macos/MenuBar';
import { Desktop } from './components/macos/Desktop';
import { Dock } from './components/macos/Dock';
import { Spotlight } from './components/macos/Spotlight';
import { ContextMenu, type ContextMenuState } from './components/macos/ContextMenu';
import { NotificationCenter } from './components/macos/NotificationCenter';
import { useNotifications } from './store/notifications';

const App = () => {
  const [booted, setBooted] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<ContextMenuState>({ x: 0, y: 0, open: false });
  const { push } = useNotifications();

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ⌘+Space or Ctrl+Space → Spotlight
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setSpotlight((s) => !s);
      }
      // Escape → close spotlight
      if (e.key === 'Escape') setSpotlight(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Welcome notification after boot
  const handleBooted = () => {
    setBooted(true);
    setTimeout(() => {
      push({ title: 'Welcome to Arsal\'s Portfolio', body: 'Click dock icons or use ⌘+Space to search', type: 'info', icon: '👋', duration: 5000 });
    }, 800);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY, open: true });
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden"
      style={{ background: 'transparent' }}
      onContextMenu={handleContextMenu}
    >
      {/* Boot screen — renders on top until done */}
      {!booted && <BootScreen onDone={handleBooted} />}

      {booted && (
        <>
          <MenuBar onSpotlight={() => setSpotlight(true)} />
          <Desktop />
          <Dock />

          <Spotlight open={spotlight} onClose={() => setSpotlight(false)} />

          <ContextMenu
            menu={ctxMenu}
            onClose={() => setCtxMenu((m) => ({ ...m, open: false }))}
            onSpotlight={() => setSpotlight(true)}
          />

          <NotificationCenter />
        </>
      )}
    </div>
  );
};

export default App;
