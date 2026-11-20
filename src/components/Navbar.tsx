import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Globe, Sparkles, ChevronDown } from 'lucide-react';
import logoLight from '../assets/logo/sssa_logo.png';
import { collectionsData } from '../data/collections';

interface NavbarProps {
  onOpenEnquiry: (productName?: string) => void;
  onNavigateHome?: () => void;
  onNavigateCollections?: (categoryName?: string) => void;
  currentPage?: 'home' | 'collections';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquiry,
  onNavigateHome,
  onNavigateCollections,
  currentPage = 'home',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Safe dropdown hover handlers with slight delay to prevent abrupt closing
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCollectionsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdownOpen(false);
    }, 150);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCollectionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (currentPage !== 'home' && onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  const handleCategoryClick = (catTitle: string, e: React.MouseEvent) => {
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateCollections) {
      e.preventDefault();
      onNavigateCollections(catTitle);
    }
  };

  const handleAllCollectionsClick = (e: React.MouseEvent) => {
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateCollections) {
      e.preventDefault();
      onNavigateCollections('All Products');
    }
  };

  return (
    <>
      {/* Top Utility Bar: Slim antique-gold / warm-brown strip */}
      <div className="bg-[#382419] text-[#F7F3EC] text-xs font-medium py-2 px-4 sm:px-6 lg:px-10 border-b border-[#A77B42]/25 relative z-50">
        <div className="max-w-[1536px] mx-auto flex flex-wrap justify-between items-center gap-2 sm:gap-6 tracking-wider text-[11px] sm:text-xs">
          
          {/* Highlight 1: Premium Wooden Handicrafts */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-semibold uppercase tracking-widest text-[#F7F3EC]">
              Premium Wooden Handicrafts
            </span>
          </div>

          {/* Highlight 2: Made in India */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#A77B42]/30 text-[10px] text-[#D4AF37] font-bold border border-[#A77B42]/60">
              🇮🇳
            </span>
            <span className="font-semibold tracking-wider text-[#F7F3EC]">
              Made in India
            </span>
            <span className="hidden sm:inline text-[#A77B42]/70">•</span>
            <span className="hidden sm:inline text-[#EAE0D2]/80 text-[11px] normal-case">
              Generations of Authentic Woodcraft
            </span>
          </div>

          {/* Highlight 3: Worldwide B2B & Export Enquiries */}
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-semibold tracking-wide text-[#F7F3EC]">
              Worldwide B2B &amp; Export Enquiries
            </span>
            <a
              href="#contact"
              onClick={handleHomeClick}
              className="ml-1 text-[#D4AF37] hover:text-white underline underline-offset-2 transition-colors font-medium hidden md:inline"
            >
              Contact Desk
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Row: Clean ivory background */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-md py-3 sm:py-3.5 border-b border-[#EAE0D2]'
            : 'bg-[#F7F3EC]/95 backdrop-blur-sm py-4 sm:py-5 border-b border-[#EAE0D2]/40'
        }`}
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo on Left: Fixed on the left edge with generous breathing room */}
            <a
              href="#home"
              onClick={handleHomeClick}
              className="flex items-center gap-3 group shrink-0 py-0.5"
            >
              <img
                src={logoLight}
                alt="Shree Shiv Shakti Art - Wooden Handicrafts Manufacturing and Export House"
                className="h-16 sm:h-20 md:h-[88px] lg:h-[92px] w-auto max-w-[300px] sm:max-w-[390px] md:max-w-[460px] lg:max-w-[500px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </a>

            {/* Desktop Navigation Links + CTA Container: Placed on the right with noticeable separation from Logo (50-70px extra gap) */}
            <div className="hidden lg:flex items-center justify-end ml-12 xl:ml-20 gap-6 xl:gap-9 whitespace-nowrap">
              
              {/* Navigation Items with relaxed, airy horizontal spacing */}
              <div className="flex items-center space-x-6 xl:space-x-8">
                <a
                  href="#home"
                  onClick={handleHomeClick}
                  className="text-xs xl:text-[13px] uppercase font-medium tracking-[0.16em] xl:tracking-[0.18em] text-[#25221F] hover:text-[#A77B42] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A77B42] hover:after:w-full after:transition-all after:duration-300"
                >
                  Home
                </a>

                <a
                  href="#about"
                  onClick={handleHomeClick}
                  className="text-xs xl:text-[13px] uppercase font-medium tracking-[0.16em] xl:tracking-[0.18em] text-[#25221F] hover:text-[#A77B42] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A77B42] hover:after:w-full after:transition-all after:duration-300"
                >
                  About Us
                </a>

                {/* Collections with Dropdown */}
                <div
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="#collections"
                    className="text-xs xl:text-[13px] uppercase font-medium tracking-[0.16em] xl:tracking-[0.18em] text-[#25221F] hover:text-[#A77B42] transition-colors inline-flex items-center gap-1.5 xl:gap-2 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A77B42] hover:after:w-full after:transition-all after:duration-300"
                    onClick={(e) => {
                      if (onNavigateCollections) {
                        e.preventDefault();
                        onNavigateCollections('All Products');
                      } else {
                        setCollectionsDropdownOpen((prev) => !prev);
                      }
                    }}
                  >
                    <span>Our Collections</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${collectionsDropdownOpen ? 'rotate-180 text-[#A77B42]' : 'text-[#7D6E63]'}`} />
                  </a>

                  {/* Dropdown Menu - 6 Categories with descriptions, subtle separators, spacious layout */}
                  {collectionsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 pt-3.5 w-[370px] z-50 animate-fadeIn"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-[#FAF7F2] border border-[#EAE0D2] shadow-2xl rounded-none py-4 px-3 backdrop-blur-md">
                        {/* 6 Category Items */}
                        <div className="divide-y divide-[#EAE0D2]/70">
                          {collectionsData.map((cat) => (
                            <a
                              key={cat.id}
                              href={`#collection-${cat.id}`}
                              onClick={(e) => handleCategoryClick(cat.title, e)}
                              className="block py-3 px-3 hover:bg-[#F3ECE1]/80 transition-colors group/item rounded-none"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[14px] font-serif font-semibold tracking-wide text-[#25221F] group-hover/item:text-[#A77B42] transition-colors">
                                  {cat.title}
                                </span>
                                <span className="text-[11px] text-[#A77B42] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all">
                                  →
                                </span>
                              </div>
                              <p className="text-[11.5px] text-[#7D6E63] font-light mt-0.5 tracking-normal leading-snug">
                                {cat.subtitle}
                              </p>
                            </a>
                          ))}
                        </div>

                        {/* Bottom Link: Explore All Collections */}
                        <div className="mt-3 pt-3 border-t border-[#EAE0D2] px-3">
                          <button
                            onClick={handleAllCollectionsClick}
                            className="w-full text-left text-[12px] uppercase tracking-wider font-semibold text-[#382419] hover:text-[#A77B42] flex items-center justify-between py-1 transition-colors cursor-pointer"
                          >
                            <span>Explore All Collections</span>
                            <ArrowUpRight className="w-4 h-4 text-[#A77B42]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href="#craftsmanship"
                  onClick={handleHomeClick}
                  className="text-xs xl:text-[13px] uppercase font-medium tracking-[0.16em] xl:tracking-[0.18em] text-[#25221F] hover:text-[#A77B42] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A77B42] hover:after:w-full after:transition-all after:duration-300"
                >
                  Craftsmanship
                </a>

                <a
                  href="#contact"
                  onClick={handleHomeClick}
                  className="text-xs xl:text-[13px] uppercase font-medium tracking-[0.16em] xl:tracking-[0.18em] text-[#25221F] hover:text-[#A77B42] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A77B42] hover:after:w-full after:transition-all after:duration-300"
                >
                  Contact
                </a>
              </div>

              {/* Distinct separation & CTA Enquiry Button */}
              <div className="pl-3 xl:pl-5 border-l border-[#A77B42]/20">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="group relative inline-flex items-center justify-center gap-2 px-5 xl:px-6 py-2.5 xl:py-3 overflow-hidden text-xs uppercase tracking-widest font-semibold text-white bg-[#382419] border border-[#382419] rounded-none shadow-sm hover:bg-[#A77B42] hover:border-[#A77B42] transition-all duration-300 cursor-pointer shrink-0"
                >
                  <span>Request An Enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

            </div>

            {/* Mobile / Tablet Menu Controls */}
            <div className="lg:hidden flex items-center gap-2.5">
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F3EC] border-b border-[#EAE0D2] shadow-xl px-4 pt-3 pb-6 transition-all duration-300">
            <div className="flex flex-col space-y-2">
              <a
                href="#home"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleHomeClick(e);
                }}
                className="text-sm uppercase tracking-widest font-medium py-2.5 px-2 text-[#25221F] border-b border-[#EAE0D2]/50 hover:text-[#A77B42] transition-all"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleHomeClick(e);
                }}
                className="text-sm uppercase tracking-widest font-medium py-2.5 px-2 text-[#25221F] border-b border-[#EAE0D2]/50 hover:text-[#A77B42] transition-all"
              >
                About Us
              </a>

              {/* Mobile Collections Expandable */}
              <div className="border-b border-[#EAE0D2]/50">
                <button
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                  className="w-full flex items-center justify-between text-sm uppercase tracking-widest font-medium py-2.5 px-2 text-[#25221F] hover:text-[#A77B42] transition-all text-left"
                >
                  <span>Our Collections</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCollectionsOpen ? 'rotate-180 text-[#A77B42]' : ''}`} />
                </button>
                {mobileCollectionsOpen && (
                  <div className="pl-3 pr-2 pb-2 divide-y divide-[#EAE0D2]/50 bg-[#EAE0D2]/30 my-1">
                    {collectionsData.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={(e) => handleCategoryClick(cat.title, e)}
                        className="w-full text-left block py-2.5 px-1 hover:text-[#A77B42] transition-colors"
                      >
                        <div className="text-xs font-serif font-semibold text-[#25221F]">
                          • {cat.title}
                        </div>
                        <div className="text-[10.5px] text-[#7D6E63] font-light pl-3 mt-0.5">
                          {cat.subtitle}
                        </div>
                      </button>
                    ))}
                    <div className="pt-2 px-1">
                      <button
                        onClick={handleAllCollectionsClick}
                        className="w-full text-left text-xs font-semibold uppercase tracking-wider text-[#382419] flex items-center justify-between py-1"
                      >
                        <span>Explore All Collections</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#craftsmanship"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleHomeClick(e);
                }}
                className="text-sm uppercase tracking-widest font-medium py-2.5 px-2 text-[#25221F] border-b border-[#EAE0D2]/50 hover:text-[#A77B42] transition-all"
              >
                Craftsmanship
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleHomeClick(e);
                }}
                className="text-sm uppercase tracking-widest font-medium py-2.5 px-2 text-[#25221F] border-b border-[#EAE0D2]/50 hover:text-[#A77B42] transition-all"
              >
                Contact
              </a>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors"
                >
                  <span>Request An Enquiry</span>
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
