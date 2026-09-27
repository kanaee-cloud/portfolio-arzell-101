import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, User, Download, MapPin, Calendar } from 'lucide-react';
import { jobs, education } from '../../data/experience';
import type { Job } from '../../types';

type Tab = 'overview' | 'experience' | 'education';

const ROLE_COLORS = ['#007AFF', '#FF9F0A', '#30D158', '#BF5AF2'];

const TimelineCard = ({ item, index }: { item: Job; index: number }) => {
  const color = ROLE_COLORS[index % ROLE_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className="flex gap-4 group"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 ring-2 transition-all duration-200"
          style={{ boxShadow: `0 0 0 2px ${color}40` }}
        >
          <img src={item.img} alt={item.company} className="w-full h-full object-cover" />
        </div>
        <div className="w-px flex-1 mt-2 mb-0" style={{ background: 'rgba(255,255,255,0.06)', minHeight: 24 }} />
      </div>

      {/* Content */}
      <div
        className="flex-1 rounded-xl p-4 mb-3 transition-all duration-200 group-hover:scale-[1.01]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1px] rounded-t-xl"
          style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }}
        />
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-[13px] font-semibold text-white leading-tight">{item.name}</h4>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{ background: `${color}18`, color }}
          >
            {item.role}
          </span>
        </div>
        <p className="text-[12px] font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {item.company}
        </p>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span className="flex items-center gap-1"><MapPin size={10} />{item.place}</span>
          <span className="flex items-center gap-1"><Calendar size={10} />{item.periode}</span>
        </div>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 mt-2.5">
          {item.frameworks.map((fw, i) => (
            <span
              key={i}
              className="text-[10px] px-1.5 py-0.5 rounded-md"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}
            >
              {fw}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const AboutWindow = () => {
  const [tab, setTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'overview',   label: 'Overview',   icon: <User size={12} />,        color: '#007AFF' },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={12} />,   color: '#FF9F0A' },
    { id: 'education',  label: 'Education',  icon: <GraduationCap size={12}/>, color: '#30D158' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Profile header */}
      <div
        className="relative px-6 py-6 flex-shrink-0 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(175,82,222,0.1) 0%, rgba(0,122,255,0.07) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* BG glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(175,82,222,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        <div className="flex items-center gap-5 relative">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src="https://github.com/kanaee-cloud.png"
              alt="Arsal"
              className="w-[72px] h-[72px] rounded-2xl object-cover"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.1)' }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#14141e]"
              style={{ background: '#30D158' }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[17px] font-bold text-white tracking-tight">M. Arsal Nawfal Ali</h2>
            <p className="text-[12px] mt-0.5" style={{ color: '#BF5AF2' }}>Full Stack & Mobile Developer</p>
            <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <span className="flex items-center gap-1"><MapPin size={10} />Bandung, ID</span>
              <span className="flex items-center gap-1"><Calendar size={10} />18 y/o</span>
            </div>
          </div>

          {/* CV button */}
          <a
            href="https://drive.google.com/file/d/1rSz-Iiu8jz3HZy4LT6EGjV22rVMjNNu4/view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white transition-all hover:brightness-110 flex-shrink-0"
            style={{ background: 'rgba(0,122,255,0.8)' }}
          >
            <Download size={11} /> CV
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-1 px-5 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150"
            style={{
              background: tab === t.id ? `${t.color}18` : 'transparent',
              color: tab === t.id ? t.color : 'rgba(255,255,255,0.4)',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div key="ov" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                My career trajectory begins as a Frontend Developer, utilizing proficiency in React, Vue.js, and
                Next.js to build innovative web applications. Proactively seeking professional development and
                contributing to significant projects across web, mobile, and research domains.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  { label: 'Age', value: '18 years', color: '#007AFF' },
                  { label: 'Location', value: 'Bandung, ID', color: '#BF5AF2' },
                  { label: 'Repositories', value: '45+', color: '#30D158' },
                  { label: 'GitHub', value: 'kanaee-cloud', color: '#FF9F0A' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl"
                    style={{
                      background: `${item.color}0c`,
                      border: `1px solid ${item.color}20`,
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-widest mb-1"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</div>
                    <div className="text-[13px] font-semibold" style={{ color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Skills preview */}
              <div className="text-[10px] uppercase tracking-widest mb-2.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Core Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Next.js', 'TypeScript', 'Flutter', 'Golang', 'Laravel', 'Node.js', 'Python', 'Tailwind CSS'].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'experience' && (
            <motion.div key="exp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <div className="space-y-0">
                {jobs.map((job, i) => (
                  <div key={i} className="relative">
                    <TimelineCard item={job} index={i} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'education' && (
            <motion.div key="edu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {education.map((ed, i) => (
                <div key={i} className="relative">
                  <TimelineCard item={ed} index={i} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
