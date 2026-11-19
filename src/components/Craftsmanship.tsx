import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { getAssetPath } from '../utils/paths';

export const Craftsmanship: React.FC = () => {
  const craftPoints = [
    {
      title: "Hand Carving & Chisel Work",
      description: "Curves, floral relief work, and geometric crests are shaped by hand. Craftsmen use specialized gouges and chisels, imparting distinct texture and character to each individual piece.",
      image: getAssetPath("/images/craft_carving.jpg"),
    },
    {
      title: "Wood Shaping & Joinery",
      description: "Traditional joinery techniques are utilized to assemble structural frames and cabinetry, ensuring durable construction and graceful proportions for solid wood creations.",
      image: getAssetPath("/images/craft_joinery.jpg"),
    },
    {
      title: "Intricate Detailing & Inlay",
      description: "Delicate latticework (Jali) and metal/brass inlay work require focused craftsmanship. Artisans embed and level decorative details flush with the timber surface.",
      image: getAssetPath("/images/craft_inlay.jpg"),
    },
    {
      title: "Artisanal Surface Finishing",
      description: "Careful surface sanding followed by hand-rubbed wax, antique patina, or protective coatings highlight the natural grain patterns and rich warmth of natural wood.",
      image: getAssetPath("/images/craft_finish.jpg"),
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 bg-[#382419] text-[#F7F3EC] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#A77B42_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C4975C]">
              Artisan Dedication
            </span>
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Every Detail Tells A Story.
          </h2>
          <p className="mt-4 text-base text-[#EAE0D2]/80 font-light leading-relaxed">
            In our workshops, wooden craftsmanship is guided by patience, skilled hands, and a profound respect for natural timber.
          </p>
        </div>

        <div className="space-y-20">
          {craftPoints.map((item, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`lg:col-span-6 relative overflow-hidden shadow-2xl border border-[#A77B42]/30 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute top-4 left-4 bg-[#271911]/90 backdrop-blur-xs text-[#C4975C] text-xs font-mono px-3 py-1 border border-[#A77B42]/40">
                    STAGE 0{index + 1}
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isReversed ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[#C4975C]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      Authentic Indian Craftsmanship
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#EAE0D2]/80 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-6 text-xs uppercase tracking-wider text-[#C4975C]/90 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Handcrafted Detailing
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Thorough Inspection
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
