import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowRight, ArrowLeft, Eye, Mail, ChevronRight, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { collectionsData } from '../data/collections';
import { productsData, ProductItem } from '../data/products';
import { openWhatsAppEnquiry } from '../utils/whatsapp';

interface AllCollectionsPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: (productName?: string) => void;
  onViewProductModal: (product: ProductItem) => void;
  onSelectSubcategory?: (categorySlug: string, subcategorySlug: string) => void;
  onSelectCategory?: (categorySlug: string) => void;
  initialCategorySlug?: string;
  initialSubCategorySlug?: string;
}

export const AllCollectionsPage: React.FC<AllCollectionsPageProps> = ({
  onBackToHome,
  onOpenEnquiry,
  onViewProductModal,
  initialCategorySlug = 'all',
  initialSubCategorySlug = '',
}) => {
  // Category and subcategory filtering states
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(initialCategorySlug);
  const [selectedSubCategorySlug, setSelectedSubCategorySlug] = useState<string>(initialSubCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive hover dropdown state
  const [hoveredTabSlug, setHoveredTabSlug] = useState<string | null>(null);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const productSectionRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => collectionsData, []);

  // Update selection when props change
  useEffect(() => {
    if (initialCategorySlug) setSelectedCategorySlug(initialCategorySlug);
    if (initialSubCategorySlug) setSelectedSubCategorySlug(initialSubCategorySlug);
  }, [initialCategorySlug, initialSubCategorySlug]);

  const handleTabMouseEnter = (slug: string) => {
    if (slug === 'all') return; // Do not open dropdown for ALL COLLECTIONS
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

  // Select main category: resets subcategory and scrolls to products
  const handleSelectCategoryFilter = (categorySlug: string, shouldScroll = true) => {
    setSelectedCategorySlug(categorySlug);
    setSelectedSubCategorySlug('');
    setHoveredTabSlug(null);
    if (categorySlug === 'all') {
      window.history.pushState(null, '', '#collections');
    } else {
      window.history.pushState(null, '', `#collections/${categorySlug}`);
    }
    if (shouldScroll && productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Select subcategory: filters products to exact subcategory
  const handleSelectSubCategoryFilter = (categorySlug: string, subcategorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setSelectedSubCategorySlug(subcategorySlug);
    setHoveredTabSlug(null);
    window.history.pushState(null, '', `#collections/${categorySlug}/${subcategorySlug}`);
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategorySlug('all');
    setSelectedSubCategorySlug('');
    setSearchQuery('');
    setHoveredTabSlug(null);
    window.history.pushState(null, '', '#collections');
  };

  // Active Category Object
  const activeCategoryObj = useMemo(() => {
    if (selectedCategorySlug === 'all') return null;
    return categories.find((c) => c.slug.toLowerCase() === selectedCategorySlug.toLowerCase()) || null;
  }, [categories, selectedCategorySlug]);

  // Active Subcategory Object
  const activeSubCategoryObj = useMemo(() => {
    if (!activeCategoryObj || !selectedSubCategorySlug) return null;
    return activeCategoryObj.subcategories.find(
      (s) => s.slug.toLowerCase() === selectedSubCategorySlug.toLowerCase()
    ) || null;
  }, [activeCategoryObj, selectedSubCategorySlug]);

  // Filtered Products based on: Category + Subcategory + Live Search
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // 1. Category match
      const matchesCategory =
        selectedCategorySlug === 'all' ||
        product.categorySlug.toLowerCase() === selectedCategorySlug.toLowerCase();

      // 2. Subcategory match
      const matchesSubcategory =
        !selectedSubCategorySlug ||
        product.subcategorySlug.toLowerCase() === selectedSubCategorySlug.toLowerCase();

      // 3. Search query match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.finish.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSubcategory && matchesSearch;
    });
  }, [selectedCategorySlug, selectedSubCategorySlug, searchQuery]);

  // Displayed subcategory cards for the catalog browser section
  const displayedCatalogCategories = useMemo(() => {
    if (selectedCategorySlug === 'all') return categories;
    return categories.filter((c) => c.slug.toLowerCase() === selectedCategorySlug.toLowerCase());
  }, [categories, selectedCategorySlug]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#25221F]">
      
      {/* =========================================================================
          Breadcrumb Navigation
      ========================================================================= */}
      <div className="bg-[#F3ECE1]/70 border-b border-[#EAE0D2] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs tracking-wider uppercase">
          <nav className="flex items-center flex-wrap gap-2 text-[#7D6E63]">
            <button
              onClick={onBackToHome}
              className="hover:text-[#A77B42] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <button
              onClick={handleResetFilters}
              className={`hover:text-[#A77B42] transition-colors font-medium cursor-pointer ${
                selectedCategorySlug === 'all' && !selectedSubCategorySlug ? 'text-[#382419] font-bold' : ''
              }`}
            >
              Collections
            </button>

            {activeCategoryObj && (
              <>
                <span>/</span>
                <button
                  onClick={() => handleSelectCategoryFilter(activeCategoryObj.slug, false)}
                  className={`hover:text-[#A77B42] transition-colors font-medium cursor-pointer ${
                    !selectedSubCategorySlug ? 'text-[#382419] font-bold' : ''
                  }`}
                >
                  {activeCategoryObj.title}
                </button>
              </>
            )}

            {activeSubCategoryObj && (
              <>
                <span>/</span>
                <span className="text-[#A77B42] font-bold">{activeSubCategoryObj.name}</span>
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
          Search & Interactive Category Navigation
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Functional Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-[#A77B42] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, category, subcategory (e.g. Sideboard, Bed, Bar Table)..."
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

        {/* Desktop Filter Tabs Row */}
        <div className="relative mb-10">
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-2.5">
            
            {/* 1. ALL COLLECTIONS Tab (Hover dropdown disabled, click shows all products) */}
            <button
              onClick={() => handleSelectCategoryFilter('all')}
              className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 border cursor-pointer inline-flex items-center gap-1.5 ${
                selectedCategorySlug === 'all' && !selectedSubCategorySlug
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
                    onClick={() => handleSelectCategoryFilter(cat.slug)}
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
                            onClick={() => handleSelectCategoryFilter(cat.slug)}
                            className="text-[11px] text-[#A77B42] hover:text-[#382419] font-semibold underline cursor-pointer"
                          >
                            View All {cat.title}
                          </button>
                        </div>

                        {/* List of subcategories with image thumbnails */}
                        <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleSelectSubCategoryFilter(cat.slug, sub.slug)}
                              className={`w-full text-left p-2 rounded-none transition-all group flex items-center justify-between border cursor-pointer ${
                                selectedCategorySlug === cat.slug && selectedSubCategorySlug === sub.slug
                                  ? 'bg-[#EAE0D2] border-[#A77B42]'
                                  : 'hover:bg-[#F3ECE1] border-transparent hover:border-[#EAE0D2]'
                              }`}
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
              <span>Filter by Category &amp; Subcategory:</span>
              <span className="text-[10px] text-[#7D6E63] normal-case">Tap to expand</span>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  handleSelectCategoryFilter('all');
                  setMobileExpandedTab(null);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  selectedCategorySlug === 'all' && !selectedSubCategorySlug
                    ? 'bg-[#382419] text-white'
                    : 'hover:bg-[#FAF7F2] text-[#25221F]'
                }`}
              >
                All Collections (All Products)
              </button>

              {categories.map((cat) => {
                const isSelected = selectedCategorySlug === cat.slug;
                const isExpanded = mobileExpandedTab === cat.id;

                return (
                  <div key={cat.id} className="border-t border-[#EAE0D2]/60 pt-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleSelectCategoryFilter(cat.slug)}
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
                        <button
                          onClick={() => handleSelectCategoryFilter(cat.slug)}
                          className="w-full text-left py-1 text-xs font-semibold text-[#A77B42] border-b border-[#EAE0D2] pb-1"
                        >
                          Show All {cat.title} Products
                        </button>
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleSelectSubCategoryFilter(cat.slug, sub.slug)}
                            className={`w-full text-left py-1 text-xs flex items-center justify-between ${
                              selectedCategorySlug === cat.slug && selectedSubCategorySlug === sub.slug
                                ? 'text-[#A77B42] font-bold'
                                : 'text-[#59534C] hover:text-[#A77B42]'
                            }`}
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

        {/* Subcategory Filter Pills when a category is selected */}
        {activeCategoryObj && (
          <div className="mb-10 p-4 sm:p-5 bg-white border border-[#EAE0D2] shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-[#EAE0D2]">
              <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#382419] tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#A77B42]" />
                <span>{activeCategoryObj.title} Subcategories:</span>
              </div>
              <button
                onClick={() => handleSelectCategoryFilter('all')}
                className="text-xs text-[#A77B42] hover:text-[#382419] underline font-semibold cursor-pointer"
              >
                Clear Category Filter
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedSubCategorySlug('')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  !selectedSubCategorySlug
                    ? 'bg-[#382419] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#59534C] hover:bg-[#EAE0D2] hover:text-[#382419]'
                }`}
              >
                All {activeCategoryObj.title} ({activeCategoryObj.subcategories.length})
              </button>

              {activeCategoryObj.subcategories.map((sub) => {
                const isActive = selectedSubCategorySlug === sub.slug;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategorySlug(sub.slug)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#A77B42] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#59534C] hover:bg-[#EAE0D2] hover:text-[#382419]'
                    }`}
                  >
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            4. Functional Product Listing Grid (Directly on this Collections Page)
        ========================================================================= */}
        <div ref={productSectionRef} className="pt-4 mb-20 scroll-mt-24">
          
          {/* Product Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#EAE0D2] mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-4 h-[1.5px] bg-[#A77B42]"></span>
                <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#A77B42]">
                  {selectedCategorySlug === 'all'
                    ? 'Complete Catalogue'
                    : activeSubCategoryObj
                    ? `${activeCategoryObj?.title} • ${activeSubCategoryObj.name}`
                    : activeCategoryObj?.title}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                {activeSubCategoryObj
                  ? activeSubCategoryObj.name
                  : activeCategoryObj
                  ? `${activeCategoryObj.title} Products`
                  : 'All Handcrafted Creations'}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#A77B42]">
                {filteredProducts.length} Products Available
              </span>
              {(selectedCategorySlug !== 'all' || selectedSubCategorySlug || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#382419] hover:text-[#A77B42] underline font-semibold cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-[#EAE0D2] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#A77B42]/50 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category & Subcategory Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#382419] border border-[#EAE0D2]">
                        {product.category}
                      </span>
                      <span className="bg-[#382419]/90 text-white px-2 py-0.5 text-[9.5px] uppercase tracking-wider font-medium">
                        {product.subcategory}
                      </span>
                    </div>

                    {/* Quick Action Overlay Buttons */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={() => onViewProductModal(product)}
                        className="p-2.5 bg-white text-[#382419] hover:bg-[#A77B42] hover:text-white transition-colors shadow-md cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openWhatsAppEnquiry(product)}
                        className="p-2.5 bg-[#382419] text-white hover:bg-[#A77B42] transition-colors shadow-md cursor-pointer"
                        title="Enquire on WhatsApp"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#382419] group-hover:text-[#A77B42] transition-colors mb-2 leading-snug">
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-[#59534C] font-light leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="text-[11px] text-[#7D6E63] space-y-1 mb-4 pt-2 border-t border-[#EAE0D2]/60">
                        <div><strong className="font-medium text-[#382419]">Material:</strong> {product.material}</div>
                        <div><strong className="font-medium text-[#382419]">Finish:</strong> {product.finish}</div>
                        {product.dimensions && (
                          <div><strong className="font-medium text-[#382419]">Dimensions:</strong> {product.dimensions}</div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons: View Details & Enquire */}
                    <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between gap-3">
                      <button
                        onClick={() => onViewProductModal(product)}
                        className="text-xs uppercase tracking-wider font-semibold text-[#382419] hover:text-[#A77B42] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openWhatsAppEnquiry(product)}
                        className="px-4 py-2 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-wider font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Clean Empty State */
            <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white border border-[#EAE0D2] p-8">
              <div className="w-12 h-12 rounded-full bg-[#EAE0D2]/60 flex items-center justify-center mx-auto text-[#A77B42]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-[#382419]">No Matching Products Found</h3>
              <p className="text-xs text-[#59534C] font-light leading-relaxed">
                {searchQuery
                  ? `No products matching "${searchQuery}" in this selection.`
                  : 'We are currently adding more bespoke designs for this category.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
                >
                  Show All Products
                </button>
                <button
                  onClick={() => onOpenEnquiry(activeSubCategoryObj?.name || activeCategoryObj?.title || 'Custom Sourcing Inquiry')}
                  className="px-5 py-2.5 border border-[#382419] text-[#382419] text-xs uppercase tracking-widest font-semibold hover:bg-[#382419] hover:text-white transition-colors cursor-pointer"
                >
                  Request Custom Quote
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            Subcategory Overview Browser (Shown when in general browsing mode)
        ========================================================================= */}
        {!selectedSubCategorySlug && !searchQuery && (
          <div className="pt-10 pb-20 border-t border-[#EAE0D2]">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
                <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                  Category Sub-Domains
                </span>
                <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#382419]">
                Browse by Subcategory
              </h3>
              <p className="text-xs sm:text-sm text-[#59534C] font-light mt-1">
                Select any subcategory card to instantly filter products above.
              </p>
            </div>

            <div className="space-y-16">
              {displayedCatalogCategories.map((cat) => (
                <div key={cat.id} className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D2]">
                    <h4 className="text-xl font-serif font-bold text-[#382419]">
                      {cat.title} ({cat.subcategories.length})
                    </h4>
                    <button
                      onClick={() => handleSelectCategoryFilter(cat.slug)}
                      className="text-xs uppercase tracking-wider font-semibold text-[#A77B42] hover:text-[#382419] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Filter to {cat.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSelectSubCategoryFilter(cat.slug, sub.slug)}
                        className="group text-left bg-white border border-[#EAE0D2] hover:border-[#A77B42] hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-black/5 relative">
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3">
                          <div className="text-xs font-serif font-bold text-[#382419] group-hover:text-[#A77B42] transition-colors leading-tight mb-0.5">
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-[#A77B42] uppercase tracking-wider font-semibold flex items-center justify-between pt-1">
                            <span>Filter Products</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
