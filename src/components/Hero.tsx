import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import emblem from '../assets/logo/sssa_emblem.png';
import { getAssetPath } from '../utils/paths';
import { openWhatsAppEnquiry } from '../utils/whatsapp';

interface HeroProps {
  onOpenEnquiry?: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Five extracted furniture photographs from Reference 2
  const heroCollage = {
    col1Top: {
      src: getAssetPath('/images/hero/hero_round_table.jpg'),
      alt: 'Pedestal Stone Round Table',
      title: 'Pedestal Dining',
    },
    col1Bottom: {
      src: getAssetPath('/images/hero/hero_arch_console.jpg'),
      alt: 'Double Arch Console Table',
      title: 'Arch Console',
    },
    col2Top: {
      src: getAssetPath('/images/hero/hero_oval_dining.jpg'),
      alt: 'Fluted Oval Dining Table',
      title: 'Fluted Oval Table',
    },
    col2Mid: {
      src: getAssetPath('/images/hero/hero_drawer_cabinet.jpg'),
      alt: 'Artisan Dual-Drawer End Cabinet',
      title: 'End Cabinet',
    },
    col2Bottom: {
      src: getAssetPath('/images/hero/hero_media_credenza.jpg'),
      alt: 'Curved Wood Media Credenza',
      title: 'Curved Credenza',
    },
  };

  const slides = [
    {
      id: 1,
      image: getAssetPath('/images/slide1_heritage.jpg'),
      eyebrow: 'Our Heritage & Craftsmanship',
      headline: 'Where Wood Becomes A Work Of Art.',
      supporting:
        'Discover the beauty of handcrafted wooden creations, shaped by skilled artisans and inspired by timeless Indian craftsmanship.',
      btn1Text: 'Explore Our Collections',
      btn1Href: '#collections',
      btn2Text: 'Request An Enquiry',
      btn2Action: () => openWhatsAppEnquiry('Heritage & Craftsmanship Enquiry'),
    },
    {
      id: 2,
      image: getAssetPath('/images/slide2_collections.jpg'),
      eyebrow: 'Artisanal Furniture & Décor',
      headline: 'Designed To Inspire. Crafted To Last.',
      supporting:
        'Explore distinctive wooden creations that combine traditional craftsmanship, timeless design, and exceptional attention to detail.',
      btn1Text: 'View Our Collections',
      btn1Href: '#collections',
      btn2Text: 'Contact Our Team',
      btn2Href: '#contact',
    },
    {
      id: 3,
      image: getAssetPath('/images/slide3_export.jpg'),
      eyebrow: 'Global Export Excellence',
      headline: 'Indian Craftsmanship. Global Standards.',
      supporting:
        'Your trusted partner for wooden handicrafts, customised furniture manufacturing, and dependable wholesale and export solutions.',
      btn1Text: 'Explore Our Capabilities',
      btn1Href: '#craftsmanship',
      btn2Text: 'Request An Enquiry',
      btn2Action: () => openWhatsAppEnquiry('B2B & International Export Enquiry'),
    },
  ];

  // Stable nextSlide function
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Stable prevSlide function
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Automatic slide rotation every exactly 5 seconds (5000ms).
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide, nextSlide]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#271911] select-none py-14 lg:py-20"
    >
      {/* Slides Background Images with atmospheric gradient overlays */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className={`w-full h-full object-cover object-center transform transition-all duration-[6000ms] ease-out ${
                isActive ? 'scale-105 translate-x-0' : 'scale-100 translate-x-1'
              }`}
            />
            {/* Refined Luxury Dark Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#271911]/95 via-[#2d1c14]/90 to-[#271911]/94" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#271911] via-transparent to-black/50" />
          </div>
        );
      })}

      {/* Decorative Gold Frame Border */}
      <div className="absolute inset-4 sm:inset-8 border border-[#A77B42]/20 pointer-events-none z-10 hidden md:block" />

      {/* Main Hero Container: 2-column layout (Left: Text & CTAs, Right: 5-Piece Asymmetrical Furniture Collage) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Emblem, Eyebrow, Dynamic Slide Text & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left text-[#F7F3EC]">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`transition-all duration-700 ease-out ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto block'
                      : 'opacity-0 -translate-y-2 pointer-events-none hidden'
                  }`}
                >
                  {/* Emblem & Eyebrow */}
                  <div className="inline-flex flex-col items-center lg:items-start justify-center mb-5 sm:mb-6">
                    <img
                      src={emblem}
                      alt="SSSA Emblem"
                      className="w-11 sm:w-13 h-11 sm:h-13 object-contain mb-3 drop-shadow-md filter brightness-110"
                    />
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-[#A77B42]"></span>
                      <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#C4975C] uppercase">
                        {slide.eyebrow}
                      </span>
                      <span className="w-8 h-[1px] bg-[#A77B42] lg:hidden"></span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-serif font-normal text-white tracking-tight leading-[1.12] mb-5 drop-shadow-md">
                    {slide.headline}
                  </h1>

                  {/* Supporting Text */}
                  <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-[#EAE0D2]/90 font-light leading-relaxed mb-8">
                    {slide.supporting}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5">
                    {slide.btn1Href ? (
                      <a
                        href={slide.btn1Href}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#25221F] bg-[#F7F3EC] hover:bg-[#A77B42] hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
                      >
                        <span>{slide.btn1Text}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : null}

                    {slide.btn2Action ? (
                      <button
                        onClick={slide.btn2Action}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] border border-[#F7F3EC]/40 hover:border-[#A77B42] hover:bg-[#A77B42]/20 transition-all duration-300 backdrop-blur-xs cursor-pointer"
                      >
                        <span>{slide.btn2Text}</span>
                      </button>
                    ) : slide.btn2Href ? (
                      <a
                        href={slide.btn2Href}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] border border-[#F7F3EC]/40 hover:border-[#A77B42] hover:bg-[#A77B42]/20 transition-all duration-300 backdrop-blur-xs cursor-pointer"
                      >
                        <span>{slide.btn2Text}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Reference 3 Asymmetrical Two-Column 5-Image Furniture Collage */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg lg:max-w-none p-3 sm:p-4 rounded-2xl bg-[#1E140E]/80 backdrop-blur-md border border-[#A77B42]/30 shadow-2xl">
              
              {/* Asymmetrical 2-Column Grid matching Reference 3 */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 items-stretch">
                
                {/* Column 1: Larger Tall Top Panel + Rectangular Bottom Panel */}
                <div className="flex flex-col gap-2.5 sm:gap-3.5 justify-between">
                  {/* Top-Left: Round Stone Pedestal Table (Taller Panel ~ 58% height) */}
                  <div className="group relative overflow-hidden rounded-xl border border-[#A77B42]/30 bg-[#160E08] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl flex-1 min-h-[170px] sm:min-h-[230px]">
                    <img
                      src={heroCollage.col1Top.src}
                      alt={heroCollage.col1Top.alt}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2.5 sm:p-3">
                      <span className="text-[10px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                        {heroCollage.col1Top.title}
                      </span>
                    </div>
                  </div>

                  {/* Bottom-Left: Double Arch Console Table (Rectangular Panel ~ 42% height) */}
                  <div className="group relative overflow-hidden rounded-xl border border-[#A77B42]/30 bg-[#160E08] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl h-[120px] sm:h-[165px]">
                    <img
                      src={heroCollage.col1Bottom.src}
                      alt={heroCollage.col1Bottom.alt}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2.5 sm:p-3">
                      <span className="text-[10px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                        {heroCollage.col1Bottom.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Top Rectangular Panel + Compact Mid Panel + Larger Bottom Panel */}
                <div className="flex flex-col gap-2.5 sm:gap-3.5 justify-between">
                  {/* Top-Right: Fluted Oval Dining Table */}
                  <div className="group relative overflow-hidden rounded-xl border border-[#A77B42]/30 bg-[#160E08] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl h-[120px] sm:h-[155px]">
                    <img
                      src={heroCollage.col2Top.src}
                      alt={heroCollage.col2Top.alt}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2.5 sm:p-3">
                      <span className="text-[10px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                        {heroCollage.col2Top.title}
                      </span>
                    </div>
                  </div>

                  {/* Mid-Right: Dual-Drawer Artisan End Cabinet */}
                  <div className="group relative overflow-hidden rounded-xl border border-[#A77B42]/30 bg-[#160E08] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl h-[100px] sm:h-[125px]">
                    <img
                      src={heroCollage.col2Mid.src}
                      alt={heroCollage.col2Mid.alt}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2.5 sm:p-3">
                      <span className="text-[10px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                        {heroCollage.col2Mid.title}
                      </span>
                    </div>
                  </div>

                  {/* Bottom-Right: Curved Media Credenza (Taller Accent Panel) */}
                  <div className="group relative overflow-hidden rounded-xl border border-[#A77B42]/30 bg-[#160E08] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl flex-1 min-h-[110px] sm:min-h-[145px]">
                    <img
                      src={heroCollage.col2Bottom.src}
                      alt={heroCollage.col2Bottom.alt}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2.5 sm:p-3">
                      <span className="text-[10px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                        {heroCollage.col2Bottom.title}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Manual Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#A77B42]/40 bg-[#271911]/70 text-[#EAE0D2] hover:bg-[#A77B42] hover:text-white hover:border-[#A77B42] backdrop-blur-xs flex items-center justify-center transition-all duration-300 cursor-pointer group shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Manual Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#A77B42]/40 bg-[#271911]/70 text-[#EAE0D2] hover:bg-[#A77B42] hover:text-white hover:border-[#A77B42] backdrop-blur-xs flex items-center justify-center transition-all duration-300 cursor-pointer group shadow-lg"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Three Slide Indicator Dots */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              idx === currentSlide
                ? 'w-7 sm:w-8 h-2 bg-[#C4975C]'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
