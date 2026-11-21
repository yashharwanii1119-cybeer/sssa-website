import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Globe, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import logoLight from '../assets/logo/sssa_logo.png';
import { collectionsData, CollectionItem } from '../data/collections';
import { openWhatsAppEnquiry } from '../utils/whatsapp';

interface NavbarProps {
  onOpenEnquiry?: (productName?: string) => void;
  onNavigateHome?: () => void;
  onNavigateCollections?: (categorySlug?: string) => void;
  onNavigateSubcategory?: (categorySlug: string, subcategorySlug: string) => void;
  currentPage?: 'home' | 'collections' | 'subcategory';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquiry,
  onNavigateHome,
  onNavigateCollections,
  onNavigateSubcategory,
  currentPage = 'home',
}) => {
  void onOpenEnquiry;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState<CollectionItem>(collectionsData[0]);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const navDropdownRef = useRef<HTMLDivElement>(null);
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

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
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

  const handleCategoryNavClick = (categorySlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateCollections) {
      onNavigateCollections(categorySlug);
    }
  };

  const handleSubcategoryNavClick = (categorySlug: string, subcategorySlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateSubcategory) {
      onNavigateSubcategory(categorySlug, subcategorySlug);
    }
  };

  const handleAllCollectionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateCollections) {
      onNavigateCollections('all');
    }
  };

  return (
    <>
      {/* Top Utility Bar: Slim antique-gold / warm-brown strip */}
      <div className="bg-[#382419] text-[#F7F3EC] text-xs font-medium py-1.5 sm:py-2 px-3 sm:px-6 lg:px-10 border-b border-[#A77B42]/25 relative z-50 overflow-hidden">
        <div className="max-w-[1536px] mx-auto flex flex-wrap justify-between items-center gap-1.5 sm:gap-6 tracking-wider text-[10px] sm:text-xs">
          
          {/* Highlight 1: Premium Wooden Handicrafts */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-semibold uppercase tracking-widest text-[#F7F3EC] text-[10px] sm:text-xs">
              Premium Wooden Handicrafts
            </span>
          </div>

          {/* Highlight 2: Made in India */}
          <div className="hidden xs:flex items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#A77B42]/30 text-[9px] sm:text-[10px] text-[#D4AF37] font-bold border border-[#A77B42]/60">
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-semibold tracking-wide text-[#F7F3EC] text-[10px] sm:text-xs">
              B2B &amp; Export
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

      {/* Main Navigation Row */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-md py-2 sm:py-3.5 border-b border-[#EAE0D2]'
            : 'bg-[#F7F3EC]/95 backdrop-blur-sm py-2.5 sm:py-5 border-b border-[#EAE0D2]/40'
        }`}
      >
        <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo on Left */}
            <a
              href="#home"
              onClick={handleHomeClick}
              className="flex items-center gap-2 group shrink-0 py-0.5 max-w-[200px] xs:max-w-[240px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[500px]"
            >
              <img
                src={logoLight}
                alt="Shree Shiv Shakti Art - Wooden Handicrafts Manufacturing and Export House"
                className="h-10 xs:h-12 sm:h-16 md:h-[80px] lg:h-[92px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </a>

            {/* Desktop Navigation Links + CTA Container */}
            <div className="hidden lg:flex items-center justify-end ml-12 xl:ml-20 gap-6 xl:gap-9 whitespace-nowrap">
              
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

                {/* Interactive Mega Menu for OUR COLLECTIONS */}
                <div
                  ref={navDropdownRef}
                  className="relative group py-2"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={handleAllCollectionsClick}
                    className="inline-flex items-center gap-1.5 text-xs xl:text-[13px] uppercase font-medium tracking-[0.16em] xl:tracking-[0.18em] text-[#25221F] hover:text-[#A77B42] transition-colors cursor-pointer py-1"
                  >
                    <span>Our Collections</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#A77B42] transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {megaMenuOpen && (
                    <div className="absolute top-full -left-20 xl:-left-24 w-[760px] xl:w-[860px] bg-[#FAF7F2] border border-[#A77B42]/30 shadow-2xl p-6 z-50 animate-fade-in backdrop-blur-md">
                      <div className="max-w-4xl mx-auto">
                        
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAE0D2]">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-[1.5px] bg-[#A77B42]"></span>
                            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A77B42]">
                              SSSA Master Portfolios
                            </span>
                          </div>
                          <button
                            onClick={handleAllCollectionsClick}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#382419] hover:text-[#A77B42] transition-colors cursor-pointer"
                          >
                            <span>Explore All Categories</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* 2-Column Mega Menu Content */}
                        <div className="grid grid-cols-12 gap-6">
                          
                          {/* Left Column: 6 Categories List */}
                          <div className="col-span-5 border-r border-[#EAE0D2] pr-4 space-y-1">
                            {collectionsData.map((category) => {
                              const isHovered = activeHoverCategory.id === category.id;
                              return (
                                <div
                                  key={category.id}
                                  onMouseEnter={() => setActiveHoverCategory(category)}
                                  onClick={(e) => handleCategoryNavClick(category.slug, e)}
                                  className={`group/cat flex items-center justify-between p-2.5 rounded-xs transition-all cursor-pointer ${
                                    isHovered
                                      ? 'bg-[#382419] text-[#F7F3EC] shadow-sm'
                                      : 'hover:bg-[#EAE0D2]/50 text-[#25221F]'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={category.image}
                                      alt={category.title}
                                      className="w-9 h-9 object-cover rounded-xs border border-[#A77B42]/40"
                                    />
                                    <div>
                                      <div className={`text-xs font-serif font-bold tracking-wide ${isHovered ? 'text-white' : 'text-[#382419]'}`}>
                                        {category.title}
                                      </div>
                                      <div className={`text-[10px] ${isHovered ? 'text-[#EAE0D2]/80' : 'text-[#7D6E63]'}`}>
                                        {category.subcategories.length} subcategories
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'text-[#C4975C] translate-x-1' : 'text-[#A77B42]'}`} />
                                </div>
                              );
                            })}
                          </div>

                          {/* Right Column: Dynamic Subcategories of the active category */}
                          <div className="col-span-7 pl-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EAE0D2]/70">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-[#A77B42] tracking-widest block">
                                    Subcategories in
                                  </span>
                                  <h4 className="text-sm font-serif font-bold text-[#382419]">
                                    {activeHoverCategory.title}
                                  </h4>
                                </div>
                                <button
                                  onClick={(e) => handleCategoryNavClick(activeHoverCategory.slug, e)}
                                  className="text-[11px] text-[#A77B42] hover:text-[#382419] font-medium underline cursor-pointer"
                                >
                                  View All ({activeHoverCategory.subcategories.length})
                                </button>
                              </div>

                              {/* Subcategories Grid: 2 columns */}
                              <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                                {activeHoverCategory.subcategories.map((sub) => (
                                  <button
                                    key={sub.id}
                                    onClick={(e) => handleSubcategoryNavClick(activeHoverCategory.slug, sub.slug, e)}
                                    className="text-left p-2 hover:bg-[#F3ECE1] transition-all group flex items-start gap-2 border border-transparent hover:border-[#EAE0D2] cursor-pointer"
                                  >
                                    <img
                                      src={sub.image}
                                      alt={sub.name}
                                      className="w-10 h-10 object-cover shrink-0 rounded-xs border border-[#EAE0D2]"
                                    />
                                    <div className="min-w-0">
                                      <div className="text-xs font-semibold text-[#25221F] group-hover:text-[#A77B42] transition-colors truncate">
                                        {sub.name}
                                      </div>
                                      <div className="text-[10px] text-[#7D6E63] font-light line-clamp-1 leading-tight mt-0.5">
                                        {sub.description}
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Subcategory Footer Link */}
                            <div className="pt-3 mt-3 border-t border-[#EAE0D2] flex items-center justify-between text-[11px] text-[#7D6E63]">
                              <span>Custom dimensions available on all items</span>
                              <button
                                onClick={(e) => handleCategoryNavClick(activeHoverCategory.slug, e)}
                                className="font-semibold text-[#382419] hover:text-[#A77B42] flex items-center gap-1 cursor-pointer uppercase tracking-wider text-[10.5px]"
                              >
                                <span>Go To {activeHoverCategory.title} Page</span>
                                <ArrowUpRight className="w-3 h-3 text-[#A77B42]" />
                              </button>
                            </div>
                          </div>

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

              {/* Dedicated CTA Enquiry Button */}
              <div className="pl-3 xl:pl-5 border-l border-[#A77B42]/20">
                <button
                  onClick={() => openWhatsAppEnquiry()}
                  className="group relative inline-flex items-center justify-center gap-2 px-5 xl:px-6 py-2.5 xl:py-3 overflow-hidden text-xs uppercase tracking-widest font-semibold text-white bg-[#382419] border border-[#382419] rounded-none shadow-sm hover:bg-[#A77B42] hover:border-[#A77B42] transition-all duration-300 cursor-pointer shrink-0"
                >
                  <span>Request An Enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

            </div>

            {/* Mobile / Tablet Menu Controls */}
            <div className="lg:hidden flex items-center gap-2 shrink-0">
              <button
                onClick={() => openWhatsAppEnquiry()}
                className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-2.5 sm:px-3 py-1.5 bg-[#382419] text-white hover:bg-[#A77B42] transition-colors shrink-0"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[#382419] hover:text-[#A77B42] transition-colors focus:outline-none cursor-pointer shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer with Accordion */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F3EC] border-b border-[#EAE0D2] shadow-xl px-4 pt-3 pb-6 transition-all duration-300 max-h-[85vh] overflow-y-auto">
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
                  <div className="pl-3 pr-2 pb-2 space-y-2 bg-[#EAE0D2]/30 my-1 py-2">
                    <button
                      onClick={handleAllCollectionsClick}
                      className="w-full text-left text-xs font-bold uppercase tracking-wider text-[#A77B42] flex items-center justify-between py-1 border-b border-[#EAE0D2]"
                    >
                      <span>Explore All Collections</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {collectionsData.map((cat) => {
                      const isExpanded = mobileExpandedCat === cat.id;
                      return (
                        <div key={cat.id} className="border-b border-[#EAE0D2]/50 pb-1">
                          <div className="flex items-center justify-between py-1.5">
                            <button
                              onClick={(e) => handleCategoryNavClick(cat.slug, e)}
                              className="text-xs font-serif font-bold text-[#382419] text-left hover:text-[#A77B42]"
                            >
                              {cat.title}
                            </button>
                            <button
                              onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                              className="p-1 text-[#7D6E63] hover:text-[#382419]"
                            >
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </div>

                          {/* Subcategory Accordion List */}
                          {isExpanded && (
                            <div className="pl-3 pr-1 py-1 space-y-1 bg-white/60">
                              {cat.subcategories.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={(e) => handleSubcategoryNavClick(cat.slug, sub.slug, e)}
                                  className="w-full text-left py-1 text-[11px] text-[#59534C] hover:text-[#A77B42] flex items-center justify-between"
                                >
                                  <span>• {sub.name}</span>
                                  <ChevronRight className="w-3 h-3 text-[#A77B42]" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                    openWhatsAppEnquiry();
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
