"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ─── Constants (module-level, never recreated) ────────────────────────────────

const WAVE_STYLES = `
  @keyframes glow-blue   { 0%, 100% { opacity: 0.85; } 33%  { opacity: 1; } }
  @keyframes glow-orange { 0%, 33%  { opacity: 0.85; } 66%  { opacity: 1; } 100% { opacity: 0.85; } }
  @keyframes glow-green  { 0%, 66%  { opacity: 0.85; } 100% { opacity: 1; } }
  .wave-blue   { animation: glow-blue   3s ease-in-out infinite; }
  .wave-orange { animation: glow-orange 3s ease-in-out infinite; }
  .wave-green  { animation: glow-green  3s ease-in-out infinite; }
`;

// All waves share one 1440×800 coordinate space so edges interlock perfectly.
const WAVES = [
  {
    cls: 'wave-blue',
    gradient: { id: 'wave-blue', stops: [
      { offset: '0%',   color: 'rgb(137,240,253)', opacity: 0.7 },
      { offset: '50%',  color: '#60a5fa',          opacity: 0.5 },
      { offset: '100%', color: '#ace5ff',           opacity: 0.7 },
    ]},
    d: 'M0,220 L48,240 C96,260 192,280 288,270 C384,260 480,220 576,210 C672,200 768,220 864,240 C960,260 1056,270 1152,260 C1248,250 1344,230 1392,220 L1440,215 L1440,0 L0,0 Z',
  },
  {
    cls: 'wave-orange',
    gradient: { id: 'wave-orange', stops: [
      { offset: '0%',   color: '#ff9143', opacity: 0.7 },
      { offset: '50%',  color: '#fb923c', opacity: 0.5 },
      { offset: '100%', color: '#ff7f39', opacity: 0.7 },
    ]},
    d: 'M0,220 L48,240 C96,260 192,280 288,270 C384,260 480,220 576,210 C672,200 768,220 864,240 C960,260 1056,270 1152,260 C1248,250 1344,230 1392,220 L1440,215 L1440,620 L1392,600 C1344,580 1248,560 1152,570 C1056,580 960,610 864,620 C768,630 672,620 576,600 C480,580 384,570 288,580 C192,590 96,610 48,620 L0,620 Z',
  },
  {
    cls: 'wave-green',
    gradient: { id: 'wave-green', stops: [
      { offset: '0%',   color: '#15803d', opacity: 0.7 },
      { offset: '50%',  color: '#22c55e', opacity: 0.5 },
      { offset: '100%', color: '#166534', opacity: 0.7 },
    ]},
    d: 'M0,620 L48,620 C96,610 192,590 288,580 C384,570 480,580 576,600 C672,620 768,630 864,620 C960,610 1056,580 1152,570 C1248,560 1344,580 1392,600 L1440,620 L1440,800 L0,800 Z',
  },
] as const;

const FLOATING_BLOBS = [
  { cls: 'absolute top-16 left-8 w-20 h-20 bg-blue-400/40',   animClass: 'animate-float', delay: '0.5s',  parallax: (y: number) => `translateY(${y * 0.12}px) translateX(${Math.sin(y * 0.003) * 15}px)` },
  { cls: 'absolute top-32 right-12 w-16 h-16 bg-orange-400/50', animClass: 'animate-bounce', delay: '1.2s', parallax: (y: number) => `translateY(${y * -0.08}px)` },
  { cls: 'absolute bottom-40 left-16 w-24 h-24 bg-green-500/30', animClass: 'animate-pulse', delay: '2s',   parallax: (y: number) => `translateY(${y * 0.06}px)` },
] as const;

const RIPPLES = [
  { cls: 'absolute top-1/4 left-1/4 w-32 h-32 border-blue-300/30',   delay: undefined },
  { cls: 'absolute top-3/4 right-1/4 w-40 h-40 border-orange-300/20', delay: '1s' },
  { cls: 'absolute bottom-1/4 left-1/2 w-28 h-28 border-green-300/40', delay: '2s' },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

const LogoSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-blue-400 via-orange-300 to-green-600 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <style>{WAVE_STYLES}</style>

        {/* Waves */}
        <div className="absolute inset-0">
          {WAVES.map(({ cls, gradient, d }) => (
            <svg key={cls} className={`${cls} absolute inset-0 w-full h-full`} viewBox="0 0 1440 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id={gradient.id} x1="0%" y1="0%" x2="100%" y2="0%">
                  {gradient.stops.map(s => (
                    <stop key={s.offset} offset={s.offset} style={{ stopColor: s.color, stopOpacity: s.opacity }} />
                  ))}
                </linearGradient>
              </defs>
              <path fill={`url(#${gradient.id})`} d={d} />
            </svg>
          ))}
        </div>

        {/* Floating blobs */}
        {FLOATING_BLOBS.map(({ cls, animClass, delay, parallax }) => (
          <div
            key={delay}
            className={`${cls} rounded-full ${animClass} blur-sm`}
            style={{ transform: parallax(scrollY), animationDelay: delay }}
          />
        ))}

        {/* Ripples */}
        {RIPPLES.map(({ cls, delay }) => (
          <div
            key={cls}
            className={`${cls} border-2 rounded-full animate-ping`}
            style={delay ? { animationDelay: delay } : undefined}
          />
        ))}

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59,130,246,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(249,115,22,0.3)  0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(34,197,94,0.3)   0%, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.03}px) scale(1.1)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-slide-down opacity-100' : 'opacity-0 -translate-y-10'
          }`}>
            <svg className="w-4 h-4 mr-2 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Logo &amp; Identitas Visual
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl mb-6 tracking-tight transition-all duration-1000 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
          }`}>
            DESAIN LOGO
          </h2>

          <p className={`text-lg sm:text-xl text-white/90 drop-shadow-lg max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
            isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
          }`} style={{ animationDelay: '0.3s' }}>
            Identitas visual yang menggambarkan keindahan dan filosofi Paliyan Menawan
          </p>
        </div>

        {/* Logo */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className={`relative transition-all duration-1000 ${
              isVisible ? 'animate-logo-entrance opacity-100' : 'opacity-0 scale-50'
            }`}>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/60 via-orange-400/60 to-green-500/60 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/40 via-orange-300/40 to-green-400/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />

              <div ref={logoRef} className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] group">
                <div className="absolute -inset-4 border-2 border-white/30 group-hover:border-white/70 rounded-full transition-all duration-500 group-hover:scale-110 animate-spin-slow" />
                <div className="relative w-full h-full bg-white rounded-full shadow-2xl p-6 sm:p-8 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo-kkn.png"
                      alt="Logo Paliyan Menawan"
                      fill
                      className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-orange-300 to-green-700 rounded-full opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LogoSection;