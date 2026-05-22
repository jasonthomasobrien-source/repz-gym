'use client';

import { useState, useEffect } from 'react';

interface Slide {
  image: string;
  headline: string;
}

const slides: Slide[] = [
  {
    image: '/hero/Weights Photo by Tima Miroshnichenko.jpg',
    headline: 'OPEN 24/7 FOR MEMBERS',
  },
  {
    image: '/hero/Weights Photo by Luke Miller.jpg',
    headline: 'SHAPE YOUR BODY',
  },
  {
    image: '/hero/Weights Photo by Victor Freitas.jpg',
    headline: "PLAINWELL'S GYM",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Headline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 key={current} data-animate="fade-in" className="text-5xl md:text-7xl font-display font-bold uppercase text-white text-center px-6 drop-shadow-lg">
          {slides[current].headline}
        </h2>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current
                ? 'bg-brand w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
