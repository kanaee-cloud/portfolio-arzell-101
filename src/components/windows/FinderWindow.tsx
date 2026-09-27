import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, ExternalLink, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

const ACCENT_COLORS = ['#007AFF','#BF5AF2','#30D158','#FF9F0A','#FF453A','#64D2FF','#FF375F','#FFD60A'];

const TagBadge = ({ name, accent }: { name: string; accent?: string }) => (
  <span
    className="text-[10px] px-2 py-0.5 rounded-md font-medium"
    style={{
      background: accent ? `${accent}18` : 'rgba(255,255,255,0.07)',
      color: accent ?? 'rgba(255,255,255,0.5)',
      border: `1px solid ${accent ? `${accent}30` : 'rgba(255,255,255,0.08)'}`,
    }}
  >
    {name}
  </span>
);

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-36">
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay always */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to top, rgba(14,14,22,0.85) 0%, rgba(14,14,22,0.1) 60%, transparent 100%)`
        }} />
        {/* Colored top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />

        {/* Year badge */}
        <span
          className="absolute top-2.5 left-2.5 text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${accent}25`, color: accent, backdropFilter: 'blur(8px)', border: `1px solid ${accent}40` }}
        >
          {project.periode}
        </span>

        {/* External link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <ExternalLink size={11} className="text-white" />
        </a>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-[13px] font-semibold text-white mb-1.5 truncate group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <p className="text-[11px] leading-relaxed line-clamp-2 mb-2.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.frameworks.slice(0, 3).map((fw, i) => (
            <TagBadge key={i} name={fw} accent={i === 0 ? accent : undefined} />
          ))}
          {project.frameworks.length > 3 && (
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              +{project.frameworks.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectListRow = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.04] group"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
        <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-medium text-white truncate group-hover:text-white">{project.name}</h4>
        <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{project.description}</p>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <TagBadge name={project.frameworks[0]} accent={accent} />
      </div>
      <span className="text-[10px] flex-shrink-0 ml-1" style={{ color: 'rgba(255,255,255,0.2)' }}>{project.periode}</span>
    </div>
  );
};

const DETAIL_MIN = 200;
const DETAIL_MAX = 480;
const DETAIL_DEFAULT = 256;

export const FinderWindow = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [detailWidth, setDetailWidth] = useState(DETAIL_DEFAULT);
  const dragRef = useRef<{ startX: number; startW: number } | null>(null);

  // Reset gallery index when selection changes
  useEffect(() => { setGalleryIdx(0); }, [selected?.name]);

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { startX: e.clientX, startW: detailWidth };
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  }, [detailWidth]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      // dragging left edge → moving mouse left = wider panel
      const dx = dragRef.current.startX - e.clientX;
      const newW = Math.min(DETAIL_MAX, Math.max(DETAIL_MIN, dragRef.current.startW + dx));
      setDetailWidth(newW);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const years = ['All', '2026', '2025', '2024', '2023'];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.periode.includes(filter));

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-36 flex-shrink-0 p-3"
        style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="text-[10px] uppercase tracking-widest font-medium px-2 mb-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Filter by Year
        </p>
        {years.map((y) => {
          const count = y === 'All' ? projects.length : projects.filter(p => p.periode.includes(y)).length;
          return (
            <button
              key={y}
              onClick={() => setFilter(y)}
              className="w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg text-[12px] transition-all duration-150 mb-0.5"
              style={{
                background: filter === y ? 'rgba(0,122,255,0.15)' : 'transparent',
                color: filter === y ? '#007AFF' : 'rgba(255,255,255,0.45)',
              }}
            >
              <span>{y}</span>
              <span className="text-[10px]" style={{ color: filter === y ? '#007AFF80' : 'rgba(255,255,255,0.2)' }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {filtered.length} projects
          </span>
          <div className="flex items-center gap-1">
            {[{ v: 'grid', Icon: Grid }, { v: 'list', Icon: List }].map(({ v, Icon }) => (
              <button
                key={v}
                onClick={() => setView(v as any)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: view === v ? '#007AFF' : 'rgba(255,255,255,0.3)' }}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {view === 'grid' ? (
            <div className="p-4 grid grid-cols-2 gap-3">
              {filtered.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} onClick={() => setSelected(p)} />
              ))}
            </div>
          ) : (
            <div>
              {filtered.map((p, i) => (
                <ProjectListRow key={p.name} project={p} index={i} onClick={() => setSelected(p)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (() => {
          const accent = ACCENT_COLORS[projects.indexOf(selected) % ACCENT_COLORS.length];
          const gallery = selected.gallery?.length ? selected.gallery : [selected.img];
          const prevImg = () => setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length);
          const nextImg = () => setGalleryIdx((i) => (i + 1) % gallery.length);
          return (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-shrink-0 overflow-y-auto flex flex-col relative"
              style={{ width: detailWidth, borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
            >
              {/* ── Resize handle on left edge ── */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[4px] z-10 group"
                style={{ cursor: 'ew-resize' }}
                onMouseDown={onResizeStart}
              >
                {/* Visual feedback strip */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-150 group-hover:w-[3px]"
                  style={{ background: 'rgba(0,122,255,0)', }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,122,255,0.5)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,122,255,0)'; }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Detail
                </span>
                <button onClick={() => setSelected(null)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors">
                  <X size={11} className="text-white/40" />
                </button>
              </div>

              <div className="p-3 space-y-3">
                {/* Gallery viewer */}
                <div className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={galleryIdx}
                      src={gallery[galleryIdx]}
                      alt={`${selected.name} ${galleryIdx + 1}`}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />

                  {/* Nav arrows — only if more than 1 image */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImg}
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
                      >
                        <ChevronLeft size={12} className="text-white" />
                      </button>
                      <button
                        onClick={nextImg}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
                      >
                        <ChevronRight size={12} className="text-white" />
                      </button>
                      {/* Dot indicators */}
                      <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setGalleryIdx(i)}
                            className="rounded-full transition-all duration-200"
                            style={{
                              width: galleryIdx === i ? 12 : 4,
                              height: 4,
                              background: galleryIdx === i ? accent : 'rgba(255,255,255,0.4)',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {gallery.length > 1 && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIdx(i)}
                        className="flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-150"
                        style={{
                          border: galleryIdx === i ? `1.5px solid ${accent}` : '1.5px solid rgba(255,255,255,0.08)',
                          opacity: galleryIdx === i ? 1 : 0.55,
                        }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Info */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-[13px] font-semibold text-white leading-tight flex-1">{selected.name}</h4>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Calendar size={9} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{selected.periode}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    {selected.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <div className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selected.frameworks.map((fw, i) => (
                      <TagBadge key={i} name={fw} accent={i === 0 ? accent : undefined} />
                    ))}
                  </div>
                </div>

                {/* Open button */}
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-[12px] font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${accent}, #5E5CE6)` }}
                >
                  <ExternalLink size={11} /> Open Project
                </a>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
