'use client';

import { Button } from '@/components/ui/Button';
import { ParallaxScroll } from '@/components/ParallaxScroll';

export function HeroVideo() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxScroll speed={0.4} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/weightlifting.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </ParallaxScroll>

      <div className="absolute inset-0 bg-black opacity-25" />

      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent to-black opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-right">
        <div>
          <div className="text-sm font-display tracking-widest text-brand uppercase mb-4" style={{ color: 'rgb(var(--brand))' }}>
            Shape Your Body
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-tight text-white uppercase font-black mb-6">
            Be <span style={{ color: 'rgb(var(--brand))' }}>Strong</span>. Train Hard.
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end">
            <Button size="lg" variant="primary" href="/pricing">
              Get Info
            </Button>
            <Button size="lg" variant="secondary" href="/classes">
              See the Schedule
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center py-4">
        <p className="text-white text-sm font-sans">
          ★ 4.8 · 107+ Google reviews · Locally Owned · Open 24/7 for Members
        </p>
      </div>
    </section>
  );
}
