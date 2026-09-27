import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  SiReact, SiNextdotjs, SiLaravel, SiVuedotjs, SiTailwindcss,
  SiTypescript, SiJavascript, SiMongodb, SiNodedotjs, SiExpress,
  SiVite, SiFirebase, SiPython, SiGo, SiFlutter,
  SiPostgresql, SiMysql, SiNestjs,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { stats, skills } from '../../data/skills';
import { useWindowManager } from '../../store/windowManager';

const SKILL_ICONS: Record<string, IconType> = {
  'React':      SiReact,
  'Next.js':    SiNextdotjs,
  'Laravel':    SiLaravel,
  'Vue.js':     SiVuedotjs,
  'Tailwind':   SiTailwindcss,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'MongoDB':    SiMongodb,
  'Node.js':    SiNodedotjs,
  'Express':    SiExpress,
  'Vite':       SiVite,
  'Firebase':   SiFirebase,
  'Python':     SiPython,
  'Golang':     SiGo,
  'Flutter':    SiFlutter,
  'PostgreSQL': SiPostgresql,
  'MySQL':      SiMysql,
  'NestJS':     SiNestjs,
};

const carouselItems = [...skills, ...skills];

const STAT_COLORS = ['#007AFF', '#BF5AF2', '#30D158'];

export const WelcomeWindow = () => {
  const { openWindow } = useWindowManager();

  return (
    <div className="h-full overflow-y-auto">
      {/* ── Hero gradient header ── */}
      <div
        className="relative flex-shrink-0 px-8 pt-8 pb-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,122,255,0.12) 0%, rgba(175,82,222,0.10) 50%, rgba(48,209,88,0.06) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Glow orbs */}
        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,122,255,0.2) 0%, transparent 70%)', filter: 'blur(24px)' }} />
        <div className="absolute -bottom-4 right-12 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(175,82,222,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#30D158' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#30D158' }} />
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase"
              style={{ color: '#30D158' }}>
              Available for opportunities
            </span>
          </div>

          <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight mb-1">
            Hi, I'm{' '}
            <span style={{
              background: 'linear-gradient(90deg, #007AFF, #BF5AF2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              M. Arsal Nawfal Ali
            </span>
            {' '}👋
          </h1>

          <p className="text-[13px] leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Full Stack & Mobile Developer from Bandung. Building modern web apps with React, Vue.js,
            Next.js, Flutter, and Golang. Currently working on IoT & AI security research.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => openWindow('projects')}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #007AFF, #5E5CE6)' }}
            >
              View Projects
            </button>
            <button
              onClick={() => openWindow('contact')}
              className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all hover:bg-white/10 active:scale-95"
              style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Stats ── */}
      <div className="px-6 py-5 flex-shrink-0">
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 text-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${STAT_COLORS[i]}14 0%, ${STAT_COLORS[i]}08 100%)`,
                border: `1px solid ${STAT_COLORS[i]}22`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${STAT_COLORS[i]}60, transparent)` }}
              />
              <div className="text-[26px] font-bold tabular-nums" style={{ color: STAT_COLORS[i] }}>
                <CountUp start={0} end={stat.value} duration={2.2} />
                <span style={{ color: `${STAT_COLORS[i]}cc`, fontSize: '18px' }}>{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest mt-1"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Tech carousel ── */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="text-[10px] tracking-widest uppercase font-medium"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            Tech Stack
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="carousel-wrapper">
            <div className="carousel-track">
              {carouselItems.map((fw, i) => (
                <a
                  key={i}
                  href={fw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-item group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${fw.color}18`, border: `1px solid ${fw.color}25` }}
                  >
                    {(() => {
                      const Icon = SKILL_ICONS[fw.name];
                      return Icon
                        ? <Icon size={20} style={{ color: fw.color }} />
                        : <span className="text-[11px] font-bold" style={{ color: fw.color }}>{fw.name.slice(0, 2).toUpperCase()}</span>;
                    })()}
                  </div>
                  <span className="text-[10px] font-medium whitespace-nowrap"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {fw.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
