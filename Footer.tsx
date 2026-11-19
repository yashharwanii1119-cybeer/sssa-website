import React from 'react';
import { ArrowUp, Mail, MapPin, Globe, Shield, Sparkles } from 'lucide-react';
import logoLight from '../assets/logo/sssa_logo_light.png';

interface FooterProps {
  onOpenEnquiry: (subject?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Collections', href: '#collections' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Manufacturing', href: '#manufacturing' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const collections = [
    'Hand-Carved Furniture',
    'Wooden Handicrafts',
    'Decorative Wooden Art',
    'Wooden Home Décor',
    'Traditional Craftsmanship',
    'Custom Wooden Creations',
  ];

  return (
    <footer className="bg-[#271911] text-[#EAE0D2] border-t border-[#A77B42]/30 relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#A77B42] via-[#C4975C] to-[#A77B42]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#A77B42]/20">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logoLight}
                alt="Shree Shiv Shakti Art"
                className="h-12 w-auto object-contain"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-[#EAE0D2]/80 font-light leading-relaxed max-w-sm">
              Shree Shiv Shakti Art is a wooden handicrafts manufacturing and export house specializing in hand-carved furniture and authentic traditional Indian wooden artwork.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#C4975C]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Export Oriented
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Handcrafted Quality
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#A77B42]/30 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EAE0D2]/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#C4975C] transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#A77B42]/30 pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EAE0D2]/80">
              {collections.map((cat) => (
                <li key={cat}>
                  <a
                    href="#collections"
                    className="hover:text-[#C4975C] transition-colors inline-block"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#A77B42]/30 pb-2">
              Enquiries
            </h4>
            <div className="space-y-3 text-xs text-[#EAE0D2]/80">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C4975C] shrink-0 mt-0.5" />
                <span>[Official Email to be provided]</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#C4975C] shrink-0 mt-0.5" />
                <span>Manufacturing &amp; Export Services</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4975C] shrink-0 mt-0.5" />
                <span>[Factory Address to be provided, India]</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry('Export Quote Request')}
                className="w-full py-2.5 bg-[#A77B42] text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#25221F] transition-colors cursor-pointer"
              >
                Request Quotation
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAE0D2]/60">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-[#EAE0D2]">Shree Shiv Shakti Art</strong>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C4975C] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
