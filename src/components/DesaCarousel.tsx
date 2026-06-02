import React from 'react';
import Image from 'next/image';
import type { DesaDataItem, Anggota } from '@/data/desa';

interface DesaCarouselProps {
  desaList: DesaDataItem[];
}

// Playful Anggota Card with Decorative Elements
const AnggotaCard: React.FC<{ 
  anggota: Anggota,
  isActive?: boolean 
}> = ({ anggota, isActive = false }) => {
  // Get decorative elements based on anggota.id
  const getDecorativeElements = () => {
    switch(anggota.id % 4) {
      case 0: return {
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-400',
        iconColor: 'text-orange-500',
        decorations: ['crown', 'dots'],
        textBg: 'bg-orange-500'
      };
      case 1: return {
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-400',
        iconColor: 'text-blue-500',
        decorations: ['waves', 'arrow'],
        textBg: 'bg-blue-500'
      };
      case 2: return {
        bgColor: 'bg-green-100',
        borderColor: 'border-green-400',
        iconColor: 'text-green-500',
        decorations: ['leaf', 'dots'],
        textBg: 'bg-green-500'
      };
      default: return {
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-400',
        iconColor: 'text-purple-500',
        decorations: ['stars', 'dots'],
        textBg: 'bg-purple-500'
      };
    }
  };

  const style = getDecorativeElements();

  return (
    <div className={`flex-shrink-0 w-[220px] sm:w-[240px] h-[280px] sm:h-[300px] mx-2 sm:mx-3 transition-all duration-500 ${
      isActive ? 'z-30 scale-105' : 'scale-95 opacity-90 z-10'
    } py-4`}>
      <div className={`relative w-full h-full group cursor-pointer`}
        style={{ transformOrigin: 'center center' }}>
        
        {/* Main Card with Decorative Background */}
        <div className={`relative w-full h-full rounded-xl overflow-hidden ${style.bgColor} shadow-md transition-all duration-500 
          border-2 ${isActive ? style.borderColor : 'border-transparent'} will-change-transform`}>
          
          {/* Pattern background - textured paper effect */}
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
          
          {/* Decorative elements based on style - Positioned to work with larger photo */}
          {style.decorations.includes('crown') && (
            <div className="absolute top-2 right-2 w-8 h-8 text-yellow-500 transform rotate-12 opacity-60">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2L15,5H21V9L15,13.5L18,21H6L9,13.5L3,9V5H9L12,2M12,5.3L10.5,6.8L9.7,7.5H8V9.2L7.3,9.9L6.5,10.7L8,13.4L6.9,17H17.1L16,13.4L17.5,10.7L16.7,9.9L16,9.2V7.5H14.3L13.5,6.8L12,5.3Z" /></svg>
            </div>
          )}
          {style.decorations.includes('leaf') && (
            <div className="absolute top-2 right-2 w-8 h-8 text-green-500 transform rotate-45 opacity-70">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" /></svg>
            </div>
          )}
          {style.decorations.includes('waves') && (
            <div className="absolute top-2 left-2 w-8 h-8 text-blue-500 transform -rotate-12 opacity-60">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 12H22V14H20C18.6 14 17.3 13.2 16 12C13.5 9.5 10.5 9.5 8 12H4C2.9 12 2 11.1 2 10C2 8.9 2.9 8 4 8H8C10.5 8 13.4 9.5 16 12C17.3 13.2 18.6 14 20 14M20 17H22V19H20C18.6 19 17.3 18.2 16 17C13.5 14.5 10.5 14.5 8 17H4C2.9 17 2 16.1 2 15C2 13.9 2.9 13 4 13H8C10.5 13 13.4 14.5 16 17C17.3 18.2 18.6 19 20 19M22 7H20C18.6 7 17.3 6.2 16 5C13.5 2.5 10.5 2.5 8 5H4C2.9 5 2 4.1 2 3C2 1.9 2.9 1 4 1H8C10.5 1 13.4 2.5 16 5C17.3 6.2 18.6 7 20 7H22V7Z" /></svg>
            </div>
          )}
          {style.decorations.includes('stars') && (
            <div className="absolute top-2 left-2 w-8 h-8 text-purple-500 transform rotate-12 opacity-70">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1M17,19L19,17L21,19L19,21L17,19M15,3L16,5L14,7L16,9L14,11L12,9L10,11L8,9L10,7L8,5L9,3L11,5L13,3L15,3Z" /></svg>
            </div>
          )}
          {style.decorations.includes('arrow') && (
            <div className="absolute top-3 left-3 w-6 h-6 text-blue-500 opacity-60">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.5,2L18.5,2C19.86,2 21,3.14 21,4.5V5C21,6.38 19.88,7.5 18.5,7.5L5.5,7.5C4.12,7.5 3,6.38 3,5V4.5C3,3.14 4.14,2 5.5,2H18.5M18.5,9C19.88,9 21,10.12 21,11.5V12C21,13.38 19.88,14.5 18.5,14.5H5.5C4.12,14.5 3,13.38 3,12V11.5C3,10.12 4.12,9 5.5,9H18.5M18.5,16C19.88,16 21,17.12 21,18.5V19C21,20.38 19.88,21.5 18.5,21.5H5.5C4.12,21.5 3,20.38 3,19V18.5C3,17.12 4.12,16 5.5,16H18.5Z" /></svg>
            </div>
          )}
          {style.decorations.includes('dots') && (
            <div className="absolute bottom-16 right-2 w-8 h-8 transform -rotate-12 opacity-20">
              <svg viewBox="0 0 200 200" fill={style.iconColor}>
                <circle cx="25" cy="25" r="6" />
                <circle cx="75" cy="25" r="6" />
                <circle cx="125" cy="25" r="6" />
                <circle cx="25" cy="75" r="6" />
                <circle cx="75" cy="75" r="6" />
                <circle cx="125" cy="75" r="6" />
                <circle cx="25" cy="125" r="6" />
                <circle cx="75" cy="125" r="6" />
                <circle cx="125" cy="125" r="6" />
              </svg>
            </div>
          )}
          
          {/* Main Image in top portion */}
          <div className="absolute -top-6 inset-x-0 h-[70%] flex items-start justify-center">
            <div className="relative w-[180px] h-[180px] sm:w-[190px] sm:h-[190px] rounded-lg overflow-hidden border-3 border-white shadow-lg">
              <Image
                src={anggota.foto}
                alt={anggota.nama}
                fill
                sizes="190px"
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Information Card - Even more compact to fit larger image */}
          <div className="absolute bottom-2 inset-x-3 bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-md">
            <div className="space-y-0.5">
              {/* Name with bubble indicator */}
              <div className="relative">
                <h3 className="font-bold text-[11px] text-gray-900 truncate leading-tight">{anggota.nama}</h3>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-white rounded-full border-2 border-gray-200 shadow-sm"></span>
                )}
              </div>
              
              {/* NIM */}
              <p className="text-[9px] text-gray-500 truncate leading-tight">{anggota.nim}</p>
              
              {/* Prodi */}
              <p className="text-[9px] text-gray-700 truncate leading-tight">{anggota.prodi}</p>
              
              {/* Jabatan with colored tag */}
              <div className={`mt-0.5 inline-flex px-1 py-0.5 ${style.textBg} rounded-full text-white text-[9px] leading-none`}>
                {anggota.jabatan}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Minimalist Photo Carousel
const FotoBersamaCarousel: React.FC<{ 
  photos: string[], 
  desaName: string 
}> = ({ photos, desaName }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  React.useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [photos.length]);

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const handleImageError = (index: number) => {
    console.log(`Image ${index} failed to load:`, photos[index]);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative h-[250px] sm:h-[320px] lg:h-[380px] xl:h-[420px] rounded-xl overflow-hidden bg-gray-50 shadow-md group">
      {/* Images with enhanced height for better 1:2 aspect ratio */}
      <div className="relative w-full h-full">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {imageErrors[index] ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Foto tidak dapat dimuat</p>
                </div>
              </div>
            ) : (
              <Image
                src={photo}
                alt={`Tim ${desaName} - ${index + 1}`}
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 60vw"
                priority={index === 0}
                onError={() => handleImageError(index)}
                style={{
                  objectPosition: 'center center'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Elegant indicators - repositioned for horizontal layout */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePhotoClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentPhotoIndex 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Photo counter for horizontal layout */}
      <div className="absolute top-4 right-4">
        <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {currentPhotoIndex + 1}/{photos.length}
        </span>
      </div>

      {/* Navigation arrows - Enhanced untuk desktop */}
      {photos.length > 1 && (
        <>
          <button
            onClick={() => {
              const prevIndex = currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
              setCurrentPhotoIndex(prevIndex);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              const nextIndex = currentPhotoIndex === photos.length - 1 ? 0 : currentPhotoIndex + 1;
              setCurrentPhotoIndex(nextIndex);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

// Main Desa Section
const DesaCarouselSection: React.FC<{ desa: DesaDataItem, index: number }> = ({ desa, index: _index }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselItems = React.useMemo(
    () => [...desa.anggota, ...desa.anggota],
  [desa.anggota]
  );
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  
  // Card dimensions
  const cardWidth = isMobile ? 220 : 240;
  const cardMargin = isMobile ? 8 : 12; // Adjusted for smaller screens
  const cardTotalWidth = cardWidth + (cardMargin * 2); // Total width including margins

  // Intersection Observer untuk sticky badge
  React.useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);
  
  // Handle responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto rotation effect
  React.useEffect(() => {
    if (desa.anggota.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % desa.anggota.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [desa.anggota.length]);

  // Smooth navigation with looping support
  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === 'next') {
      setCurrentIndex(prev => (prev + 1) % desa.anggota.length);
    } else {
      setCurrentIndex(prev => (prev - 1 + desa.anggota.length) % desa.anggota.length);
    }
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Define color schemes based on logo theme
  const getColorScheme = () => {
    switch(desa.id % 3) {
      case 0: return {
        accent: 'from-green-500 to-green-600',
        badge: 'bg-green-100 text-green-800',
        text: 'text-green-700'
      };
      case 1: return {
        accent: 'from-blue-500 to-blue-600',
        badge: 'bg-blue-100 text-blue-800',
        text: 'text-blue-700'
      };
      default: return {
        accent: 'from-orange-500 to-orange-600',
        badge: 'bg-orange-100 text-orange-800',
        text: 'text-orange-700'
      };
    }
  };

  const colors = getColorScheme();

  return (
    <div ref={sectionRef} className="mb-12 relative" id={`desa-${desa.id}`}>
      {/* Sticky Badge yang muncul saat scroll - Pojok kanan atas */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className={`bg-white/95 backdrop-blur-xl rounded-full px-4 py-2 shadow-xl border border-white/20 ${colors.badge} flex items-center space-x-2`}>
          <div className={`w-2 h-2 bg-gradient-to-r ${colors.accent} rounded-full animate-pulse`}></div>
          <span className="font-semibold text-xs tracking-wide">{desa.namaDesa}</span>
        </div>
      </div>
      {/* Modern Header with Enhanced Animation Effects */}
      <div className="mb-8 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute -inset-4 opacity-20">
          <div 
            className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${colors.accent} rounded-full blur-3xl animate-float`}
            style={{ animationDelay: '0s', animationDuration: '6s' }}
          ></div>
          <div 
            className={`absolute top-4 right-8 w-16 h-16 bg-gradient-to-br ${colors.accent} rounded-full blur-2xl animate-bounce`}
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          ></div>
        </div>

        {/* Modern Left Accent Bar with Pulse Effect */}
        <div className={`absolute -left-6 top-0 h-full w-1 bg-gradient-to-b ${colors.accent} rounded-full opacity-80 animate-pulse`}>
          <div className={`absolute top-0 left-0 w-full h-8 bg-gradient-to-b ${colors.accent} rounded-full blur-sm animate-ping`}></div>
        </div>
        
        {/* Enhanced Badge with Hover Animation */}
        <div className="flex items-center mb-3 group">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold ${colors.badge} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative overflow-hidden`}>
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center">
              <svg className="w-3 h-3 mr-1.5 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Sub Unit KKN
            </div>
          </span>
        </div>
        
        {/* Modern Title with Gradient Text */}
        <div className="relative">
          <h3 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-fade-in">
            {desa.namaDesa}
          </h3>
          {/* Animated underline */}
          <div className={`h-1 w-0 bg-gradient-to-r ${colors.accent} rounded-full animate-expand-width`}
               style={{ animationDelay: '0.5s', animationDuration: '1s', animationFillMode: 'forwards' }}></div>
        </div>

        {/* Subtitle with typing animation */}
        <div className={`mt-2 ${colors.text} text-sm font-medium opacity-0 animate-slide-up`}
             style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        </div>
      </div>

      {/* Modern Koordinator & Photo Grid with Enhanced Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
        
        {/* Modern Koordinator Card with Glassmorphism Effect */}
        <div className="lg:col-span-2 group">
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
            {/* Dynamic Top Gradient Strip */}
            <div className="relative h-3 overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${colors.accent} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}></div>
              <div className={`absolute top-0 left-0 h-full w-full bg-gradient-to-r ${colors.accent} opacity-40 animate-pulse`}></div>
            </div>
            
            <div className="p-6 relative">
              {/* Floating Background Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="flex items-start space-x-5 relative z-10">
                {/* Enhanced Avatar with Ring Animation */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full animate-spin-slow group-hover:animate-ping"></div>
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={desa.koordinator.foto}
                      alt={desa.koordinator.nama}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className="space-y-2 flex-1">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${colors.badge} text-xs font-bold uppercase tracking-wider shadow-lg`}>
                    <svg className="w-3 h-3 mr-1.5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Koordinator
                  </div>
                  
                  <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-gray-700 transition-colors duration-300">
                    {desa.koordinator.nama}
                  </h4>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      {desa.koordinator.prodi}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                      <svg className="w-3 h-3 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {desa.koordinator.nim}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modern Status Indicator */}
              <div className="absolute top-6 right-6 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-500 ml-1">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Foto Bersama - Enhanced for horizontal 3:2 layout */}
        <div className="lg:col-span-3">
          <FotoBersamaCarousel 
            photos={desa.fotoBersama} 
            desaName={desa.namaDesa}
          />
        </div>
      </div>

      {/* Team Members Carousel with Playful Styling */}
      <div className="relative overflow-visible bg-blue-50 rounded-2xl p-4 pb-8">
        
        {/* Playful Section Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div>
              <h4 className="text-lg font-bold text-indigo-900 leading-none">
                Tim Anggota
              </h4>
              <p className="text-xs text-indigo-700">
                Mahasiswa KKN-PPM UGM 2025
              </p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
            {desa.anggota.length} orang
          </div>
        </div>

        {/* Centered Carousel Container with playful styling */}
        <div className="relative overflow-visible px-4 sm:px-6 py-4">
          {/* Left fade mask */}
          <div className="absolute left-0 top-4 bottom-4 w-12 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Right fade mask */}
          <div className="absolute right-0 top-4 bottom-4 w-12 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Create a container with the width of the visible area and extra vertical padding for scale effect */}
          <div className="w-full flex justify-center overflow-hidden">
            {/* Inner carousel that will move */}
            <div 
              className={`flex transition-transform duration-500 ease-out ${isTransitioning ? 'ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(calc(-${currentIndex * cardTotalWidth}px + 50% - ${cardWidth/2}px))`, // Perfect centering calculation
                paddingTop: '10px',
                paddingBottom: '10px'
              }}
            >
              {/* Show items twice to create a continuous loop effect */}
              {carouselItems.map((anggota, index) => (
                <AnggotaCard
                  key={`${anggota.id}-${index}`}
                  anggota={anggota as Anggota}
                  isActive={index % desa.anggota.length === currentIndex}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          {desa.anggota.length > 1 && (
            <>
              <button
                onClick={() => handleNavigation('prev')}
                disabled={isTransitioning}
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full shadow-md backdrop-blur-sm flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-40 -translate-x-2 group border-2 border-white/50 hover:border-white z-50`}
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={() => handleNavigation('next')}
                disabled={isTransitioning}
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full shadow-md backdrop-blur-sm flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-40 translate-x-2 group border-2 border-white/50 hover:border-white z-50`}
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {desa.anggota.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-indigo-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 left-8 w-16 h-16">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-indigo-200">
            <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute -top-2 right-12 w-12 h-12">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-200">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute top-1/4 -left-2 w-8 h-8">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-green-200">
            <path d="M15 3H9V5H15V3Z" fill="currentColor"/>
            <path d="M15 19H9V21H15V19Z" fill="currentColor"/>
            <path d="M5 15H3V9H5V15Z" fill="currentColor"/>
            <path d="M21 15H19V9H21V15Z" fill="currentColor"/>
            <path d="M5.01 9H3V15H5.01V9Z" fill="currentColor"/>
            <path d="M9 15V19H15V15H9Z" fill="currentColor"/>
            <path d="M9 5V9H15V5H9Z" fill="currentColor"/>
            <path d="M19 9H15V15H19V9Z" fill="currentColor"/>
            <path d="M9 9H5V15H9V9Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-1 w-10 h-10">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-pink-200">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const DesaCarousel: React.FC<DesaCarouselProps> = ({ desaList }) => {
  return (
    <div className="w-full min-w-[320px] max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12 overflow-hidden">
      <div className="space-y-0">
        {desaList.map((desa, index) => (
          <div 
            key={desa.id} 
            className={`${index > 0 ? "pt-12 sm:pt-20 mt-12 sm:mt-20" : ""}`}
          >
            <DesaCarouselSection desa={desa} index={index} />
            {index < desaList.length - 1 && (
              <div className="max-w-2xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesaCarousel;