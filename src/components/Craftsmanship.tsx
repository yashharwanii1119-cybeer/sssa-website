import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Trees, 
  Hammer, 
  Layers, 
  ShieldCheck, 
  Users, 
  PackageCheck, 
  Compass, 
  Feather,
  Droplets,
  ScrollText
} from 'lucide-react';
import { getAssetPath } from '../utils/paths';

export const Craftsmanship: React.FC = () => {
  return (
    <section id="craftsmanship" className="bg-[#F7F3EC] text-[#25221F] relative overflow-hidden">
      
      {/* ========================================================
          1. SECTION INTRODUCTION – THE ART OF CRAFTSMANSHIP
      ======================================================== */}
      <div className="relative bg-[#382419] text-[#F7F3EC] py-24 sm:py-32 overflow-hidden">
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#A77B42_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1.5px] bg-[#A77B42]"></span>
              <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C4975C]">
                The Art of Craftsmanship
              </span>
              <span className="w-8 h-[1.5px] bg-[#A77B42]"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-[1.15]">
              Where Tradition Meets <br />
              <span className="italic font-light text-[#EAE0D2]">Timeless Craftsmanship</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-[#EAE0D2]/90 font-light leading-relaxed max-w-2xl mx-auto">
              Every creation carries the dedication of skilled artisans, the natural beauty of wood, and generations of traditional craftsmanship. From carefully selected raw materials to intricate hand-carving and finishing, every detail reflects our commitment to authentic wooden artistry.
            </p>
          </div>

          {/* Large Hero Workshop Photograph */}
          <div className="relative mx-auto max-w-5xl overflow-hidden shadow-2xl border border-[#A77B42]/30 group">
            <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
              <img
                src={getAssetPath("/images/craft_hero.jpg")}
                alt="Indian master artisan manually carving traditional wooden handicrafts in workshop"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#271911]/90 via-[#271911]/30 to-transparent" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 bg-[#271911]/90 backdrop-blur-xs border-l-3 border-[#A77B42]">
              <div>
                <p className="text-xs uppercase font-semibold tracking-widest text-[#C4975C]">Authentic Traditional Workshop</p>
                <p className="text-xs sm:text-sm text-[#EAE0D2] font-light mt-0.5">Master artisans shaping solid timber with traditional gouges, rasps, and mallet chisels.</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#C4975C] shrink-0 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> 100% Hand Sculpted
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================
          2. RAW MATERIAL & WOOD SEASONING
      ======================================================== */}
      <div className="py-24 sm:py-32 bg-[#F7F3EC] border-b border-[#EAE0D2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Image on Left */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={getAssetPath("/images/craft_timber.jpg")}
                  alt="Natural wood logs, seasoned timber, and natural grain texture"
                  className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/95 text-[#F7F3EC] border-l-2 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Natural Hardwood Selection</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Dense structural grain, warm cellular luster, and enduring stability.</p>
                </div>
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
                  <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                    Material Excellence
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  The Foundation of Every Creation
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  The soul of wooden handicrafts begins deep in the forest. Choosing the proper wood specie and preparing the lumber with rigorous seasoning protocols determines the structural longevity, grain expression, and finish quality of every carved piece.
                </p>
              </div>

              {/* 3 Information Blocks */}
              <div className="space-y-4 pt-2">
                
                {/* Block A */}
                <div className="p-5 bg-white border border-[#EAE0D2] shadow-xs hover:border-[#A77B42] transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-none bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                      <Trees className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">
                      Wood Species Selection
                    </h4>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    We work with esteemed timbers including <strong>Sheesham (Indian Rosewood)</strong> for its rich dual-tone figure and high density, <strong>Mango Wood</strong> for tactile golden luster and sustainable character, alongside <strong>Acacia and Teak</strong> for superior tensile resilience, distinct grain ribbons, and natural oil resistance.
                  </p>
                </div>

                {/* Block B */}
                <div className="p-5 bg-white border border-[#EAE0D2] shadow-xs hover:border-[#A77B42] transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-none bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">
                      Seasoning &amp; Wood Conditioning
                    </h4>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    Prior to carving, timber planks undergo controlled seasoning and moisture balance procedures. Careful conditioning releases internal wood tension and stabilizes natural moisture content, significantly preventing warping, seasonal split lines, and structural deformation across varying global climates.
                  </p>
                </div>

                {/* Block C */}
                <div className="p-5 bg-white border border-[#EAE0D2] shadow-xs hover:border-[#A77B42] transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-none bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">
                      Ethical &amp; Responsible Sourcing
                    </h4>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    We strictly prioritize legally harvested, government-regulated timber concessions, plantation-grown woods, and responsibly managed forestry partners. Our sourcing ethos respects ecology while safeguarding traditional craft livelihoods.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ========================================================
          3. TECHNIQUES & JOINERY
      ======================================================== */}
      <div className="py-24 sm:py-32 bg-[#EAE0D2]/45 border-b border-[#EAE0D2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Content on Left */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
                  <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                    Generational Technique
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  The Skill Behind Every Detail
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  Handcrafted wood artistry cannot be rushed. Our artisans command centuries of living craft lineage, translating architectural geometry and classical flora into dimensional relief work, seamless interlocking joinery, and exquisite surface inlays.
                </p>
              </div>

              {/* 3 Technical Subsections */}
              <div className="space-y-4 pt-2">
                
                {/* A. Hand-Carving */}
                <div className="p-5 bg-[#F7F3EC] border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-none bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                      <Hammer className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">
                      Hand-Carving &amp; Wood Turning
                    </h4>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    Master craftsmen sculpt deep three-dimensional floral motifs, traditional geometric <em>Jaali</em> lattice screens, fluted columns, and decorative moldings using hand gouges, rasps, and manual turning lathes. Every contour carries the irreplaceable touch of human sensitivity.
                  </p>
                </div>

                {/* B. Traditional Joinery */}
                <div className="p-5 bg-[#F7F3EC] border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-none bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">
                      Traditional Structural Joinery
                    </h4>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    We construct frames and cabinetry utilizing venerable mortise-and-tenon joints, interlocking dovetails, and precision lap joinery. By avoiding fragile staple-and-glue shortcuts, our furniture breathes naturally through humidity cycles and endures for generations.
                  </p>
                </div>

                {/* C. Inlay & Embellishments */}
                <div className="p-5 bg-[#F7F3EC] border border-[#EAE0D2] shadow-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-none bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#382419]">
                      Inlay &amp; Embellishments
                    </h4>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    Ancient <em>Tarkashi</em> brass wire inlay, fine bone/acrylic marquetry, hand-beaten metal medallions, and delicate hand-painted polychrome highlights are embedded flush into seasoned timber grooves, creating mesmerizing contrasts of wood and metal.
                  </p>
                </div>

              </div>
            </div>

            {/* Images on Right */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={getAssetPath("/images/craft_tools.jpg")}
                  alt="Artisan carving intricate wooden design with traditional hand tools"
                  className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-[#382419]/90 text-white text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1">
                  Intricate Relief Carving
                </div>
              </div>

              {/* Smaller Supporting Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden shadow-md border-2 border-white aspect-[4/3]">
                  <img
                    src={getAssetPath("/images/craft_detail.jpg")}
                    alt="Close up of traditional jaali woodwork"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-semibold text-white tracking-wider uppercase drop-shadow-sm">
                    Jaali Openwork
                  </div>
                </div>

                <div className="relative overflow-hidden shadow-md border-2 border-white aspect-[4/3]">
                  <img
                    src={getAssetPath("/images/craft_inlay.jpg")}
                    alt="Traditional metal and brass inlay detailing"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-semibold text-white tracking-wider uppercase drop-shadow-sm">
                    Tarkashi Inlay
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ========================================================
          4. SURFACE FINISHING & PROTECTION
      ======================================================== */}
      <div className="py-24 sm:py-32 bg-[#382419] text-[#F7F3EC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
              <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C4975C]">
                Surface Refinement
              </span>
              <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              The Perfect Finish, Down to Every Detail
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#EAE0D2]/80 font-light leading-relaxed">
              Achieving a refined, silky, and durable tactile surface requires meticulous patience. Our multi-phase finishing process seals the timber, brings out rich cellular figure, and provides long-lasting preservation.
            </p>
          </div>

          {/* 3 Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Card 1 */}
            <div className="bg-[#271911] border border-[#A77B42]/30 p-7 shadow-lg relative group hover:border-[#C4975C] transition-colors">
              <div className="w-10 h-10 bg-[#382419] border border-[#A77B42]/40 text-[#C4975C] flex items-center justify-center mb-5">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-white mb-2 group-hover:text-[#C4975C] transition-colors">
                Multi-Stage Sanding
              </h4>
              <p className="text-xs text-[#EAE0D2]/80 font-light leading-relaxed">
                Handcrafted wood undergoes sequential orbital and hand sanding from coarse grading down to micro-fine grits. This achieves a glass-smooth, splinter-free tactile finish that reveals the wood's natural figure while preparing the pores for uniform polish absorption.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#271911] border border-[#A77B42]/30 p-7 shadow-lg relative group hover:border-[#C4975C] transition-colors">
              <div className="w-10 h-10 bg-[#382419] border border-[#A77B42]/40 text-[#C4975C] flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-white mb-2 group-hover:text-[#C4975C] transition-colors">
                Finishing Options
              </h4>
              <p className="text-xs text-[#EAE0D2]/80 font-light leading-relaxed">
                Tailored according to client specifications: natural carnauba/beeswax polish for organic sheen, hand-rubbed linseed oils, matte protective topcoats for high-traffic living, antique distressing for haveli patina, and food-safe wax sealants for tabletop items.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#271911] border border-[#A77B42]/30 p-7 shadow-lg relative group hover:border-[#C4975C] transition-colors">
              <div className="w-10 h-10 bg-[#382419] border border-[#A77B42]/40 text-[#C4975C] flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-white mb-2 group-hover:text-[#C4975C] transition-colors">
                Protective Wood Treatment
              </h4>
              <p className="text-xs text-[#EAE0D2]/80 font-light leading-relaxed">
                Timber components receive preventative conditioning treatments to guard against wood-boring insects, ambient humidity shifts, and dry-climate contraction, ensuring your wooden treasures retain their form and dignity over decades.
              </p>
            </div>

          </div>

          {/* Finishing Photograph Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden border border-[#A77B42]/30 shadow-xl h-64 sm:h-72">
              <img
                src={getAssetPath("/images/craft_surface.jpg")}
                alt="Artisan applying hand-rubbed polish and wax finishing treatment"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-semibold text-[#EAE0D2] tracking-wider uppercase">
                Hand-Buffed Wax &amp; Protective Sealing
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#A77B42]/30 shadow-xl h-64 sm:h-72">
              <img
                src={getAssetPath("/images/craft_finish.jpg")}
                alt="Close-up of finished wooden handicraft showing grain luster and surface texture"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-semibold text-[#EAE0D2] tracking-wider uppercase">
                Natural Grain Luster &amp; Satin Patina
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================
          5. THE ARTISANS & HERITAGE
      ======================================================== */}
      <div className="py-24 sm:py-32 bg-[#F7F3EC] border-b border-[#EAE0D2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Artisan Collage on Left */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={getAssetPath("/images/craft_artisan.jpg")}
                  alt="Authentic Indian master wood artisan working in traditional workshop"
                  className="w-full h-[460px] sm:h-[520px] object-cover transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271911]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] backdrop-blur-xs border-l-2 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Generations of Living Heritage</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Where hands, heart, and timber harmonize to create authentic Indian art.</p>
                </div>
              </div>
            </div>

            {/* Narrative on Right */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
                  <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                    Our Heritage
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#382419] tracking-tight">
                  Crafted by Hands, Inspired by Generations
                </h3>
                <p className="mt-3 text-sm text-[#59534C] font-light leading-relaxed">
                  Behind every curve of wood stands an artisan whose family has practiced chiselcraft for generations. Our artisans carry forward classical woodworking traditions, translating ancient motifs into pieces that grace luxury homes, hotels, and galleries across the world.
                </p>
              </div>

              {/* Generational Points & Artisan Profiles */}
              <div className="space-y-4 pt-2">
                
                {/* Generational Skill */}
                <div className="p-4 bg-white border border-[#EAE0D2]">
                  <div className="flex items-center gap-2 text-[#382419] font-serif font-semibold text-base mb-1">
                    <Users className="w-4 h-4 text-[#A77B42]" />
                    <span>Generational Knowledge Transfer</span>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    Carving technique cannot be learned from manuals—it requires tacit knowledge of wood grain direction, seasonal fiber density, and chisel balance passed through decades of mentorship.
                  </p>
                </div>

                {/* Artisan Stories / Space */}
                <div className="p-4 bg-white border border-[#EAE0D2]">
                  <div className="flex items-center gap-2 text-[#382419] font-serif font-semibold text-base mb-1">
                    <ScrollText className="w-4 h-4 text-[#A77B42]" />
                    <span>Master Woodcarvers of SSSA</span>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    Our workshop guild brings together specialized masters: relief sculptors who shape three-dimensional foliage, lattice artisans who hand-perforate ornate screens, and finishing experts who coax rich honey patinas out of raw timber.
                  </p>
                </div>

                {/* Handmade Uniqueness */}
                <div className="p-4 bg-[#EAE0D2]/50 border border-[#A77B42]/30">
                  <div className="flex items-center gap-2 text-[#382419] font-serif font-semibold text-base mb-1">
                    <Sparkles className="w-4 h-4 text-[#A77B42]" />
                    <span>Every Creation is One-of-a-Kind</span>
                  </div>
                  <p className="text-xs text-[#59534C] font-light leading-relaxed">
                    Because each item is manually shaped from natural solid wood, subtle differences in growth rings, grain tone, and chisel depth make each creation distinctly unique—a genuine hallmark of authentic handmade craft.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ========================================================
          6. QUALITY CONTROL & PACKAGING
      ======================================================== */}
      <div className="py-24 sm:py-32 bg-[#EAE0D2]/35 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
              <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
                Global Assurance
              </span>
              <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight">
              Quality That Travels Beyond Borders
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#59534C] font-light leading-relaxed">
              Serving international wholesalers, boutique hotel developers, and luxury retailers demands absolute consistency. We unite handmade artistry with systematic quality inspection and protective export packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 6 cols: Two-column cards */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Multi-Point Inspection */}
              <div className="p-6 bg-white border border-[#EAE0D2] shadow-sm hover:border-[#A77B42] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-semibold text-[#382419]">Multi-Point Quality Inspection</h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#A77B42] font-semibold">Strict Verification Checkpoints</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-[#59534C] font-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] mt-1 shrink-0" />
                    <span><strong>Wood Grain &amp; Structure:</strong> Verification of fiber stability, absence of structural defects, and smooth joints.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] mt-1 shrink-0" />
                    <span><strong>Leveling &amp; Balance:</strong> Surface wobble checks, 4-point leveling, and hardware fitting alignment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] mt-1 shrink-0" />
                    <span><strong>Finish Consistency:</strong> Hand-feel smoothness, uniform stain coverage, and splinter-free perimeter inspection.</span>
                  </li>
                </ul>
              </div>

              {/* Export Packaging */}
              <div className="p-6 bg-white border border-[#EAE0D2] shadow-sm hover:border-[#A77B42] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#382419] text-[#C4975C] flex items-center justify-center shrink-0">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-semibold text-[#382419]">Export-Grade Protective Packaging</h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#A77B42] font-semibold">Engineered For Overseas Transit</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-[#59534C] font-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] mt-1 shrink-0" />
                    <span><strong>Multi-Layer Cushioning:</strong> High-density foam wrap, edge protectors, and corrugated cushioning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] mt-1 shrink-0" />
                    <span><strong>Carton &amp; Timber Crating:</strong> Heavy-duty export master cartons, reinforced corners, and timber crates for fragile carved elements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A77B42] mt-1 shrink-0" />
                    <span><strong>Moisture Barriers:</strong> Desiccant pouches and sealed poly-wrapping to prevent humidity absorption in maritime container shipping.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right 5 cols: Professional Inspection / Finished Product Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={getAssetPath("/images/craft_packaging.jpg")}
                  alt="Finished wooden handicrafts inspected and prepared for international export packaging"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#382419]/90 text-[#F7F3EC] border-l-2 border-[#A77B42]">
                  <p className="text-xs uppercase font-semibold tracking-wider text-[#C4975C]">Export Readiness</p>
                  <p className="text-xs text-[#EAE0D2] font-light mt-0.5">Reliable preparation and packaging delivering pristine wooden art across the globe.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
