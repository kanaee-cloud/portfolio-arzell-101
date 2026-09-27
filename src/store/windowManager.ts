import { create } from 'zustand';
import type { WindowId, WindowState } from '../types';

interface WindowManagerState {
  windows: Record<WindowId, WindowState>;
  zIndexCounter: number;
  focusedWindowId: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
}

const DEFAULT_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  welcome: { x: 60, y: 60 },
  about: { x: 80, y: 70 },
  projects: { x: 100, y: 50 },
  terminal: { x: 120, y: 80 },
  certificates: { x: 140, y: 60 },
  github: { x: 160, y: 70 },
  contact: { x: 90, y: 90 },
  chatbot: { x: 200, y: 60 },
};

const WINDOW_TITLES: Record<WindowId, string> = {
  welcome: 'Home — Arsal Nawfal',
  about: 'About Me',
  projects: 'Projects — Finder',
  terminal: 'Terminal — Skills',
  certificates: 'Certificates — Preview',
  github: 'GitHub',
  contact: 'Contact — Mail',
  chatbot: 'Ayasaka Meido — Messages',
};

function createInitialWindows(): Record<WindowId, WindowState> {
  const ids: WindowId[] = ['welcome', 'about', 'projects', 'terminal', 'certificates', 'github', 'contact', 'chatbot'];
  const result = {} as Record<WindowId, WindowState>;
  ids.forEach((id, i) => {
    result[id] = {
      id,
      title: WINDOW_TITLES[id],
      isOpen: id === 'welcome',
      isMinimized: false,
      isMaximized: false,
      position: DEFAULT_POSITIONS[id],
      zIndex: id === 'welcome' ? 10 : 1,
    };
  });
  return result;
}

export const useWindowManager = create<WindowManagerState>((set, get) => ({
  windows: createInitialWindows(),
  zIndexCounter: 10,
  focusedWindowId: 'welcome',

  openWindow: (id) => {
    const { zIndexCounter } = get();
    const nextZ = zIndexCounter + 1;
    set((state) => ({
      zIndexCounter: nextZ,
      focusedWindowId: id,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      },
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false, isMinimized: false },
      },
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMaximized: !state.windows[id].isMaximized,
          isMinimized: false,
        },
      },
    }));
  },

  focusWindow: (id) => {
    const { zIndexCounter, windows } = get();
    if (windows[id].zIndex === zIndexCounter) return;
    const nextZ = zIndexCounter + 1;
    set((state) => ({
      zIndexCounter: nextZ,
      focusedWindowId: id,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: nextZ },
      },
    }));
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    }));
  },
}));
