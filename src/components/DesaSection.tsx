"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DesaCarousel from './DesaCarousel';
import { fetchDesaWithAnggota, fetchPimpinan } from '@/data/desa';
import type { Anggota, DesaDataItem } from '@/data/desa';

// ─── PersonCard ───────────────────────────────────────────────────────────────

const PersonCard = ({
  person,
  badge,
  badgeStyle,
  accentColor,
}: {
  person: Anggota;
  badge: string;
  badgeStyle: string;
  accentColor: string;
}) => (
  <div className="group relative">
    <div className="text-center mb-6">
      <div className={`inline-flex items-center px-4 py-2 rounded-full ${badgeStyle} text-sm font-bold uppercase tracking-wider shadow-sm mb-4`}>
        {badge}
      </div>
      <div className="mb-6">
        <h4 className="font-bold text-gray-900 text-xl mb-2">{person.nama}</h4>
        <p className={`${accentColor} font-semibold text-base mb-2`}>{person.jabatan}</p>
        <p className="text-gray-600 text-sm mb-1">{person.prodi}</p>
        <p className="text-gray-500 text-sm">{person.nim}</p>
      </div>
    </div>
    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group-hover:scale-105 max-w-[280px] mx-auto">
      <div className="aspect-square p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src={person.foto}
            alt={person.nama}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
    </div>
  </div>
);

// ─── PimpinanSection ──────────────────────────────────────────────────────────

const PimpinanSection: React.FC<{ dpl: Anggota | null; kormanit: Anggota | null }> = ({ dpl, kormanit }) => (
  <div className="mb-16 relative">
    <div className="text-center mb-12">
      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 text-sm font-semibold mb-4">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Struktur Kepemimpinan
      </div>
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold pb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
        Pembimbing & Koordinator
      </h3>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Tim pembimbing dan koordinator yang memimpin pelaksanaan KKN-PPM UGM di Kecamatan Paliyan
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {dpl && (
        <PersonCard person={dpl} badge="Dosen Pembimbing" badgeStyle="bg-blue-100 text-blue-800" accentColor="text-blue-600" />
      )}
      {kormanit && (
        <PersonCard person={kormanit} badge="Koordinator Unit" badgeStyle="bg-indigo-100 text-indigo-800" accentColor="text-indigo-600" />
      )}
    </div>

    <div className="mt-16 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-400" />
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" />
        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-transparent" />
      </div>
    </div>
  </div>
);

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center gap-4 min-h-[300px]">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const DesaSection = () => {
  const [desaList, setDesaList] = useState<DesaDataItem[]>([]);
  const [dpl, setDpl]           = useState<Anggota | null>(null);
  const [kormanit, setKormanit] = useState<Anggota | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchDesaWithAnggota(), fetchPimpinan()])
      .then(([desa, pimpinan]) => {
        setDesaList(desa);
        setDpl(pimpinan.dpl);
        setKormanit(pimpinan.kormanit);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="profil" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 w-full relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-200/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/15 to-pink-200/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-blue-200/10 rounded-full blur-2xl animate-bounce-slow" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative py-8 px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-up">
              Tim KKN-PPM UGM Paliyan 2026
            </h2>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400" />
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" />
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent" />
            </div>
            <p className="text-blue-700 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              Mahasiswa KKN-PPM UGM yang bertugas di 4 desa di Kecamatan Paliyan,
              Kabupaten Gunung Kidul untuk periode 2026.
            </p>
          </div>
        </div>

        {loading ? (
          <Spinner label="Memuat data tim KKN..." />
        ) : error ? (
          <p className="text-center text-red-500 text-sm py-16">Gagal memuat data: {error}</p>
        ) : (
          <>
            <PimpinanSection dpl={dpl} kormanit={kormanit} />

            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 text-sm font-semibold mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
                Sub Unit KKN
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
                Tim Sub Unit Desa
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tim mahasiswa yang bertugas di setiap desa dengan program kerja yang spesifik dan terukur
              </p>
            </div>

            <DesaCarousel desaList={desaList} />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes float         { 0%,100% { transform: translateY(0)    } 50% { transform: translateY(-20px) } }
        @keyframes float-delayed { 0%,100% { transform: translateY(0)    } 50% { transform: translateY(-15px) } }
        @keyframes bounce-slow   { 0%,100% { transform: translateY(0)    } 50% { transform: translateY(-10px) } }
        @keyframes fade-in-up    { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
        .animate-float           { animation: float         6s ease-in-out infinite; }
        .animate-float-delayed   { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-slow     { animation: bounce-slow   4s ease-in-out infinite; }
        .animate-fade-in-up      { animation: fade-in-up    1s ease-out; }
      `}</style>
    </section>
  );
};

export default DesaSection;