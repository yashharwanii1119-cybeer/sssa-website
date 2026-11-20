import React from 'react';
import { 
  Sparkles, 
  Trees, 
  Droplets, 
  ShieldCheck, 
  Hammer, 
  Compass, 
  Layers, 
  Feather, 
  CheckCircle2, 
  Users, 
  ScrollText, 
  PackageCheck,
  SearchCheck
} from 'lucide-react';
import { getAssetPath } from '../utils/paths';

export const Craftsmanship: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#F7F3EC] text-[#25221F] relative overflow-hidden">
      
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#EAE0D2]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-[#EAE0D2]/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            SECTION HEADER
        ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.28em] text-[#A77B42]">
              The Art of Craftsmanship
            </span>
            <span className="w-8 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#382419] tracking-tight leading-[1.15]">
            Where Tradition Meets <br />
            <span className="italic font-light text-[#A77B42]">Timeless Craftsmanship</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#59534C] font-light leading-relaxed max-w-2xl mx-auto">
            Every creation carries the dedication of skilled artisans, the natural beauty of wood, and generations of traditional craftsmanship. Explore the five distinct stages behind our authentic wooden handicrafts.
          </p>
        </div>

        {/* ========================================================
            THE 5 DISTINCT VISUAL STAGES
        ======================================================== */}
        <div className="space-y-24 sm:space-y-32">

          {/* ----------------------------------------------------
              STAGE 01: Raw Material & Wood Seasoning
              Layout: Image Left, Text Right
          ---------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Image Left */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white group">
                <img
                  src={getAssetPath("/images/craft_timber.jpg")}
                  alt="Raw timber logs, timber planks, natural wood grains, and craftsman inspecting raw wood"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs rounded-xl border-l-3 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Selected Solid Timber</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">High-density hardwood inspected for natural grain figure and structural integrity.</p>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#A77B42] bg-[#EAE0D2] px-3 py-1 rounded-sm">
                    STAGE 01
                  </span>
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#59534C]">
                    Material Foundation
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  Raw Material &amp; Wood Seasoning
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  Buyers—especially international ones—worry most about wood cracking or warping after delivery. Address this directly:
                </p>
              </div>

              {/* Exact Bullet Points */}
              <div className="space-y-4 pt-1">
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Trees className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Wood Species</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Name the exact woods you work with (e.g., Sheesham / Indian Rosewood, Mango Wood, Acacia, Teak) and why each is chosen (grain pattern, durability, weight).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Seasoning &amp; Kiln-Drying</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Mention your moisture control process (e.g., "Kiln-dried to 8–10% moisture content to prevent warping across climates").
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Ethical Sourcing</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Highlight if you use plantation-grown, reclaimed, or legally certified timber (like FSC-certified or Vriksh-certified wood).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#A77B42]/30 to-transparent my-16" />

          {/* ----------------------------------------------------
              STAGE 02: Techniques & Joinery
              Layout: Text Left, Image Right
          ---------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Text Left */}
            <div className="lg:col-span-6 space-y-6 lg:order-1">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#A77B42] bg-[#EAE0D2] px-3 py-1 rounded-sm">
                    STAGE 02
                  </span>
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#59534C]">
                    Structural &amp; Decorative Skill
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  Techniques &amp; Joinery
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  Show the skill that goes into the build before the polish even goes on:
                </p>
              </div>

              {/* Exact Bullet Points */}
              <div className="space-y-4 pt-1">
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Hammer className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Hand-Carving &amp; Turning</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Specify traditional techniques you use—floral jaali work, relief carving, wood turning, or hand-planing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Joinery</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Mention strong structural joints like mortise-and-tenon, dovetail, or finger joints instead of relying solely on nails and glue.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Inlay &amp; Embellishments</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        If you work with brass inlay, bone/mother-of-pearl inlay, metal accents, or hand-painting, dedicate a short block to how those materials are fitted by hand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 relative lg:order-2">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white group">
                <img
                  src={getAssetPath("/images/craft_tools.jpg")}
                  alt="Indian wood artisan working on intricate wooden carvings using traditional chisels and hand tools"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs rounded-xl border-l-3 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Traditional Wood Chiselcraft</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Floral jaali carving, intricate patterns, wooden joints, and decorative hand-inlay work.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#A77B42]/30 to-transparent my-16" />

          {/* ----------------------------------------------------
              STAGE 03: Surface Finishing & Protection
              Layout: Image Left, Text Right
          ---------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Image Left */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white group">
                <img
                  src={getAssetPath("/images/craft_surface.jpg")}
                  alt="Craftsman carefully sanding and polishing a wooden handicraft showing smooth wood surface and natural finishes"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs rounded-xl border-l-3 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Refined Surface Finish</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Multi-stage sanding, hand-buffed wax polishing, and protective preservation.</p>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#A77B42] bg-[#EAE0D2] px-3 py-1 rounded-sm">
                    STAGE 03
                  </span>
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#59534C]">
                    Luster &amp; Preservation
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  Surface Finishing &amp; Protection
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  Explain how you achieve the final look and feel:
                </p>
              </div>

              {/* Exact Bullet Points */}
              <div className="space-y-4 pt-1">
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Feather className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Multi-Stage Sanding</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Mention hand-sanding through progressive grits for a smooth, splinter-free finish.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Finish Types</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        State whether you use natural beeswax, linseed oil, matte polyurethane, antique distressing, or food-safe finishes (critical for wooden bowls, trays, and kitchenware).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Wood Treatment</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Note anti-termite and anti-borer chemical treatments so buyers know the piece is built to last.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#A77B42]/30 to-transparent my-16" />

          {/* ----------------------------------------------------
              STAGE 04: The Artisans & Heritage
              Layout: Text Left, Image Right
          ---------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Text Left */}
            <div className="lg:col-span-6 space-y-6 lg:order-1">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#A77B42] bg-[#EAE0D2] px-3 py-1 rounded-sm">
                    STAGE 04
                  </span>
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#59534C]">
                    The Human Touch
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  The Artisans &amp; Heritage
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  People buy handicrafts for the human story:
                </p>
              </div>

              {/* Exact Bullet Points */}
              <div className="space-y-4 pt-1">
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Generational Skill</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Share how long your workshop has been operating and whether your master craftsmen come from multi-generational woodworking families.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <ScrollText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Artisan Spotlights</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Feature 2–3 short profiles or quotes from your senior karigars (with candid photos of their hands at work).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Handmade Uniqueness</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Add a short note explaining that slight variations in wood grain and carving depth are marks of genuine handwork, not defects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 relative lg:order-2">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white group">
                <img
                  src={getAssetPath("/images/craft_artisan.jpg")}
                  alt="Authentic Indian woodworking artisans in traditional workshop carving detailed designs"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs rounded-xl border-l-3 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Generations of Artisanship</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Skilled hands carving detailed designs in a natural workshop environment.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#A77B42]/30 to-transparent my-16" />

          {/* ----------------------------------------------------
              STAGE 05: Quality Control & Manufacturing Capacity
              Layout: Image Left, Text Right
          ---------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Image Left */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white group">
                <img
                  src={getAssetPath("/images/craft_packaging.jpg")}
                  alt="Craftsman inspecting finished wooden product and export-grade protective packaging"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs rounded-xl border-l-3 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Export Preparation</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Finished wooden products inspected and secured with export-grade protective packaging.</p>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#A77B42] bg-[#EAE0D2] px-3 py-1 rounded-sm">
                    STAGE 05
                  </span>
                  <span className="text-xs uppercase font-semibold tracking-widest text-[#59534C]">
                    Export Readiness
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  Quality Control &amp; Manufacturing Capacity
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  If you cater to wholesalers, hotels, or exporters, add a practical manufacturing block:
                </p>
              </div>

              {/* Exact Bullet Points */}
              <div className="space-y-4 pt-1">
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <SearchCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Multi-Point Inspection</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Mention checks for grain consistency, wobble/leveling, finish smoothness, and moisture levels before packing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0 mt-0.5">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#382419] mb-1">Export-Grade Packaging</h4>
                      <p className="text-xs text-[#59534C] font-light leading-relaxed">
                        Briefly note drop-tested corrugated boxes, corner protectors, or moisture-barrier wrapping.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
