import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onDone: () => void;
}

export const BootScreen = ({ onDone }: Props) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'fade'>('boot');

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { target: 30,  delay: 200,  speed: 18 },
      { target: 65,  delay: 0,    speed: 12 },
      { target: 85,  delay: 150,  speed: 20 },
      { target: 100, delay: 0,    speed: 14 },
    ];

    let current = 0;
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= steps.length) {
        setTimeout(() => setPhase('fade'), 300);
        setTimeout(onDone, 900);
        return;
      }
      const step = steps[stepIndex];
      setTimeout(() => {
        const interval = setInterval(() => {
          current += 1;
          setProgress(current);
          if (current >= step.target) {
            clearInterval(interval);
            stepIndex++;
            runStep();
          }
        }, step.speed);
      }, step.delay);
    };

    runStep();
  }, []);

  return (
    <AnimatePresence>
      {phase === 'boot' && (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#000' }}
        >
          {/* Apple logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16 select-none"
            style={{ fontSize: 88, lineHeight: 1, filter: 'brightness(0) invert(1)' }}
          >

          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative"
            style={{ width: 200 }}
          >
            {/* Track */}
            <div
              className="w-full rounded-full overflow-hidden"
              style={{
                height: 4,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'rgba(255,255,255,0.85)',
                  transition: 'width 0.06s linear',
                }}
              />
            </div>
          </motion.div>

          {/* Version text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-8 text-white text-[11px] tracking-widest uppercase font-medium select-none"
          >
            Arsal's Portfolio — macOS Edition
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
