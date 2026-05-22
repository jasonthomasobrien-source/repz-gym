'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

interface CountUpStatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function CountUpStat({ value, prefix = '', suffix = '', duration = 1500 }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          if (prefersReducedMotion()) {
            setDisplayValue(value);
            return;
          }

          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setDisplayValue(Math.floor(value * progress));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(element);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [value, duration]);

  const formatted = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div ref={ref} className="text-3xl font-bold text-brand">
      {prefix}
      {formatted}
      {suffix}
    </div>
  );
}
