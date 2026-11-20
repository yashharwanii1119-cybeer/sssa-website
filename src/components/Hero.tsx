import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import emblem from '../assets/logo/sssa_emblem.png';
import { getAssetPath } from '../utils/paths';

interface HeroProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      btn2Action: () => onOpenEnquiry('Heritage & Craftsmanship Enquiry'),
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
      btn2Action: () => onOpenEnquiry('B2B & International Export Enquiry'),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic slide rotation every 5.5 seconds, paused on hover
  useEffect(() => {
    if (!isPaused) {
      slideTimerRef.current = setTimeout(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
      }
    };
  }, [currentSlide, isPaused]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#271911] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
              index === currentSlide ? 'scale-105' : 'scale-100'
            }`}
          />
          {/* Refined Luxury Dark Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#271911]/95 via-[#382419]/80 to-[#271911]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#271911] via-transparent to-black/40" />
        </div>
      ))}

      {/* Decorative Gold Frame Border */}
      <div className="absolute inset-4 sm:inset-8 border border-[#A77B42]/20 pointer-events-none z-20 hidden md:block" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#F7F3EC]">
        {slides.map((slide, index) => {
          if (index !== currentSlide) return null;
          return (
            <div
              key={slide.id}
              className="animate-fade-in transition-all duration-700 ease-out"
            >
              {/* Emblem & Eyebrow */}
              <div className="inline-flex flex-col items-center justify-center mb-5 sm:mb-6">
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
                  <span className="w-8 h-[1px] bg-[#A77B42]"></span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md">
                {slide.headline}
              </h1>

              {/* Supporting Text */}
              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#EAE0D2]/90 font-light leading-relaxed mb-10">
                {slide.supporting}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {slide.btn1Href ? (
                  <a
                    href={slide.btn1Href}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#25221F] bg-[#F7F3EC] hover:bg-[#A77B42] hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <span>{slide.btn1Text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : null}

                {slide.btn2Action ? (
                  <button
                    onClick={slide.btn2Action}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] border border-[#F7F3EC]/40 hover:border-[#A77B42] hover:bg-[#A77B42]/20 transition-all duration-300 backdrop-blur-xs cursor-pointer"
                  >
                    <span>{slide.btn2Text}</span>
                  </button>
                ) : slide.btn2Href ? (
                  <a
                    href={slide.btn2Href}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] border border-[#F7F3EC]/40 hover:border-[#A77B42] hover:bg-[#A77B42]/20 transition-all duration-300 backdrop-blur-xs cursor-pointer"
                  >
                    <span>{slide.btn2Text}</span>
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Left/Right Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#A77B42]/40 bg-[#271911]/60 text-[#EAE0D2] hover:bg-[#A77B42] hover:text-white hover:border-[#A77B42] backdrop-blur-xs flex items-center justify-center transition-all duration-300 cursor-pointer group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#A77B42]/40 bg-[#271911]/60 text-[#EAE0D2] hover:bg-[#A77B42] hover:text-white hover:border-[#A77B42] backdrop-blur-xs flex items-center justify-center transition-all duration-300 cursor-pointer group"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Three Slide Indicator Dots */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              idx === currentSlide
                ? 'w-8 h-2 bg-[#C4975C]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
