"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Fungsi untuk menangani scroll
  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setHidden(true); // Scroll ke bawah
    } else {
      setHidden(false); // Scroll ke atas
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 shadow-md transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-1.5 sm:py-2 flex justify-between items-center">
        
        {/* Logo Section - More compact for mobile */}
        <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 group">
          <div className="logo-header">
            <Image
              src="/logo-kkn.png"
              alt="UGM Logo"
              fill
              sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
              priority
              style={{ objectFit: "contain" }}
              draggable="false"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-blue-900 font-bold text-xs sm:text-sm tracking-tight">Paliyan Menawan</span>
            </div>
            <span className="text-blue-600 text-[9px] sm:text-xs bg-blue-50 px-1.5 rounded-full inline-block whitespace-nowrap">KKN-PPM UGM 2026</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <Link
            href="/"
            className="nav-hood">
            <span>Beranda</span>
          </Link>
          <Link
            href="/karangduwet"
            className="nav-hood">
            <span>Karangduwet</span>
          </Link>
          <Link
            href="/grogol"
            className="nav-hood">
            <span>Grogol</span>
          </Link>
          <Link
            href="/pampang"
            className="nav-hood">
            <span>Pampang</span>
          </Link>
          <Link
            href="/mulusan"
            className="nav-hood">
            <span>Mulusan</span>
          </Link>
        </div>

        {/* Mobile Menu Button - Compact version */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMenu} 
            className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 transition-all duration-300 group touch-manipulation"
            aria-label="Toggle menu">
            <span className="flex flex-col items-center justify-center w-4 h-4 space-y-0.5 relative">
              <span 
                className={`block h-0.5 bg-blue-600 transition-all duration-300 ease-in-out ${
                  menuOpen ? 'w-4 absolute top-1.5 rotate-45' : 'w-4'
                }`}
              ></span>
              <span 
                className={`block h-0.5 bg-blue-600 transition-all duration-300 ease-in-out ${
                  menuOpen ? 'opacity-0 w-0' : 'opacity-100 w-3'
                }`}
              ></span>
              <span 
                className={`block h-0.5 bg-blue-600 transition-all duration-300 ease-in-out ${
                  menuOpen ? 'w-4 absolute top-1.5 -rotate-45' : 'w-2.5'
                }`}
              ></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Fixed positioning and improved mobile UX */}
      <div 
        className={`lg:hidden fixed inset-0 z-[60] ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop overlay */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>
        
        {/* Menu panel - Fixed height and positioning */}
        <div 
          className={`absolute top-0 right-0 w-[85%] max-w-xs h-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
          role="dialog"
          aria-modal="true"
        >
          {/* Menu header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-50 flex-shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
                <Image
                  src="/logo-kkn.png"
                  alt="UGM Logo"
                  fill
                  sizes="36px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="font-bold text-blue-900 text-sm">KKN-PPM UGM</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-blue-600 active:text-blue-800 transition-colors p-2 -mr-1 touch-manipulation"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Menu links - Fixed overflow and proper spacing */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="menu-links"
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-active"></span>
                <span className="font-medium text-base">Beranda</span>
              </Link>
              <Link
                href="/karangduwet"
                className="menu-links"
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-active"></span>
                <span className="font-medium text-base">Karangduwet</span>
              </Link>
              <Link
                href="/grogol"
                className="menu-links"
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-active"></span>
                <span className="font-medium text-base">Grogol</span>
              </Link>
              <Link
                href="/pampang"
                className="menu-links"
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-active"></span>
                <span className="font-medium text-base">Pampang</span>
              </Link>
              <Link
                href="/mulusan"
                className="menu-links"
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-active"></span>
                <span className="font-medium text-base">Mulusan</span>
              </Link>
            </nav>
          </div>

          {/* Footer area - Optional */}
          <div className="flex-shrink-0 p-4 border-t border-blue-50">
            <p className="text-xs text-gray-500 text-center">
              © 2025 KKN-PPM UGM
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}