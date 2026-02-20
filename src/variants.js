export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      opacity: 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: 0.98,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        delay: delay,
      },
    },
  };
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = (delay = 0) => ({
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      delay,
    },
  },
});

export const slideIn = (direction, delay = 0) => ({
  hidden: {
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 22,
      delay,
    },
  },
});
