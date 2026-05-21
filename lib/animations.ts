// lib/animations.ts

/**
 * Calculate stagger delay for nth item in a series.
 */
export const getStaggerDelay = (index: number, baseDelayMs: number = 80): number => {
  return baseDelayMs * index;
};

/**
 * Animation configuration constants matching design spec.
 */
export const ANIMATION_CONFIG = {
  duration: 400,
  easing: 'ease-out',
  staggerGap: 80,
  parallaxSpeed: 0.4,
  slideDistance: 16,
};

/**
 * Get CSS animation-delay value for an element.
 */
export const getAnimationDelay = (index: number): string => {
  const delayMs = getStaggerDelay(index, ANIMATION_CONFIG.staggerGap);
  return `${delayMs}ms`;
};

/**
 * Check if user prefers reduced motion.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
