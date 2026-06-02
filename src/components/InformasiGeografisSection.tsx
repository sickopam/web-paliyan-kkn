"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { fetchDesaWithAnggota } from '@/data/desa';
import type { DesaDataItem } from '@/data/desa';

interface DesaInfo {
  id:           number;
  nama:         string;
  deskripsi:    string;
  foto:         string;
  reverse:      boolean;
  color:        string;
  icon:         string;
  highlight:    string;
  koordinator:  string;
  jabatan:      string;
  anggotaCount: number;
  programCount: number;
  umkmCount:    number;
}

const COLOR_MAP: Record<string, Record<'primary' | 'secondary' | 'accent' | 'light', string>> = {
  blue:   { primary: 'bg-blue-500',   secondary: 'bg-blue-50',   accent: 'text-blue-600',   light: 'from-blue-400/20 to-blue-600/20'    },
  teal:   { primary: 'bg-teal-600',   secondary: 'bg-teal-50',   accent: 'text-teal-600',   light: 'from-teal-400/20 to-teal-600/20'    },
  yellow: { primary: 'bg-yellow-300', secondary: 'bg-yellow-50', accent: 'text-yellow-500', light: 'from-yellow-200/20 to-yellow-400/20' },
  purple: { primary: 'bg-purple-500', secondary: 'bg-purple-50', accent: 'text-purple-600', light: 'from-purple-400/20 to-purple-600/20' },
};
const getColor = (color: string, v: 'primary' | 'secondary' | 'accent' | 'light') =>
  (COLOR_MAP[color] ?? COLOR_MAP.blue)[v];

const StatCard = ({ bg, iconBg, icon, label, labelColor, value, visible, animClass, delay }: {
  bg?: string; iconBg: string; icon: React.ReactNode;
  label: string; labelColor?: string; value: string;
  visible: boolean; animClass: string; delay: number;
}) => (
  <div className={`${bg ?? ''} sm-card ${visible ? animClass : 'opacity-0'}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="flex flex-col items-center text-center">
      <div className={`w-5 h-5 sm:w-6 sm:h-6 ${iconBg} rounded-lg flex items-center justify-center mb-1 sm:mb-2 animate-pulse`}>{icon}</div>
      <div className={`text-xs font-medium mb-1 ${labelColor ?? 'text-gray-600'}`}>{label}</div>
      <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{value}</div>
    </div>
  </div>
);

const IconUser    = () => <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const IconTeam    = () => <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-7 9a7 7 0 1114 0v3H3v-3z" /></svg>;
const IconProgram = () => <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" /></svg>;
const IconUmkm    = () => <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" /></svg>;

const CORNERS = [
  { position: "top-2 left-2 sm:top-4 sm:left-4",         corner: "tl", borderWidth: '2px 0 0 2px' },
  { position: "top-2 right-2 sm:top-4 sm:right-4",       corner: "tr", borderWidth: '2px 2px 0 0' },
  { position: "bottom-2 left-2 sm:bottom-4 sm:left-4",   corner: "bl", borderWidth: '0 0 2px 2px' },
  { position: "bottom-2 right-2 sm:bottom-4 sm:right-4", corner: "br", borderWidth: '0 2px 2px 0' },
] as const;

// FIX 1: Placeholder for when foto URL is missing or fails to load
const PLACEHOLDER_SRC = '/images/placeholder-desa.jpg';

const InformasiGeografisSection = () => {
  const [rawDesa, setRawDesa]           = useState<DesaDataItem[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [hoveredDesa, setHoveredDesa]   = useState<number | null>(null);
  // FIX 2: Use index-based keys for visibility, not desa.id
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [scrollY, setScrollY]           = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDesaWithAnggota()
      .then((data) => {
        setRawDesa(data);
      })
      .catch((err) => {
        console.error('fetchDesaWithAnggota error:', err);
        setError('Gagal memuat data. Silakan coba lagi.');
      })
      .finally(() => setLoading(false));
  }, []);

  const desaInfo = useMemo<DesaInfo[]>(() =>
    rawDesa.map((d) => ({
      id:           d.id,
      nama:         d.namaDesa,
      deskripsi:    d.deskripsiGeografis,
      // FIX 3: Fallback to placeholder if fotoGeografis is empty
      foto:         d.fotoGeografis || PLACEHOLDER_SRC,
      reverse:      d.reverse,
      color:        d.color,
      icon:         d.icon,
      highlight:    d.highlight,
      koordinator:  d.koordinator?.nama || '',
      jabatan:      d.koordinator?.jabatan || '',
      anggotaCount: d.anggota.length,
      programCount: d.programCount,
      umkmCount:    d.umkmCount,
    })),
  [rawDesa]);

  // FIX 4: Use requestAnimationFrame to ensure DOM is painted before observing.
  //        Also key visibility by array INDEX (0-based), not desa.id (which may be 1-based or sparse).
  useEffect(() => {
    if (!desaInfo.length) return;

    let rafId: number;
    let observer: IntersectionObserver;

    rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = parseInt(entry.target.getAttribute('data-card-idx') ?? '-1', 10);
          if (idx === -1) return;
          setTimeout(
            () => setVisibleCards((prev) => { const s = new Set(prev); s.add(idx); return s; }),
            idx * 200
          );
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('[data-card-idx]').forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [desaInfo]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = useCallback((id: number) => setHoveredDesa(id), []);
  const handleMouseLeave = useCallback(() => setHoveredDesa(null), []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 w-full overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[
          { cls: 'top-20 left-10 w-72 h-72 bg-blue-200/20',        tx: `translateY(${scrollY * 0.1}px) translateX(${Math.sin(scrollY * 0.002) * 20}px)` },
          { cls: 'top-40 right-10 w-80 h-80 bg-teal-200/20',       tx: `translateY(${scrollY * -0.1}px) translateX(${Math.cos(scrollY * 0.002) * 30}px)` },
          { cls: 'bottom-20 left-1/3 w-64 h-64 bg-emerald-200/20', tx: `translateY(${scrollY * 0.05}px) translateX(${Math.sin(scrollY * 0.003) * 15}px)` },
        ].map(({ cls, tx }, i) => (
          <div key={i} className={`absolute ${cls} rounded-full blur-3xl pointer-events-none`} style={{ transform: tx }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Lokasi KKN-PPM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Informasi{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 pb-2">
              Geografis
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Mengenal lebih dekat desa-desa sasaran KKN-PPM UGM di Kecamatan Paliyan, Kabupaten Gunung Kidul
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-24">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Memuat informasi geografis...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-24 text-red-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">{error}</p>
          </div>
        ) : desaInfo.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-gray-400">
            <p className="text-sm">Belum ada data desa yang tersedia.</p>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {desaInfo.map((desa, index) => {
              // FIX 2 (cont): visibility keyed by index, not by desa.id
              const visible = visibleCards.has(index);
              const base    = index * 200;
              const slug    = desa.nama.toLowerCase().replace('desa ', '').replace(/\s+/g, '');

              return (
                <div
                  key={desa.id}
                  data-card-idx={index}   // changed from data-card-id={desa.id}
                  className={`group relative flex flex-col lg:flex lg:items-center gap-8 lg:gap-16
                    ${desa.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    transition-all duration-700`}
                  onMouseEnter={() => handleMouseEnter(desa.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Connecting line */}
                  <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent">
                    <div className={`h-full bg-gradient-to-r ${getColor(desa.color, 'light')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center`} />
                  </div>

                  {/* Text card */}
                  <div className="lg:flex-1 lg:max-w-2xl relative z-20">
                    <div className={`relative bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-gray-200 ${visible ? 'animate-card-pop' : ''}`}>
                      <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 ${getColor(desa.color, 'primary')} rounded-bl-3xl rounded-tr-3xl flex items-center justify-center text-xl sm:text-2xl`}>
                        {desa.icon}
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full ${getColor(desa.color, 'secondary')} ${getColor(desa.color, 'accent')} text-sm font-medium mb-4`}>
                        <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                        {desa.highlight}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        {desa.nama}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                        {desa.deskripsi}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                        <StatCard bg={getColor(desa.color,'secondary')} iconBg={getColor(desa.color,'primary')} icon={<IconUser />}    label="Koordinator" value={desa.koordinator}                visible={visible} animClass="animate-slide-right" delay={base+400} />
                        <StatCard                                        iconBg="bg-gray-600"                   icon={<IconTeam />}    label="Tim"         value={`${desa.anggotaCount} Anggota`}  visible={visible} animClass="animate-slide-left"  delay={base+500} />
                        <StatCard bg={getColor(desa.color,'secondary')} iconBg={getColor(desa.color,'primary')} icon={<IconProgram />} label="Program"     value={`${desa.programCount} Kegiatan`} labelColor={getColor(desa.color,'accent')} visible={visible} animClass="animate-slide-right" delay={base+600} />
                        <StatCard                                        iconBg="bg-gray-600"                   icon={<IconUmkm />}   label="UMKM"        value={`${desa.umkmCount} Unit`}         visible={visible} animClass="animate-slide-left"  delay={base+700} />
                      </div>
                      <a href={`/${slug}`} className={`group w-full flex items-center justify-center py-3 px-6 ${getColor(desa.color,'primary')} text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="mr-2 relative z-10">📍 Kunjungi {desa.nama}</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="lg:flex-1 lg:max-w-2xl relative z-20">
                    <div className="relative group">
                      <div className={`absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 ${getColor(desa.color,'primary')} rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-xl z-30 transition-all duration-500 ${hoveredDesa === desa.id ? 'scale-110 rotate-12' : ''} ${visible ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transitionDelay: `${base+800}ms` }}>
                        {desa.id}
                      </div>
                      <div className={`relative w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{ transitionDelay: `${base+200}ms` }}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${getColor(desa.color,'light')} z-10 group-hover:opacity-75 transition-opacity duration-500`} />
                        {/* FIX 3: guard against empty src; onError fallback for broken URLs */}
                        <Image
                          src={desa.foto}
                          alt={`Geografis ${desa.nama}`}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            if (img.src !== PLACEHOLDER_SRC) img.src = PLACEHOLDER_SRC;
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 sm:p-6 z-20">
                          <h4 className="font-bold text-base sm:text-lg text-white mb-1">{desa.nama}</h4>
                          <p className="text-xs sm:text-sm text-white/90">{desa.highlight}</p>
                        </div>
                        {CORNERS.map(({ position, corner, borderWidth }, i) => (
                          <div key={i}
                            className={`absolute ${position} w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/60 rounded-${corner}-lg z-20 transition-all duration-500 ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                            style={{ transitionDelay: `${base + i * 100 + 400}ms`, borderWidth }}
                          />
                        ))}
                      </div>
                      <div className={`absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 ${getColor(desa.color,'primary')} rounded-full opacity-80 transition-opacity duration-500 ${visible ? 'opacity-80' : 'opacity-0'}`}
                        style={{ transitionDelay: `${base+1000}ms` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default InformasiGeografisSection;