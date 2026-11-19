import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import emblem from '../assets/logo/sssa_emblem.png';

interface EnquirySectionProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="relative py-24 sm:py-28 bg-[#271911] text-[#F7F3EC] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/enquiry_bg.jpg"
          alt="Bespoke furniture craftsmanship"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#271911] via-[#271911]/95 to-[#271911]/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6">
          <img
            src={emblem}
            alt="SSSA Crest"
            className="w-10 h-10 object-contain mx-auto opacity-90 filter brightness-110"
          />
        </div>

        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-[1px] bg-[#A77B42]"></span>
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C4975C]">
            Custom Manufacturing &amp; B2B Enquiries
          </span>
          <span className="w-6 h-[1px] bg-[#A77B42]"></span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight mb-6">
          Have A Vision? <br className="hidden sm:inline" />
          <span className="italic font-light text-[#EAE0D2]">Let’s Craft It Together.</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#EAE0D2]/90 font-light leading-relaxed mb-10">
          From distinctive wooden creations to custom manufacturing requirements, connect with our team to discuss your next project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenEnquiry('Custom Manufacturing / B2B Enquiry')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A77B42] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-[#25221F] transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>Request A Business Enquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#F7F3EC]/30 text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-semibold hover:border-[#A77B42] hover:bg-[#A77B42]/10 transition-colors"
          >
            <span>View Contact Information</span>
          </a>
        </div>

        <div className="mt-14 pt-8 border-t border-[#A77B42]/20 flex flex-wrap justify-center gap-8 text-xs text-[#EAE0D2]/70 font-light uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4975C]" /> Custom Dimensioning
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4975C]" /> Tailored Timber Finishes
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4975C]" /> Export Packaging Support
          </span>
        </div>
      </div>
    </section>
  );
};
