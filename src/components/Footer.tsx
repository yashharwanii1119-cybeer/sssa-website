import React from 'react';
import { ArrowUp, Mail, MapPin, Globe, Shield, Sparkles } from 'lucide-react';
import logoLight from '../assets/logo/sssa_logo_light.png';
import { collectionsData } from '../data/collections';
import { openWhatsAppEnquiry } from '../utils/whatsapp';
import { getAssetPath } from '../utils/paths';

interface FooterProps {
  onOpenEnquiry?: (subject?: string) => void;
  onNavigateHome?: () => void;
  onNavigateCollections?: (categoryName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEnquiry,
  onNavigateHome,
  onNavigateCollections,
}) => {
  void onOpenEnquiry;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home', isHome: true },
    { name: 'About Us', href: '#about', isHome: true },
    { name: 'Our Collections', href: '#collections', isHome: false },
    { name: 'Craftsmanship', href: '#craftsmanship', isHome: true },
    { name: 'Contact', href: '#contact', isHome: true },
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
                className="h-16 sm:h-20 w-auto max-w-[320px] sm:max-w-[380px] object-contain"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-[#EAE0D2]/80 font-light leading-relaxed max-w-sm">
              Shree Shiv Shakti Art is a wooden handicrafts manufacturing and export house based in Jodhpur, India, specializing in hand-carved furniture and authentic traditional wooden artwork.
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
                  {link.name === 'Our Collections' ? (
                    <button
                      onClick={() => onNavigateCollections && onNavigateCollections('All Products')}
                      className="hover:text-[#C4975C] transition-colors inline-block text-left cursor-pointer"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => onNavigateHome && onNavigateHome()}
                      className="hover:text-[#C4975C] transition-colors inline-block"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white border-b border-[#A77B42]/30 pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EAE0D2]/80">
              {collectionsData.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigateCollections && onNavigateCollections(cat.title)}
                    className="hover:text-[#C4975C] transition-colors inline-block text-left cursor-pointer"
                  >
                    {cat.title}
                  </button>
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
                <a
                  href="mailto:Info@shreeshivshaktiart.com"
                  className="hover:text-[#C4975C] transition-colors break-all"
                >
                  Info@shreeshivshaktiart.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#C4975C] shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/919929291844"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C4975C] transition-colors"
                >
                  WhatsApp: +91 99292 91844
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4975C] shrink-0 mt-0.5" />
                <a
                  href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Plot No. 3, Khasra No. 54/5, Salawas Road, Jodhpur, Rajasthan – 342001, India")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C4975C] transition-colors leading-relaxed break-words"
                  title="Open Factory Location in Google Maps"
                >
                  Plot No. 3, Khasra No. 54/5, Salawas Road, Jodhpur, Rajasthan – 342001, India.
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openWhatsAppEnquiry('Export Quote Request')}
                className="w-full py-2.5 bg-[#A77B42] text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#25221F] transition-colors cursor-pointer"
              >
                Request Quotation
              </button>
            </div>
          </div>

        </div>

        {/* Dedicated Sustainability & Responsible Sourcing Area */}
        <div className="py-10 border-b border-[#A77B42]/20">
          <div className="bg-[#1f130d] border border-[#A77B42]/30 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8">
              
              {/* Text & Compliance Content */}
              <div className="flex-1 space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-[1.5px] bg-[#C4975C]"></span>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C4975C] uppercase">
                    Ethical Forestry &amp; Global Compliance
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-serif text-white tracking-wide">
                  SUSTAINABILITY &amp; RESPONSIBLE SOURCING
                </h4>

                <p className="text-xs sm:text-sm text-[#EAE0D2]/80 font-light leading-relaxed max-w-3xl">
                  Committed to responsible wood sourcing, legally procured timber, sustainable forestry practices and EUDR compliance. We strive to support transparent and responsible supply chains while preserving the art of traditional woodworking.
                </p>

                <div className="pt-1">
                  <span className="inline-block text-xs sm:text-[13px] font-medium tracking-wider text-[#C4975C] uppercase bg-[#271911] border border-[#A77B42]/40 px-3.5 py-1.5">
                    Responsible Wood Sourcing &nbsp;|&nbsp; FSC &nbsp;|&nbsp; EUDR Compliance
                  </span>
                </div>
              </div>

              {/* Verified Logos Display */}
              <div className="shrink-0 flex items-center justify-center gap-4 sm:gap-6">
                {/* Logo 1: Riksh - Legally Procured Wood */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F7F3EC] rounded-xl p-2 flex items-center justify-center shadow-lg border border-[#A77B42]/30 transition-transform duration-300 hover:scale-105">
                    <img
                      src={getAssetPath('/images/cert_vriksh.png')}
                      alt="Made From Legally Procured Wood - Vriksh"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-[#EAE0D2]/70 font-medium tracking-wider uppercase mt-2">
                    Vriksh Certified
                  </span>
                </div>

                {/* Logo 2: FSC */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F7F3EC] rounded-xl p-2 flex items-center justify-center shadow-lg border border-[#A77B42]/30 transition-transform duration-300 hover:scale-105">
                    <img
                      src={getAssetPath('/images/cert_fsc.png')}
                      alt="FSC - Forest Stewardship Council"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-[#EAE0D2]/70 font-medium tracking-wider uppercase mt-2">
                    FSC Standard
                  </span>
                </div>
              </div>

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
