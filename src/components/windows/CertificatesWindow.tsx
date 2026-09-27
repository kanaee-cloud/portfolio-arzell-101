import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Calendar, Building2 } from 'lucide-react';
import { certificates } from '../../data/certificates';

const CERT_COLORS = ['#007AFF', '#BF5AF2', '#30D158', '#FF9F0A', '#FF453A', '#64D2FF', '#FF375F'];

export const CertificatesWindow = () => {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1);

  const cert = certificates[selected];
  const accent = CERT_COLORS[selected % CERT_COLORS.length];

  const go = (dir: number) => {
    setDirection(dir);
    setSelected((s) => (s + dir + certificates.length) % certificates.length);
  };

  return (
    <div className="flex h-full">
      {/* Thumbnail sidebar */}
      <div
        className="w-44 flex-shrink-0 overflow-y-auto py-3 px-2 flex flex-col gap-1.5"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center gap-1.5 px-2 mb-2">
          <Award size={11} className="text-white/25" />
          <span className="text-[10px] text-white/25 uppercase tracking-widest font-medium">
            {certificates.length} certs
          </span>
        </div>
        {certificates.map((c, i) => {
          const color = CERT_COLORS[i % CERT_COLORS.length];
          const isActive = selected === i;
          return (
            <button
              key={i}
              onClick={() => { setDirection(i > selected ? 1 : -1); setSelected(i); }}
              className="rounded-xl overflow-hidden text-left transition-all duration-200 group"
              style={{
                border: isActive ? `1.5px solid ${color}` : '1.5px solid transparent',
                background: isActive ? `${color}0c` : 'transparent',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div className="relative">
                <img src={c.img} alt={c.name} className="w-full h-[68px] object-cover" />
                {/* Color accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                {isActive && (
                  <div className="absolute inset-0" style={{ background: `${color}15` }} />
                )}
              </div>
              <div className="px-2 py-1.5">
                <p className="text-[9px] leading-tight line-clamp-2" style={{ color: isActive ? color : 'rgba(255,255,255,0.45)' }}>
                  {c.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preview area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-1">
            <button
              onClick={() => go(-1)}
              className="p-1.5 rounded-lg transition-all hover:bg-white/10 active:scale-95"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => go(1)}
              className="p-1.5 rounded-lg transition-all hover:bg-white/10 active:scale-95"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center gap-1">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > selected ? 1 : -1); setSelected(i); }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: selected === i ? 16 : 5,
                  height: 5,
                  background: selected === i ? accent : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>

          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {selected + 1} / {certificates.length}
          </span>
        </div>

        {/* Image + info */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selected}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-5 flex flex-col items-center"
            >
              {/* Certificate image */}
              <div className="relative w-full max-w-md mb-5">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                  style={{ background: accent }}
                />
                <img
                  src={cert.img}
                  alt={cert.name}
                  className="relative w-full rounded-2xl object-contain"
                  style={{
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)`,
                  }}
                />
                {/* Colored accent border top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40)` }}
                />
              </div>

              {/* Info card */}
              <div
                className="w-full max-w-md rounded-2xl p-4"
                style={{
                  background: `${accent}08`,
                  border: `1px solid ${accent}20`,
                }}
              >
                {/* Title + link */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                  >
                    <Award size={16} style={{ color: accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-white leading-snug mb-0.5">{cert.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="flex items-center gap-1 text-[10px]"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        <Building2 size={10} />{cert.company}
                      </span>
                      <span className="text-white/15">·</span>
                      <span
                        className="flex items-center gap-1 text-[10px]"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        <Calendar size={10} />{cert.periode}
                      </span>
                    </div>
                  </div>
                </div>

                {cert.description && (
                  <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {cert.description}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
