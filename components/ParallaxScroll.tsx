'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

interface UseParallaxProps {
  speed?: number;
}

export function useParallax({ speed = 0.4 }: UseParallaxProps = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    };

    let rafId: number;
    const scheduleScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scheduleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.4,
  className = '',
}: ParallaxScrollProps) {
  const ref = useParallax({ speed });

  return (
    <div ref={ref} className={className} data-parallax>
      {children}
    </div>
  );
}
