import { create } from 'zustand';

export type NotifType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  body?: string;
  icon?: string;        // emoji or app name
  type: NotifType;
  duration?: number;    // ms, default 4000
}

interface NotifState {
  queue: Notification[];
  push: (n: Omit<Notification, 'id'>) => void;
  dismiss: (id: string) => void;
}

let counter = 0;

export const useNotifications = create<NotifState>((set) => ({
  queue: [],

  push: (n) => {
    const id = `notif-${++counter}`;
    const duration = n.duration ?? 4000;
    set((s) => ({ queue: [...s.queue, { ...n, id }] }));
    setTimeout(() => {
      set((s) => ({ queue: s.queue.filter((x) => x.id !== id) }));
    }, duration);
  },

  dismiss: (id) =>
    set((s) => ({ queue: s.queue.filter((x) => x.id !== id) })),
}));
