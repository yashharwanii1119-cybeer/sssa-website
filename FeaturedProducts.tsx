import React, { useState } from 'react';
import { Eye, Mail } from 'lucide-react';
import { productsData, ProductItem } from '../data/products';

interface FeaturedProductsProps {
  onOpenEnquiry: (productName?: string) => void;
  onViewProductModal: (product: ProductItem) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onOpenEnquiry,
  onViewProductModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Hand-Carved Furniture',
    'Decorative Wooden Art',
    'Wooden Handicrafts',
    'Wooden Home Décor',
  ];

  const filteredProducts =
    activeCategory === 'All'
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
              Showcase Of Mastery
            </span>
            <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight">
            Featured Creations
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#59534C] font-light leading-relaxed">
            A selective preview of our export-oriented artisanal wooden products. Each design is fully customizable in timber variety, dimensions, and hand-rubbed finishes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#382419] text-[#F7F3EC] border-[#382419] shadow-sm'
                  : 'bg-white/80 text-[#59534C] border-[#EAE0D2] hover:border-[#A77B42] hover:text-[#382419]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-[#EAE0D2] hover:border-[#A77B42]/50 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE0D2]/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute top-3 left-3 bg-[#382419]/90 text-white text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 backdrop-blur-xs">
                  {product.category}
                </div>

                <div className="absolute inset-0 bg-[#271911]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => onViewProductModal(product)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#25221F] text-xs uppercase font-semibold tracking-wider hover:bg-[#A77B42] hover:text-white transition-colors shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(product.name)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#A77B42] text-white text-xs uppercase font-semibold tracking-wider hover:bg-[#382419] transition-colors shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif text-[#382419] group-hover:text-[#A77B42] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="space-y-1.5 text-[11px] text-[#59534C] border-t border-[#EAE0D2] pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#382419] font-medium">Material:</span>
                      <span className="font-light truncate ml-2">{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#382419] font-medium">Finish:</span>
                      <span className="font-light truncate ml-2">{product.finish}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EAE0D2] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewProductModal(product)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#59534C] hover:text-[#382419] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Specifications</span>
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(product.name)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#A77B42] hover:text-[#382419] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enquire Now &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 sm:p-8 bg-[#EAE0D2]/60 border border-[#A77B42]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-serif font-semibold text-[#382419]">
              Require Custom Sizes, Finishes, or Volume Export Production?
            </h4>
            <p className="text-xs sm:text-sm text-[#59534C] mt-1 font-light">
              We engineer bespoke collections tailored for international architectural projects, wholesale distributors, and retail brands.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Custom B2B Project')}
            className="whitespace-nowrap px-6 py-3 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors shadow-sm"
          >
            Submit Custom Specification
          </button>
        </div>
      </div>
    </section>
  );
};
