export interface Project {
  name: string;
  description: string;
  url: string;
  periode: string;
  img: string;
  gallery: string[];
  frameworks: string[];
}

export interface Job {
  name: string;
  description: string;
  company: string;
  place: string;
  periode: string;
  role: string;
  img: string;
  frameworks: string[];
}

export interface Certificate {
  name: string;
  company: string;
  periode: string;
  img: string;
  description: string;
}

export interface Skill {
  name: string;
  url: string;
  color: string;
}

export interface SocialLink {
  name: string;
  url: string;
  color: string;
  bgColor: string;
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

export type WindowId = 'welcome' | 'about' | 'projects' | 'terminal' | 'certificates' | 'github' | 'contact' | 'chatbot';
