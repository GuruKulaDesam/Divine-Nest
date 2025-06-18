import { animate, stagger, inView, spring, easeInOut } from 'motion';

// Common animation configurations
export const animations = {
  // Fade in animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: easeInOut }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easeInOut }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easeInOut }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: easeInOut }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: easeInOut }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: easeInOut }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: '0%' },
    transition: { duration: 0.3, ease: easeInOut }
  },
  
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: '0%' },
    transition: { duration: 0.3, ease: easeInOut }
  },
  
  // Spring animations
  springIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
  
  // Hover animations
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: easeInOut }
  },
  
  // Exit animations
  fadeOut: {
    animate: { opacity: 0 },
    transition: { duration: 0.2, ease: easeInOut }
  }
};

// Svelte actions for motion animations
export function motionInView(node, { animation = 'fadeIn', delay = 0 } = {}) {
  const config = animations[animation];
  if (!config) return;
  
  const observer = inView(node, () => {
    animate(node, config.animate, {
      ...config.transition,
      delay
    });
  });
  
  return {
    destroy() {
      observer?.();
    }
  };
}

export function motionHover(node) {
  const handleMouseEnter = () => {
    animate(node, { scale: 1.02 }, { duration: 0.2, ease: easeInOut });
  };
  
  const handleMouseLeave = () => {
    animate(node, { scale: 1 }, { duration: 0.2, ease: easeInOut });
  };
  
  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);
  
  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    }
  };
}

// Utility functions
export function animateElement(element, animation, options = {}) {
  if (!element) return;
  
  const config = animations[animation];
  if (!config) return;
  
  return animate(
    element,
    config.animate,
    { ...config.transition, ...options }
  );
}

export function animateInView(element, animation, options = {}) {
  if (!element) return;
  
  return inView(element, () => {
    animate(element, animations[animation].animate, {
      ...animations[animation].transition,
      ...options
    });
  });
}

export function staggerAnimate(elements, animation, options = {}) {
  if (!elements || elements.length === 0) return;
  
  const config = animations[animation];
  if (!config) return;
  
  return animate(
    elements,
    config.animate,
    {
      ...config.transition,
      delay: stagger(0.1),
      ...options
    }
  );
}

// Page transition animations
export const pageTransitions = {
  enter: (element) => {
    return animate(element, { opacity: [0, 1], y: [20, 0] }, { duration: 0.3, ease: easeInOut });
  },
  
  exit: (element) => {
    return animate(element, { opacity: [1, 0], y: [0, -20] }, { duration: 0.2, ease: easeInOut });
  }
};

// Sidebar animations
export const sidebarAnimations = {
  open: (element) => {
    return animate(element, { x: ['-100%', '0%'] }, { duration: 0.3, ease: easeInOut });
  },
  
  close: (element) => {
    return animate(element, { x: ['0%', '-100%'] }, { duration: 0.3, ease: easeInOut });
  }
};

// Dropdown animations
export const dropdownAnimations = {
  open: (element) => {
    return animate(element, 
      { opacity: [0, 1], scale: [0.95, 1], y: [-10, 0] }, 
      { duration: 0.2, ease: easeInOut }
    );
  },
  
  close: (element) => {
    return animate(element, 
      { opacity: [1, 0], scale: [1, 0.95], y: [0, -10] }, 
      { duration: 0.15, ease: easeInOut }
    );
  }
}; 