"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const desaLinks = [
    { name: 'Desa Karangduwet', href: '#karangduwet', icon: '🌾' },
    { name: 'Desa Grogol', href: '#grogol', icon: '🛍️' },
    { name: 'Desa Pampang', href: '#pampang', icon: '🪙' },
    { name: 'Desa Mulusan', href: '#mulusan', icon: '🏔️' }
  ];

  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Tim', href: '/profil' },
    { name: 'Program Kerja', href: '/program-kerja' },
    { name: 'Galeri Kegiatan', href: '/galeri' }
  ];

  const contactInfo = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'kkn.paliyan2026@ugm.ac.id',
      href: 'mailto:kkn.paliyan2026@ugm.ac.id'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Lokasi',
      value: 'Kecamatan Paliyan, Gunung Kidul',
      href: 'https://maps.google.com/?q=Paliyan+Gunung+Kidul'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/paliyanmenawan',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.929.013 6.71.054 5.487.095 4.669.24 3.948.43c-.75.193-1.433.477-2.085 1.128C1.226 2.204.951 2.896.761 3.64c-.195.721-.348 1.539-.389 2.762C.333 7.621.32 8.088.32 11.709c0 3.621.013 4.088.054 5.307.041 1.223.186 2.041.376 2.762.19.744.465 1.436 1.102 2.073.637.637 1.329.912 2.073 1.102.721.19 1.539.335 2.762.376 1.219.041 1.686.054 5.307.054 3.621 0 4.088-.013 5.307-.054 1.223-.041 2.041-.186 2.762-.376.744-.19 1.436-.465 2.073-1.102.637-.637.912-1.329 1.102-2.073.19-.721.335-1.539.376-2.762.041-1.219.054-1.686.054-5.307 0-3.621-.013-4.088-.054-5.307-.041-1.223-.186-2.041-.376-2.762-.19-.744-.465-1.436-1.102-2.073-.637-.637-1.329-.912-2.073-1.102-.721-.19-1.539-.335-2.762-.376C16.105.013 15.638 0 12.017 0zM12.017 2.163c3.557 0 3.975.013 5.372.054 1.297.059 2.002.274 2.473.457.622.242 1.066.532 1.533.999.467.467.757.911.999 1.533.183.471.398 1.176.457 2.473.041 1.397.054 1.815.054 5.372 0 3.557-.013 3.975-.054 5.372-.059 1.297-.274 2.002-.457 2.473-.242.622-.532 1.066-.999 1.533-.467.467-.911.757-1.533.999-.471.183-1.176.398-2.473.457-1.397.041-1.815.054-5.372.054-3.557 0-3.975-.013-5.372-.054-1.297-.059-2.002-.274-2.473-.457-.622-.242-1.066-.532-1.533-.999-.467-.467-.757-.911-.999-1.533-.183-.471-.398-1.176-.457-2.473C2.176 15.992 2.163 15.574 2.163 12.017c0-3.557.013-3.975.054-5.372.059-1.297.274-2.002.457-2.473.242-.622.532-1.066.999-1.533.467-.467.911-.757 1.533-.999.471-.183 1.176-.398 2.473-.457 1.397-.041 1.815-.054 5.372-.054z"/>
          <path d="M12.017 5.838c-3.403 0-6.179 2.776-6.179 6.179s2.776 6.179 6.179 6.179 6.179-2.776 6.179-6.179-2.776-6.179-6.179-6.179zM12.017 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          <path d="M19.846 5.595c0 .795-.646 1.441-1.441 1.441-.795 0-1.441-.646-1.441-1.441 0-.795.646-1.441 1.441-1.441.795 0 1.441.646 1.441 1.441z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)
            `
          }}
        ></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-32 right-16 w-24 h-24 bg-orange-400/10 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute bottom-16 left-1/4 w-40 h-40 bg-green-400/10 rounded-full blur-2xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Logo & Description Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo-kkn.png"
                    alt="KKN-PPM UGM Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Paliyan Menawan</h3>
                  <p className="text-blue-300 text-sm">KKN-PPM UGM 2026</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Program KKN-PPM Universitas Gadjah Mada yang berkomitmen membangun 
                pemberdayaan masyarakat di Kecamatan Paliyan melalui inovasi, 
                kolaborasi, dan pengabdian berkelanjutan.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={social.name}
                  >
                    <div className="text-gray-300 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Menu Utama
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desa Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lokasi Desa
              </h4>
              <ul className="space-y-3">
                {desaLinks.map((desa, index) => (
                  <li key={index}>
                    <Link
                      href={desa.href}
                      className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center text-sm"
                    >
                      <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                        {desa.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {desa.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Hubungi Kami
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <li key={index}>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : '_self'}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group text-gray-300 hover:text-white transition-all duration-300 flex items-start text-sm"
                    >
                      <div className="text-blue-400 group-hover:text-blue-300 mr-3 mt-0.5 group-hover:scale-110 transition-all duration-300">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{contact.label}</p>
                        <p className="group-hover:text-blue-300 transition-colors duration-300">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-300 text-sm">
                © {currentYear} KKN-PPM UGM Paliyan. Seluruh hak cipta dilindungi.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Pengembangan oleh Pamski dan Tim KKN UGM Paliyan 2026
              </p>
            </div>

            {/* University Attribution */}
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo-kkn.png"
                  alt="UGM Logo"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
              <div className="text-center sm:text-right">
                <p className="font-medium text-white">Universitas Gadjah Mada</p>
                <p className="text-xs text-blue-300">Kuliah Kerja Nyata PPM 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-400 to-green-500 animate-pulse"></div>
    </footer>
  );
};

export default Footer;
