import React from 'react';
import { ArrowUpRight, Compass, Hammer } from 'lucide-react';
import emblem from '../assets/logo/sssa_emblem.png';
import { getAssetPath } from '../utils/paths';

interface AboutProps {
  onOpenEnquiry: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F7F3EC] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 rounded-full bg-[#EAE0D2]/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
              About Shree Shiv Shakti Art
            </span>
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight leading-tight">
            Crafted With Heritage. <br />
            <span className="italic font-light text-[#A77B42]">Created For Generations.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={getAssetPath("/images/about.jpg")}
                  alt="Artisan crafting wooden furniture with hand tools"
                  className="w-full h-[450px] sm:h-[520px] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs border-l-2 border-[#A77B42]">
                  <p className="text-xs tracking-widest uppercase font-semibold text-[#C4975C]">Artisanal Workmanship</p>
                  <p className="text-sm font-light text-[#EAE0D2]">Every detail reflects careful hand carving and time-honored woodworking techniques.</p>
                </div>
              </div>

              <div className="hidden sm:block absolute -bottom-8 -right-8 w-56 p-5 bg-[#EAE0D2] border border-[#A77B42]/30 shadow-xl">
                <img src={emblem} alt="SSSA" className="w-8 h-8 object-contain mb-2 opacity-80" />
                <p className="text-xs font-serif font-bold text-[#382419] tracking-wider uppercase">Export-Oriented</p>
                <p className="text-[11px] text-[#59534C] mt-1 leading-relaxed">
                  Timber conditioning, hand-carved detailing, and protective packaging suitable for export shipments.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#EAE0D2] text-[#382419] text-[11px] tracking-widest uppercase font-semibold">
              Wooden Handicrafts Manufacturing &amp; Export House
            </div>

            <p className="text-lg text-[#382419] font-serif leading-relaxed">
              At <strong className="font-semibold">Shree Shiv Shakti Art</strong>, wood is shaped into timeless art. As an Indian wooden handicrafts manufacturing and export house, we take pride in presenting handcrafted furniture and decorative wooden creations designed for discerning clients and businesses.
            </p>

            <p className="text-sm sm:text-base text-[#59534C] leading-relaxed font-light">
              We work with furniture retailers, interior designers, and commercial buyers seeking distinctive handcrafted woodwork. Combining authentic artisan skills with attentive client service, we deliver wooden creations tailored to both classical and contemporary spaces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE0D2]">
              <div className="p-4 bg-white/70 border border-[#EAE0D2] transition-colors hover:border-[#A77B42]">
                <Hammer className="w-5 h-5 text-[#A77B42] mb-2" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">Hand-Carved Detailing</h3>
                <p className="text-xs text-[#59534C] mt-1 leading-relaxed">
                  Deep relief carvings and traditional patterns shaped by skilled wood artisans.
                </p>
              </div>

              <div className="p-4 bg-white/70 border border-[#EAE0D2] transition-colors hover:border-[#A77B42]">
                <Compass className="w-5 h-5 text-[#A77B42] mb-2" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">Custom Adaptability</h3>
                <p className="text-xs text-[#59534C] mt-1 leading-relaxed">
                  Flexible dimensions, customizable wood finishes, and safe export packing options.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors duration-300 cursor-pointer"
              >
                <span>Partner With SSSA</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="#craftsmanship"
                className="text-xs uppercase tracking-widest font-semibold text-[#382419] hover:text-[#A77B42] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Craftsmanship</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
