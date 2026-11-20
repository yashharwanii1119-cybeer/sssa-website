import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ArrowLeft, Eye, Mail, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CollectionItem, SubCategoryItem } from '../data/collections';
import { productsData, ProductItem } from '../data/products';

interface SubCategoryPageProps {
  category: CollectionItem;
  subcategory: SubCategoryItem;
  onBackToHome: () => void;
  onBackToCollections: () => void;
  onSelectCategory: (categorySlug: string) => void;
  onSelectOtherSubcategory: (categorySlug: string, subcategorySlug: string) => void;
  onOpenEnquiry: (topic?: string) => void;
  onViewProductModal: (product: ProductItem) => void;
}

export const SubCategoryPage: React.FC<SubCategoryPageProps> = ({
  category,
  subcategory,
  onBackToHome,
  onBackToCollections,
  onSelectCategory,
  onSelectOtherSubcategory,
  onOpenEnquiry,
  onViewProductModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Find products belonging to this subcategory
  const products = useMemo(() => {
    return productsData.filter(
      (p) =>
        p.categorySlug.toLowerCase() === category.slug.toLowerCase() &&
        p.subcategorySlug.toLowerCase() === subcategory.slug.toLowerCase()
    );
  }, [category.slug, subcategory.slug]);

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.finish.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  // Other subcategories in this same main category
  const siblingSubcategories = useMemo(() => {
    return category.subcategories.filter((s) => s.slug !== subcategory.slug);
  }, [category.subcategories, subcategory.slug]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      
      {/* 1. Breadcrumb navigation: Home → Collections → Main Category → Subcategory */}
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
              onClick={onBackToCollections}
              className="hover:text-[#A77B42] transition-colors font-medium cursor-pointer"
            >
              Collections
            </button>
            <span>/</span>
            <button
              onClick={() => onSelectCategory(category.slug)}
              className="hover:text-[#A77B42] transition-colors font-medium cursor-pointer"
            >
              {category.title}
            </button>
            <span>/</span>
            <span className="text-[#382419] font-bold">{subcategory.name}</span>
          </nav>
          
          <button
            onClick={() => onSelectCategory(category.slug)}
            className="text-[11px] text-[#A77B42] hover:text-[#382419] transition-colors uppercase tracking-widest font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>← Return to {category.title}</span>
          </button>
        </div>
      </div>

      {/* 2 & 3. Hero / Category Header with relevant image & large premium heading */}
      <section className="relative py-16 sm:py-24 bg-[#271911] text-[#F7F3EC] overflow-hidden">
        {/* Subtle Background Photography */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={subcategory.image}
            alt={subcategory.name}
            className="w-full h-full object-cover object-center filter blur-xs"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#271911] via-[#271911]/90 to-[#382419]/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-[#D4AF37]"></span>
                <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#D4AF37]">
                  {category.title} Portfolio
                </span>
              </div>

              {/* Large Premium Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight">
                {subcategory.name}
              </h1>

              {/* 4. Short introductory description */}
              <p className="text-sm sm:text-base md:text-lg text-[#EAE0D2]/90 font-light max-w-2xl leading-relaxed">
                {subcategory.description}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs tracking-widest uppercase font-semibold text-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Solid Wood Construction • Customizable Dimensions • Export Quality</span>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-4">
              <div className="relative rounded-lg overflow-hidden border border-[#A77B42]/40 shadow-2xl aspect-[4/3]">
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#271911]/90 backdrop-blur-xs p-2 text-[11px] text-[#EAE0D2] border-l-2 border-[#D4AF37]">
                  Handcrafted from seasoned timbers.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search Bar & Sibling Subcategories Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EAE0D2] mb-10">
          
          {/* 6. Search within this subcategory */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#A77B42] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${subcategory.name}...`}
              className="w-full pl-10 pr-8 py-2.5 bg-white border border-[#EAE0D2] rounded-none text-xs text-[#25221F] placeholder-[#7D6E63]/70 focus:outline-none focus:border-[#A77B42] focus:ring-1 focus:ring-[#A77B42]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#7D6E63] hover:text-[#382419] font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick links to sibling subcategories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 text-xs text-[#59534C]">
            <span className="font-semibold text-[#382419] shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A77B42]" />
              Related:
            </span>
            {siblingSubcategories.slice(0, 4).map((sib) => (
              <button
                key={sib.id}
                onClick={() => onSelectOtherSubcategory(category.slug, sib.slug)}
                className="px-3 py-1 bg-white border border-[#EAE0D2] hover:border-[#A77B42] hover:text-[#382419] text-[11px] uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                {sib.name}
              </button>
            ))}
          </div>

        </div>

        {/* 5. Responsive product grid containing mock product cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-[#EAE0D2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[#382419] border border-[#EAE0D2]">
                    {product.subcategory}
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onViewProductModal(product)}
                      className="p-2 bg-white text-[#382419] hover:bg-[#A77B42] hover:text-white transition-colors shadow-md cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(`Product Enquiry: ${product.name} (${product.subcategory})`)}
                      className="p-2 bg-[#382419] text-white hover:bg-[#A77B42] transition-colors shadow-md cursor-pointer"
                      title="Enquire Now"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

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
                      {product.dimensions && (
                        <div><strong className="font-medium text-[#382419]">Dimensions:</strong> {product.dimensions}</div>
                      )}
                    </div>
                  </div>

                  {/* 7. Clear Enquire Now button on every card */}
                  <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onViewProductModal(product)}
                      className="text-xs uppercase tracking-wider font-semibold text-[#382419] hover:text-[#A77B42] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(`Enquiry: ${product.name} (${product.subcategory})`)}
                      className="px-4 py-2 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-wider font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 8. Clean empty state */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EAE0D2]/60 flex items-center justify-center mx-auto text-[#A77B42]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-[#382419]">No Designs Found</h3>
            <p className="text-xs text-[#59534C] font-light leading-relaxed">
              {searchQuery
                ? `No products in ${subcategory.name} match "${searchQuery}".`
                : `We are currently curating more designs for ${subcategory.name}.`}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => onOpenEnquiry(`Custom Sourcing Request for ${subcategory.name}`)}
                className="px-5 py-2.5 border border-[#382419] text-[#382419] text-xs uppercase tracking-widest font-semibold hover:bg-[#382419] hover:text-white transition-colors cursor-pointer"
              >
                Request Custom Piece
              </button>
            </div>
          </div>
        )}

        {/* Section bottom CTA banner */}
        <div className="p-8 sm:p-12 bg-white border border-[#EAE0D2] rounded-none shadow-xs text-center space-y-4">
          <h4 className="text-2xl sm:text-3xl font-serif text-[#382419]">
            Require Custom {subcategory.name} for Your Projects?
          </h4>
          <p className="text-xs sm:text-sm text-[#59534C] font-light max-w-xl mx-auto leading-relaxed">
            As a direct manufacturer in Jodhpur, we provide custom dimensions, wood species selections (Mango, Oak, Teak, Acacia, Reclaimed), and specialized export packaging.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenEnquiry(`Custom OEM Inquiry for ${subcategory.name}`)}
              className="px-8 py-3.5 bg-[#382419] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors cursor-pointer"
            >
              Request Custom Quotation
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
