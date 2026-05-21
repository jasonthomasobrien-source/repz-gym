'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  animationType: 'fade-in' | 'slide-up';
  threshold?: number;
  className?: string;
  index?: number;
}

export function AnimationWrapper({
  children,
  animationType,
  threshold = 0.25,
  className = '',
  index,
}: AnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.setAttribute('data-animate', animationType);
          if (index !== undefined) {
            element.setAttribute('data-index', String(index));
          }
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [animationType, threshold, index]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
