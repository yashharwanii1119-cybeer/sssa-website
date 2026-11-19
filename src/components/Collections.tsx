import React from 'react';
import { ArrowRight } from 'lucide-react';
import { collectionsData, CollectionItem } from '../data/collections';

interface CollectionsProps {
  onSelectCollection: (collection: CollectionItem) => void;
}

export const Collections: React.FC<CollectionsProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="py-24 bg-[#EAE0D2]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
              <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                Curated Portfolios
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight">
              Our Collections
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#59534C] font-light leading-relaxed">
            From regal hand-carved heritage furniture to sculptural wooden wall art and traditional Indian handicrafts, explore our production domains crafted for global residences and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionsData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#F7F3EC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#EAE0D2] flex flex-col justify-between"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-black/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271911]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                <div className="absolute top-4 left-4 bg-[#F7F3EC]/90 backdrop-blur-xs px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#382419]">
                  {item.subtitle}
                </div>

                <div className="absolute bottom-4 right-4 text-[11px] text-[#F7F3EC] bg-[#382419]/80 px-2.5 py-1 tracking-wider uppercase font-medium">
                  {item.itemCount}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#382419] group-hover:text-[#A77B42] transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59534C] leading-relaxed line-clamp-3 font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectCollection(item)}
                  className="w-full pt-4 border-t border-[#EAE0D2] flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#382419] group-hover:text-[#A77B42] transition-colors cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
