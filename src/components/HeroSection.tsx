"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// ─── Static data (outside component — never re-created) ──────────────────────

const HERO_IMAGES = [
  { src: 'https://bgfaopblkjzyvbqyoauk.supabase.co/storage/v1/object/public/assets/hero/serah.JPG', alt: 'Penyambutan Kapanewon', category: '' },
  { src: 'https://bgfaopblkjzyvbqyoauk.supabase.co/storage/v1/object/public/assets/hero/girls.jpg', alt: 'Diseminasi', category: '' },
  { src: 'https://bgfaopblkjzyvbqyoauk.supabase.co/storage/v1/object/public/assets/hero/us.JPG', alt: 'Rapat Perdana', category: '' },
] as const;

const IMAGE_COUNT = HERO_IMAGES.length;

// 12 columns; Tailwind hides extras below sm via grid-cols-8
const GRID_COLUMNS = Array.from({ length: 12 }, (_, i) => i);

const CORNER_DECORATIONS = [
  { pos: "top-4 left-4",     border: "4px 0 0 4px"   },
  { pos: "top-4 right-4",    border: "4px 4px 0 0"   },
  { pos: "bottom-4 left-4",  border: "0 0 4px 4px"   },
  { pos: "bottom-4 right-4", border: "0 4px 4px 0"   },
] as const;

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

const mod = (n: number, m: number) => ((n % m) + m) % m;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Dot-indicators shared by mobile and desktop slideshows */
const Dots = ({ count, active, onSelect }: { count: number; active: number; onSelect: (i: number) => void }) => (
  <div className="flex justify-center mt-4 gap-2">
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Slide ${i + 1}`}
        className={`h-2 rounded-full transition-all duration-300 hover:scale-110 ${
          i === active ? 'bg-blue-600 w-8 shadow-lg' : 'bg-gray-300 w-2 hover:bg-gray-400'
        }`}
      />
    ))}
  </div>
);

/** Expand icon shown on image hover */
const ExpandIcon = () => (
  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
    <div className="bg-white/90 rounded-full p-3 scale-0 group-hover:scale-100 transition-transform">
      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // null = closed; number = open at that index
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [scrollY,       setScrollY]      = useState(0);
  const [mouse,         setMouse]        = useState({ x: 0, y: 0 });
  const [isVisible,     setIsVisible]    = useState(false);

  const heroRef     = useRef<HTMLDivElement>(null);
  const rafScroll   = useRef(0);
  const rafMouse    = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // ── Auto-advance slideshow ────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCurrentIndex(p => mod(p + 1, IMAGE_COUNT)), 4000);
    return () => clearInterval(id);
  }, []);

  // ── Scroll + mousemove + IntersectionObserver (single effect) ────────────
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafScroll.current);
      rafScroll.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    const onMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafMouse.current);
      rafMouse.current = requestAnimationFrame(() =>
        setMouse({
          x: (e.clientX - window.innerWidth  / 2) * 0.01,
          y: (e.clientY - window.innerHeight / 2) * 0.01,
        })
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    window.addEventListener('scroll',    onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse,  { passive: true });

    return () => {
      cancelAnimationFrame(rafScroll.current);
      cancelAnimationFrame(rafMouse.current);
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('mousemove', onMouse);
      observer.disconnect();
    };
  }, []);

  // ── Keyboard nav (gallery only) ───────────────────────────────────────────
  useEffect(() => {
    if (galleryIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setGalleryIndex(p => p !== null ? mod(p - 1, IMAGE_COUNT) : p);
      if (e.key === 'ArrowRight') setGalleryIndex(p => p !== null ? mod(p + 1, IMAGE_COUNT) : p);
      if (e.key === 'Escape')     closeGallery();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryIndex]);

  // ── Gallery helpers ───────────────────────────────────────────────────────
  const openGallery = useCallback((index: number) => {
    setGalleryIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryIndex(null);
    document.body.style.overflow = '';
  }, []);

  // ── Touch swipe (slideshow) ───────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50)
      setCurrentIndex(p => mod(p + (dx > 0 ? 1 : -1), IMAGE_COUNT));
  }, []);

  // ── Misc ──────────────────────────────────────────────────────────────────
  const scrollToProfile = useCallback(() =>
    document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' }), []);

  const isGalleryOpen = galleryIndex !== null;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <section
        ref={heroRef}
        className="pt-16 sm:pt-20 lg:pt-4 relative w-full min-h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Animated background ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50">
          {/* Parallax blobs */}
          <div
            className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"
            style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 20 + scrollY * 0.1}px)` }}
          />
          <div
            className="absolute top-40 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
            style={{ transform: `translate(${mouse.x * -15}px, ${mouse.y * -15 + scrollY * -0.1}px)` }}
          />
          <div
            className="absolute bottom-20 left-20 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
            style={{ transform: `translate(${mouse.x * 25}px, ${mouse.y * 25 + scrollY * 0.05}px)` }}
          />

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-5" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
            <div className="grid grid-cols-8 sm:grid-cols-12 h-full">
              {GRID_COLUMNS.map(i => (
                <div key={i} className="border-r border-gray-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s`, animationDuration: '4s' }} />
              ))}
            </div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-4 sm:left-1/4">
            <div className="w-20 h-20 sm:w-32 sm:h-32 border-2 border-blue-300/20 animate-spin-slow"
              style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px) rotate(45deg)` }} />
          </div>
          <div className="absolute bottom-1/4 right-4 sm:right-1/4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 border-2 border-teal-300/20 animate-pulse"
              style={{ transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px) rotate(12deg)` }} />
          </div>

          {/* Mobile-only floaters */}
          <div className="absolute top-1/3 right-8 sm:hidden">
            <div className="w-6 h-6 bg-pink-300/40 rounded-full animate-float" />
          </div>
          <div className="absolute bottom-1/3 left-8 sm:hidden">
            <div className="w-8 h-8 bg-yellow-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="main-container">

          {/* ─ Left / text content ─ */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible ? 'animate-slide-down opacity-100' : 'opacity-0 -translate-y-10'
            }`}>
              <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              KKN-PPM UGM 2026
            </div>

            {/* Heading */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-1000 ${
                isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <span className="block animate-fade-in-word">Membangun</span>
              <span className="block animate-fade-in-word animation-delay-200">Desa</span>
              <span className="block text-blue-600 animate-fade-in-word animation-delay-400">Bersama Masyarakat</span>
              <span className="block text-teal-600 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-2 animate-fade-in-word animation-delay-600">
                Paliyan, Gunung Kidul
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`main-paragraph ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: '0.8s' }}>
              Program KKN-PPM Universitas Gadjah Mada di empat desa: Karangduwet, Grogol, Pampang, dan Mulusan.
              Bersama membangun pemberdayaan masyarakat melalui inovasi dan kolaborasi.
            </p>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
              isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
            }`} style={{ animationDelay: '1s' }}>
              <button onClick={scrollToProfile}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-102 hover:shadow-lg active:scale-95 flex items-center justify-center touch-manipulation">
                <span>Pelajari Program Kami</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button onClick={() => openGallery(0)}
                className="group border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center touch-manipulation">
                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Lihat Galeri
              </button>
            </div>

            {/* ─ Mobile image preview (hidden on lg+) ─ */}
            <div className="mt-8 lg:hidden">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="relative bg-white p-2 sm:p-3 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Slideshow */}
                    <div className="relative w-full h-48 sm:h-56 group">
                      {HERO_IMAGES.map((img, i) => (
                        <div key={i} className={`absolute inset-0 transition-all duration-1000 ${
                          i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}>
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            priority={i === 0}
                          />
                        </div>
                      ))}

                      {/* Clickable overlay to open gallery */}
                      <button
                        onClick={() => openGallery(currentIndex)}
                        aria-label="Buka galeri"
                        className="absolute inset-0 z-10 group"
                      >
                        <ExpandIcon />
                      </button>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 rounded-b-xl z-20 pointer-events-none">
                        <p className="text-white font-medium text-xs sm:text-sm">
                          {HERO_IMAGES[currentIndex].alt}
                        </p>
                      </div>
                    </div>

                    {/* Mobile dots */}
                    <Dots count={IMAGE_COUNT} active={currentIndex} onSelect={setCurrentIndex} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─ Right / desktop image frame ─ */}
          <div className="hidden lg:block flex-1 max-w-lg ml-12">
            <div className="relative group">
              {/* Glow */}
              <div
                className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 rounded-2xl blur-lg opacity-30 animate-gradient-shift group-hover:opacity-50 transition-opacity"
                style={{ transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)` }}
              />

              {/* Frame */}
              <div
                className="relative bg-white p-4 rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-102"
                style={{ transform: `rotate(2deg) translate(${mouse.x * 2}px, ${mouse.y * 2}px)` }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  {/* Overlay decorations */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/10" />
                    {CORNER_DECORATIONS.map((c, i) => (
                      <div key={i} className={`absolute ${c.pos} w-8 h-8 border-4 border-white/50 transition-all duration-300 group-hover:border-white/80 group-hover:scale-110`}
                        style={{ borderWidth: c.border, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>

                  {/* Slideshow + click-to-enlarge */}
                  <button
                    onClick={() => openGallery(currentIndex)}
                    aria-label="Buka galeri"
                    className="relative w-full h-80 overflow-hidden rounded-xl cursor-pointer group/img block"
                  >
                    {HERO_IMAGES.map((img, i) => (
                      <div key={i} className={`absolute inset-0 transition-all duration-1000 ${
                        i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}>
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover/img:scale-105"
                          priority={i === 0}
                          sizes="50vw"
                        />
                      </div>
                    ))}
                    <ExpandIcon />
                  </button>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform pointer-events-none">
                    <p className="text-white font-medium text-sm">{HERO_IMAGES[currentIndex].alt}</p>
                  </div>
                </div>

                {/* Desktop dots */}
                <Dots count={IMAGE_COUNT} active={currentIndex} onSelect={setCurrentIndex} />
              </div>

              {/* Floating decorative balls */}
              <div
                className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ transform: `translate(${mouse.x * 3}px, ${mouse.y * 3}px)` }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-400 rounded-full animate-pulse opacity-60 group-hover:opacity-80 transition-opacity"
                style={{ transform: `translate(${mouse.x * -2}px, ${mouse.y * -2}px)` }}
              />
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
        }`} style={{ animationDelay: '1.5s' }}>
          <div className="flex flex-col items-center text-gray-600">
            <span className="text-xs font-medium mb-2 animate-pulse">Scroll untuk melanjutkan</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery modal ── */}
      {isGalleryOpen && galleryIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeGallery}          // click backdrop to close
        >
          <div
            className="relative w-full max-w-4xl mx-auto"
            onClick={e => e.stopPropagation()}  // don't close when clicking content
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-lg sm:text-xl font-bold">{HERO_IMAGES[galleryIndex].category}</h3>
                  <p className="text-sm opacity-80">{galleryIndex + 1} / {IMAGE_COUNT}</p>
                </div>
                <button onClick={closeGallery} aria-label="Tutup galeri"
                  className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] rounded-lg overflow-hidden">
              <Image
                src={HERO_IMAGES[galleryIndex].src}
                alt={HERO_IMAGES[galleryIndex].alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            {/* Prev/Next */}
            <button onClick={() => setGalleryIndex(p => p !== null ? mod(p - 1, IMAGE_COUNT) : p)}
              aria-label="Sebelumnya"
              className="absolute inset-y-0 left-0 flex items-center ml-4 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full h-fit my-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => setGalleryIndex(p => p !== null ? mod(p + 1, IMAGE_COUNT) : p)}
              aria-label="Selanjutnya"
              className="absolute inset-y-0 right-0 flex items-center mr-4 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full h-fit my-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Footer + thumbnails */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <p className="text-white text-sm sm:text-base mb-4">{HERO_IMAGES[galleryIndex].alt}</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {HERO_IMAGES.map((img, i) => (
                  <button key={i} onClick={() => setGalleryIndex(i)}
                    aria-label={img.alt}
                    className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === galleryIndex ? 'border-white scale-110' : 'border-white/30 hover:border-white/60 hover:scale-105'
                    }`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile swipe hint */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs sm:hidden animate-pulse">
              Swipe atau gunakan tombol untuk navigasi
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;