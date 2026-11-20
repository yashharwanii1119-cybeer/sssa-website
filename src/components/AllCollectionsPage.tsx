import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ArrowLeft, Eye, Mail, Sparkles } from 'lucide-react';
import { productsData, ProductItem } from '../data/products';
import { collectionsData } from '../data/collections';

interface AllCollectionsPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: (productName?: string) => void;
  onViewProductModal: (product: ProductItem) => void;
  initialCategory?: string;
}

export const AllCollectionsPage: React.FC<AllCollectionsPageProps> = ({
  onBackToHome,
  onOpenEnquiry,
  onViewProductModal,
  initialCategory = 'All Products',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All Products',
    'Living Room',
    'Bedroom',
    'Dining Room',
    'Seating',
    'Bar Furniture',
    'Outdoor',
  ];

  // Dynamic search and category filtering
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Products' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      
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
          A. Premium Header
      ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-[#271911] text-[#F7F3EC] overflow-hidden text-center">
        {/* Subtle Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(#A77B42_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#271911] via-transparent to-black/30 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2.5 mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase font-semibold tracking-[0.28em] text-[#D4AF37]">
              Artisanal Woodworking Portfolio
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white">
            Explore Our Collections
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#EAE0D2]/90 font-light leading-relaxed">
            Discover timeless wooden furniture and handcrafted creations designed for distinguished spaces.
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-[11px] sm:text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
            <span>6 Core Categories</span>
            <span>•</span>
            <span>Solid Wood &amp; Reclaimed Timbers</span>
            <span>•</span>
            <span>Custom Export Orders</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          B. Search Bar & C. Category Filters
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-[#A77B42] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search furniture, collections and products..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-[#EAE0D2] rounded-none text-sm text-[#25221F] placeholder-[#7D6E63]/70 focus:outline-none focus:border-[#A77B42] focus:ring-1 focus:ring-[#A77B42] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7D6E63] hover:text-[#382419] font-medium px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#382419] text-[#F7F3EC] border-[#382419] shadow-sm'
                    : 'bg-white text-[#59534C] border-[#EAE0D2] hover:border-[#A77B42] hover:text-[#382419]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Category Context Banner if a specific category is chosen */}
        {selectedCategory !== 'All Products' && (
          <div className="mb-10 p-5 bg-[#F3ECE1]/60 border-l-4 border-[#A77B42] max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#382419]">
                {selectedCategory}
              </h2>
              <p className="text-xs text-[#59534C] font-light">
                {collectionsData.find((c) => c.title.toLowerCase() === selectedCategory.toLowerCase())?.subtitle ||
                  'Curated artisanal designs tailored for international spaces.'}
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory('All Products')}
              className="text-xs uppercase font-semibold text-[#A77B42] hover:text-[#382419] underline cursor-pointer shrink-0"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* =========================================================================
            D. Product Grid
        ========================================================================= */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-[#EAE0D2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Container with Consistent Ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#382419] border border-[#EAE0D2]">
                    {product.category}
                  </div>

                  {/* Quick Action Overlay Buttons */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onViewProductModal(product)}
                      className="p-2 bg-white text-[#382419] hover:bg-[#A77B42] hover:text-white transition-colors shadow-md"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(`Product Enquiry: ${product.name}`)}
                      className="p-2 bg-[#382419] text-white hover:bg-[#A77B42] transition-colors shadow-md"
                      title="Enquire Now"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#382419] group-hover:text-[#A77B42] transition-colors mb-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-[#59534C] font-light leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="text-[11px] text-[#7D6E63] space-y-1 mb-4 pt-2 border-t border-[#EAE0D2]/60">
                      <div><strong className="font-medium text-[#382419]">Material:</strong> {product.material}</div>
                      <div><strong className="font-medium text-[#382419]">Finish:</strong> {product.finish}</div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onViewProductModal(product)}
                      className="text-xs uppercase tracking-wider font-semibold text-[#382419] hover:text-[#A77B42] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(`Enquiry: ${product.name} (${product.category})`)}
                      className="px-3.5 py-1.5 bg-[#382419] text-[#F7F3EC] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EAE0D2]/60 flex items-center justify-center mx-auto text-[#A77B42]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-[#382419]">No Products Found</h3>
            <p className="text-xs text-[#59534C] font-light leading-relaxed">
              We couldn't find any products matching "{searchQuery}" in {selectedCategory}. Try resetting your search or category filter.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Products');
                }}
                className="px-6 py-2.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
