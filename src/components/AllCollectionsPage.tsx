import React, { useState, useMemo, useRef } from 'react';
import { Search, ArrowRight, ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { collectionsData } from '../data/collections';
import { getAssetPath } from '../utils/paths';

interface AllCollectionsPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: (productName?: string) => void;
  onViewProductModal: (product?: any) => void;
  onSelectSubcategory: (categorySlug: string, subcategorySlug: string) => void;
  onSelectCategory: (categorySlug: string) => void;
  initialCategorySlug?: string;
}

export const AllCollectionsPage: React.FC<AllCollectionsPageProps> = ({
  onBackToHome,
  onSelectSubcategory,
  onSelectCategory,
  initialCategorySlug = 'all',
}) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive hover dropdown state
  const [hoveredTabSlug, setHoveredTabSlug] = useState<string | null>(null);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = useMemo(() => collectionsData, []);

  // Handle smooth mouse enter on tabs with slight debouncing to avoid flicker
  const handleTabMouseEnter = (slug: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredTabSlug(slug);
  };

  const handleTabMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredTabSlug(null);
    }, 180);
  };

  // Filtered categories and subcategories based on search query and selected tab
  const displayedCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .filter((cat) => {
        if (selectedCategorySlug === 'all') return true;
        return cat.slug.toLowerCase() === selectedCategorySlug.toLowerCase();
      })
      .map((cat) => {
        if (!query) return cat;

        // Filter subcategories by query
        const matchingSubs = cat.subcategories.filter((sub) => {
          return (
            sub.name.toLowerCase().includes(query) ||
            sub.description.toLowerCase().includes(query) ||
            cat.title.toLowerCase().includes(query)
          );
        });

        return {
          ...cat,
          subcategories: matchingSubs,
        };
      })
      .filter((cat) => cat.subcategories.length > 0);
  }, [categories, selectedCategorySlug, searchQuery]);

  // Total matching subcategories count
  const totalSubcategoriesCount = useMemo(() => {
    return displayedCategories.reduce((acc, cat) => acc + cat.subcategories.length, 0);
  }, [displayedCategories]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#25221F]">
      
      {/* =========================================================================
          Breadcrumb Navigation
      ========================================================================= */}
      <div className="bg-[#F3ECE1]/70 border-b border-[#EAE0D2] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-wider uppercase">
          <nav className="flex items-center gap-2 text-[#7D6E63]">
            <button
              onClick={onBackToHome}
              className="hover:text-[#A77B42] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#382419] font-bold">Collections</span>
            {selectedCategorySlug !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#A77B42] font-semibold">
                  {categories.find((c) => c.slug === selectedCategorySlug)?.title}
                </span>
              </>
            )}
          </nav>
          
          <button
            onClick={onBackToHome}
            className="text-[11px] text-[#A77B42] hover:text-[#382419] transition-colors uppercase tracking-widest font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>← Return to Home</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          A. Premium Hero Section
      ========================================================================= */}
      <section className="relative py-18 sm:py-26 bg-[#271911] text-[#F7F3EC] overflow-hidden text-center">
        {/* Subtle Luxury Ambience & Background Image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={getAssetPath("/images/about_european_interior.jpg")}
            alt="Interior Ambience"
            className="w-full h-full object-cover object-center filter grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#271911] via-[#271911]/90 to-black/40 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2.5 mb-1">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.28em] text-[#D4AF37]">
              OUR COLLECTIONS
            </span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white leading-tight">
            Crafted For Distinctive Spaces
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#EAE0D2]/90 font-light leading-relaxed">
            Explore our curated range of handcrafted wooden furniture, combining authentic Indian artistry, premium materials and timeless design.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
            <span>6 Core Collections</span>
            <span>•</span>
            <span>30 Specialized Subcategories</span>
            <span>•</span>
            <span>Worldwide Export Quality</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          B. Search Section
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-[#A77B42] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 30 subcategories (e.g. Sideboards, Beds, Bar Tables)..."
              className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#EAE0D2] rounded-none text-sm text-[#25221F] placeholder-[#7D6E63]/70 focus:outline-none focus:border-[#A77B42] focus:ring-1 focus:ring-[#A77B42] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7D6E63] hover:text-[#382419] font-medium px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            C. Main Category Navigation (Interactive Dropdowns & Mega-Menu)
        ========================================================================= */}
        <div className="relative mb-14">
          
          {/* Desktop Filter Tabs Row */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-2.5">
            {/* 1. All Collections Tab (Hover dropdown disabled; click enables full view) */}
            <button
              onClick={() => {
                setSelectedCategorySlug('all');
                setHoveredTabSlug(null);
                onSelectCategory('all');
              }}
              className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 border cursor-pointer inline-flex items-center gap-1.5 ${
                selectedCategorySlug === 'all'
                  ? 'bg-[#382419] text-[#F7F3EC] border-[#382419] shadow-md'
                  : 'bg-white text-[#59534C] border-[#EAE0D2] hover:border-[#A77B42] hover:text-[#382419]'
              }`}
            >
              <span>All Collections</span>
            </button>

            {/* 2 to 7. Individual Main Category Tabs with Dropdown Menu */}
            {categories.map((cat) => {
              const isSelected = selectedCategorySlug === cat.slug;
              const isHovered = hoveredTabSlug === cat.slug;

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => handleTabMouseEnter(cat.slug)}
                  onMouseLeave={handleTabMouseLeave}
                >
                  <button
                    onClick={() => {
                      setSelectedCategorySlug(cat.slug);
                      setHoveredTabSlug(null);
                      onSelectCategory(cat.slug);
                    }}
                    className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 border cursor-pointer inline-flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#382419] text-[#F7F3EC] border-[#382419] shadow-md'
                        : 'bg-white text-[#59534C] border-[#EAE0D2] hover:border-[#A77B42] hover:text-[#382419]'
                    }`}
                  >
                    <span>{cat.title}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? 'rotate-180 text-[#A77B42]' : 'text-[#7D6E63]'}`} />
                  </button>

                  {/* Individual Subcategories Dropdown Panel */}
                  {isHovered && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[380px] z-50 animate-fadeIn"
                      onMouseEnter={() => handleTabMouseEnter(cat.slug)}
                      onMouseLeave={handleTabMouseLeave}
                    >
                      <div className="bg-[#FAF7F2] border border-[#EAE0D2] shadow-2xl rounded-none p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EAE0D2]">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A77B42]">
                              {cat.subcategories.length} Subcategories in
                            </span>
                            <h4 className="text-sm font-serif font-bold text-[#382419]">
                              {cat.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedCategorySlug(cat.slug);
                              setHoveredTabSlug(null);
                              onSelectCategory(cat.slug);
                            }}
                            className="text-[11px] text-[#A77B42] hover:text-[#382419] font-semibold underline cursor-pointer"
                          >
                            View All
                          </button>
                        </div>

                        {/* List of subcategories with image thumbnails */}
                        <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setHoveredTabSlug(null);
                                onSelectSubcategory(cat.slug, sub.slug);
                              }}
                              className="w-full text-left p-2 rounded-none hover:bg-[#F3ECE1] transition-all group flex items-center justify-between border border-transparent hover:border-[#EAE0D2] cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-9 h-9 object-cover rounded-xs shrink-0 border border-[#EAE0D2]"
                                />
                                <div className="truncate">
                                  <div className="text-xs font-semibold text-[#25221F] group-hover:text-[#A77B42] transition-colors truncate">
                                    {sub.name}
                                  </div>
                                  <div className="text-[10px] text-[#7D6E63] font-light truncate">
                                    {sub.description}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#A77B42] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Accordion Category Navigation */}
          <div className="lg:hidden bg-white border border-[#EAE0D2] p-3 shadow-xs">
            <div className="text-xs uppercase font-bold text-[#A77B42] tracking-wider mb-2 flex items-center justify-between">
              <span>Filter by Category &amp; Subcategories:</span>
              <span className="text-[10px] text-[#7D6E63] normal-case">Tap to expand</span>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategorySlug('all');
                  setMobileExpandedTab(null);
                  onSelectCategory('all');
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  selectedCategorySlug === 'all' ? 'bg-[#382419] text-white' : 'hover:bg-[#FAF7F2] text-[#25221F]'
                }`}
              >
                All Collections (30 Subcategories)
              </button>

              {categories.map((cat) => {
                const isSelected = selectedCategorySlug === cat.slug;
                const isExpanded = mobileExpandedTab === cat.id;

                return (
                  <div key={cat.id} className="border-t border-[#EAE0D2]/60 pt-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedCategorySlug(cat.slug);
                          onSelectCategory(cat.slug);
                        }}
                        className={`text-left text-xs font-serif font-bold py-1.5 px-2 flex-grow ${
                          isSelected ? 'text-[#A77B42]' : 'text-[#382419]'
                        }`}
                      >
                        {cat.title} ({cat.subcategories.length})
                      </button>
                      <button
                        onClick={() => setMobileExpandedTab(isExpanded ? null : cat.id)}
                        className="p-1.5 text-[#7D6E63]"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pl-4 pr-1 py-1 space-y-1 bg-[#FAF7F2] my-1">
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => onSelectSubcategory(cat.slug, sub.slug)}
                            className="w-full text-left py-1 text-xs text-[#59534C] hover:text-[#A77B42] flex items-center justify-between"
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
          </div>

        </div>

        {/* Search Results Summary Banner if searching */}
        {searchQuery && (
          <div className="mb-10 p-4 bg-white border-l-4 border-[#A77B42] shadow-xs flex items-center justify-between">
            <span className="text-xs text-[#59534C]">
              Showing matching subcategories for <strong className="text-[#382419]">"{searchQuery}"</strong> ({totalSubcategoriesCount} found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#A77B42] hover:text-[#382419] uppercase tracking-wider font-semibold underline cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* =========================================================================
            D. Subcategory Catalogue & E. Category Sections
        ========================================================================= */}
        {displayedCategories.length > 0 ? (
          <div className="space-y-20 mb-24">
            {displayedCategories.map((category) => (
              <section key={category.id} className="space-y-8">
                
                {/* Category Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#EAE0D2]">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
                      <span className="text-[11px] uppercase font-semibold tracking-[0.22em] text-[#A77B42]">
                        {category.subcategories.length} Specialized Subcategories
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#59534C] font-light max-w-2xl leading-relaxed mt-1">
                      {category.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategorySlug(category.slug);
                      onSelectCategory(category.slug);
                    }}
                    className="self-start md:self-end inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#A77B42] hover:text-[#382419] transition-colors pb-1 cursor-pointer shrink-0"
                  >
                    <span>View All {category.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subcategory Cards Responsive Grid: 3-column desktop, 2-column tablet, 1/2-column mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => onSelectSubcategory(category.slug, sub.slug)}
                      className="group bg-white border border-[#EAE0D2] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#A77B42]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                    >
                      {/* Image Container with Consistent Aspect Ratio & Smooth Hover Zoom */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                        
                        {/* Parent Category Badge */}
                        <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#382419] border border-[#EAE0D2]">
                          {category.title}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-xl font-serif font-bold text-[#382419] group-hover:text-[#A77B42] transition-colors mb-2 leading-tight">
                            {sub.name}
                          </h3>
                          <p className="text-xs text-[#59534C] font-light leading-relaxed mb-6 line-clamp-2">
                            {sub.description}
                          </p>
                        </div>

                        {/* Card Bottom: Explore Collection Action */}
                        <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#382419] group-hover:text-[#A77B42] transition-colors">
                          <span>Explore Collection</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </section>
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAE0D2]/60 flex items-center justify-center mx-auto text-[#A77B42]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#382419]">No Subcategories Found</h3>
            <p className="text-xs sm:text-sm text-[#59534C] font-light leading-relaxed">
              We couldn't find any furniture subcategories matching <strong className="text-[#382419]">"{searchQuery}"</strong>. Please try another search term or reset your filters.
            </p>
            <div className="pt-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategorySlug('all');
                }}
                className="px-6 py-3 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
              >
                Reset Search &amp; View All
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
