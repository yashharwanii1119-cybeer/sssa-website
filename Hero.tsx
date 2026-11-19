import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import emblem from '../assets/logo/sssa_emblem.png';
import { getAssetPath } from '../utils/paths';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#271911]">
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetPath("/images/hero.jpg")}
          alt="Handcrafted Wooden Furniture and Handicrafts"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#271911]/92 via-[#382419]/80 to-[#271911]/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#271911] via-transparent to-black/30" />
      </div>

      <div className="absolute inset-4 sm:inset-8 border border-[#A77B42]/20 pointer-events-none z-10 hidden md:block" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#F7F3EC]">
        
        <div className="inline-flex flex-col items-center justify-center mb-6">
          <img
            src={emblem}
            alt="SSSA Emblem"
            className="w-12 h-12 object-contain mb-3 drop-shadow-md filter brightness-110"
          />
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#A77B42]"></span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#C4975C] uppercase">
              The Art Of Timeless Craftsmanship
            </span>
            <span className="w-8 h-[1px] bg-[#A77B42]"></span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
          Where Wood Becomes <br className="hidden sm:inline" />
          <span className="italic font-light text-[#EAE0D2]">A Work Of Art.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#EAE0D2]/90 font-light leading-relaxed mb-10">
          Discover the beauty of handcrafted wooden creations, shaped by skilled artisans and inspired by timeless Indian craftsmanship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#25221F] bg-[#F7F3EC] hover:bg-[#A77B42] hover:text-white transition-all duration-300 shadow-xl"
          >
            <span>Explore Our Collections</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] border border-[#F7F3EC]/40 hover:border-[#A77B42] hover:bg-[#A77B42]/10 transition-all duration-300 backdrop-blur-xs cursor-pointer"
          >
            <span>Request An Enquiry</span>
          </button>
        </div>

        <div className="mt-14 pt-8 border-t border-[#A77B42]/25 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs tracking-wider uppercase text-[#EAE0D2]/80">
          <div className="flex flex-col items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C4975C]" />
            <span className="font-semibold text-white">Artisan Woodcarving</span>
            <span className="text-[10px] text-[#EAE0D2]/60 normal-case">Traditional Indian Craftsmanship</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C4975C]" />
            <span className="font-semibold text-white">Quality-Selected Timber</span>
            <span className="text-[10px] text-[#EAE0D2]/60 normal-case">Carefully Conditioned Wood</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center gap-1.5">
            <span className="text-sm font-serif font-bold text-[#C4975C]">B2B &amp; Export</span>
            <span className="font-semibold text-white">Custom Manufacturing</span>
            <span className="text-[10px] text-[#EAE0D2]/60 normal-case">Client Specification Ready</span>
          </div>
        </div>

      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#EAE0D2]/70 hover:text-white transition-colors"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#C4975C]" />
      </a>
    </section>
  );
};
