import { Variants, Transition } from 'framer-motion';

// Define a type for our custom hover/tap effects
type AnimationEffect = {
  scale?: number;
  x?: number;
  y?: number;
  transition: Omit<Transition, 'type'> & {
    type?: 'spring' | 'tween' | 'inertia' | 'just' | 'keyframes' | 'decay';
  };
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 17 
    } 
  }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const hoverEffect: AnimationEffect = {
  scale: 1.05,
  transition: { 
    type: 'spring', 
    stiffness: 300,
    damping: 10
  }
};

export const tapEffect: AnimationEffect = {
  scale: 0.98,
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 15
  }
};
