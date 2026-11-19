import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe, Mail } from 'lucide-react';
import logoLight from '../assets/logo/sssa_logo.png';

interface NavbarProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Collections', href: '#collections' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Manufacturing', href: '#manufacturing' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="bg-[#382419] text-[#F7F3EC] text-xs font-medium py-2 px-4 border-b border-[#A77B42]/20 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] inline-block animate-pulse"></span>
            <span>Wooden Handicrafts Manufacturing &amp; Global Export House</span>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-[#EAE0D2]/90 normal-case tracking-normal">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#A77B42]" /> Serving International B2B Importers &amp; Designers
            </span>
            <a href="#contact" className="hover:text-[#A77B42] transition-colors flex items-center gap-1 font-medium">
              <Mail className="w-3 h-3 text-[#A77B42]" /> Export Inquiries Welcome
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-md py-3 border-b border-[#EAE0D2]'
            : 'bg-[#F7F3EC]/80 backdrop-blur-sm py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src={logoLight}
                alt="Shree Shiv Shakti Art"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>

            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase font-medium tracking-[0.16em] text-[#25221F] hover:text-[#A77B42] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A77B42] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onOpenEnquiry()}
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 overflow-hidden text-xs uppercase tracking-widest font-semibold text-white bg-[#382419] border border-[#382419] rounded-none shadow-sm hover:bg-[#A77B42] hover:border-[#A77B42] transition-all duration-300 cursor-pointer"
              >
                <span>Request An Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="sm:hidden text-xs uppercase tracking-wider font-semibold px-3 py-1.5 bg-[#382419] text-white"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#382419] hover:text-[#A77B42] transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F3EC] border-b border-[#EAE0D2] shadow-xl px-4 pt-3 pb-6 transition-all duration-300">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-medium py-2 px-2 text-[#25221F] border-b border-[#EAE0D2]/50 hover:text-[#A77B42] hover:pl-4 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors"
                >
                  <span>Request A Business Enquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
