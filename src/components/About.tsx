import React from 'react';
import { ArrowUpRight, Globe2, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import emblem from '../assets/logo/sssa_emblem.png';
import { getAssetPath } from '../utils/paths';
import { openWhatsAppEnquiry } from '../utils/whatsapp';

interface AboutProps {
  onOpenEnquiry?: (topic?: string) => void;
}

export const About: React.FC<AboutProps> = () => {
  const woodMaterials = [
    {
      name: "Mango Wood",
      character: "Rich Warm Grain & Dense Hardwood",
      image: getAssetPath("/images/wood_mango.jpg"),
    },
    {
      name: "Oak Wood",
      character: "Prominent Grain & Enduring Strength",
      image: getAssetPath("/images/wood_oak.jpg"),
    },
    {
      name: "Teak Wood",
      character: "Golden Luster & Natural Moisture Resistance",
      image: getAssetPath("/images/wood_teak.jpg"),
    },
    {
      name: "Pine Wood",
      character: "Subtle Knots & Light Contemporary Charm",
      image: getAssetPath("/images/wood_pine.jpg"),
    },
    {
      name: "Acacia Wood",
      character: "Contrasting Heartwood & High Durability",
      image: getAssetPath("/images/wood_acacia.jpg"),
    },
    {
      name: "Reclaimed Wood",
      character: "Authentic Old Truck & Sleeper Patina",
      image: getAssetPath("/images/wood_reclaimed.jpg"),
    },
  ];

  const partnershipAdvantages = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#A77B42]" />,
      title: "The Jodhpur Heritage",
      description: "Authentic craftsmanship from a city renowned worldwide for its artisan talent.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#A77B42]" />,
      title: "Versatile Materials",
      description: "From pristine Oak and Teak to character-rich reclaimed woods.",
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[#A77B42]" />,
      title: "European Market Expertise",
      description: "Six years of proven reliability and design understanding in European exports.",
    },
    {
      icon: <Sliders className="w-5 h-5 text-[#A77B42]" />,
      title: "End-to-End Customization",
      description: "In-house manufacturing means your specific design requirements and dimensions are executed flawlessly.",
    },
  ];

  return (
    <section id="about" className="bg-[#FAF7F2] text-[#25221F] relative overflow-hidden">
      
      {/* =========================================================================
          2. ABOUT US HERO SECTION (Two-column Introduction)
      ========================================================================= */}
      <div className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#EAE0D2]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Eyebrow, Main Heading, Exact Intro Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
              <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-[0.24em] text-[#A77B42]">
                MANUFACTURER &amp; EXPORTER OF WOODEN HANDICRAFTS FURNITURE
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight leading-[1.15]">
              Crafting Timeless Furniture. <br />
              <span className="italic font-light text-[#A77B42]">Rooted in Heritage.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#59534C] font-light leading-relaxed pt-2">
              Welcome to Shree Shiv Shakti Art, a premier furniture manufacturing and export house rooted in the vibrant heart of Jodhpur. Known affectionately as the "City of Joy," the "Blue City," and the "Sun City," Jodhpur is globally celebrated as India's capital of handicrafts. We are proud to carry forward the rich legacy of this city's master craftsmen, translating generations of woodworking artistry into exceptional furniture for the modern world.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs tracking-widest uppercase font-semibold text-[#382419]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#A77B42]"></span>
              <span>Jodhpur, Rajasthan, India • Capital of Handicrafts</span>
            </div>
          </div>

          {/* Right Column: Reference 3 Asymmetrical Two-Column 5-Image Furniture Collage */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-[#EAE0D2] bg-[#F3ECE1]/60 p-2.5 sm:p-4">
                
                {/* Asymmetrical 2-Column Grid matching Reference 3 */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3.5 items-stretch min-h-[340px] xs:min-h-[380px] sm:min-h-[480px] md:min-h-[520px]">
                  
                  {/* Column 1: Larger Tall Top Panel + Rectangular Bottom Panel */}
                  <div className="flex flex-col gap-2 sm:gap-3.5 justify-between">
                    {/* Top-Left: Round Stone Pedestal Table (Taller Dominant Panel) */}
                    <div className="group/panel relative overflow-hidden rounded-lg sm:rounded-xl border border-[#A77B42]/30 bg-[#271911] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl flex-1 min-h-[160px] xs:min-h-[190px] sm:min-h-[260px]">
                      <img
                        src={getAssetPath("/images/about/hero_round_table.jpg")}
                        alt="Handcrafted Round Stone Pedestal Dining Table"
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/panel:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2 sm:p-3">
                        <span className="text-[9px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                          Pedestal Dining
                        </span>
                      </div>
                    </div>

                    {/* Bottom-Left: Double Arch Console Table (Rectangular Panel) */}
                    <div className="group/panel relative overflow-hidden rounded-lg sm:rounded-xl border border-[#A77B42]/30 bg-[#271911] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl h-[110px] xs:h-[130px] sm:h-[180px]">
                      <img
                        src={getAssetPath("/images/about/hero_arch_console.jpg")}
                        alt="Dual Arch Sculptural Console Table"
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/panel:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2 sm:p-3">
                        <span className="text-[9px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                          Arch Console
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Top Rectangular Panel + Compact Mid Panel + Larger Bottom Panel */}
                  <div className="flex flex-col gap-2 sm:gap-3.5 justify-between">
                    {/* Top-Right: Fluted Oval Dining Table */}
                    <div className="group/panel relative overflow-hidden rounded-lg sm:rounded-xl border border-[#A77B42]/30 bg-[#271911] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl h-[95px] xs:h-[115px] sm:h-[155px]">
                      <img
                        src={getAssetPath("/images/about/hero_oval_dining.jpg")}
                        alt="Handcrafted Fluted Oval Dining Table"
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/panel:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2 sm:p-3">
                        <span className="text-[9px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                          Fluted Oval Table
                        </span>
                      </div>
                    </div>

                    {/* Mid-Right: Dual-Drawer Artisan End Cabinet */}
                    <div className="group/panel relative overflow-hidden rounded-lg sm:rounded-xl border border-[#A77B42]/30 bg-[#271911] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl h-[85px] xs:h-[100px] sm:h-[135px]">
                      <img
                        src={getAssetPath("/images/about/hero_drawer_cabinet.jpg")}
                        alt="Handcrafted Two-Drawer Bedside Cabinet"
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/panel:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2 sm:p-3">
                        <span className="text-[9px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                          Artisan End Cabinet
                        </span>
                      </div>
                    </div>

                    {/* Bottom-Right: Curved Media Credenza (Taller Accent Panel) */}
                    <div className="group/panel relative overflow-hidden rounded-lg sm:rounded-xl border border-[#A77B42]/30 bg-[#271911] shadow-md transition-all duration-300 hover:border-[#C4975C] hover:shadow-xl flex-1 min-h-[95px] xs:min-h-[115px] sm:min-h-[155px]">
                      <img
                        src={getAssetPath("/images/about/hero_media_credenza.jpg")}
                        alt="Artisanal Curved Wood Media Credenza"
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/panel:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-2 sm:p-3">
                        <span className="text-[9px] sm:text-xs font-medium text-[#F7F3EC] tracking-wide">
                          Curved Credenza
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Floating Artisan Badge */}
                <div className="mt-3 sm:mt-3.5 p-3 sm:p-4.5 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#EAE0D2] rounded-xl shadow-lg">
                  <div className="flex items-center gap-3.5">
                    <img src={emblem} alt="SSSA Emblem" className="w-8 sm:w-9 h-8 sm:h-9 object-contain" />
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#382419]">
                        Generations of Woodworking Artistry
                      </h4>
                      <p className="text-[11.5px] text-[#59534C] font-light mt-0.5">
                        Master chisel work, traditional joinery, and meticulous hand-finishing.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. OUR EXPERTISE & MATERIALS
      ========================================================================= */}
      <div className="py-20 sm:py-28 bg-[#F3ECE1]/40 border-b border-[#EAE0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
              <span className="text-xs uppercase font-semibold tracking-[0.24em] text-[#A77B42]">
                Materials &amp; Craft Expertise
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#382419] tracking-tight">
              Where Traditional Craft Meets Contemporary Design
            </h3>

            <p className="text-base sm:text-lg text-[#59534C] font-light leading-relaxed">
              We specialize in designing and manufacturing premium wooden handicraft furniture. By combining traditional joinery techniques with contemporary aesthetics, our skilled artisans breathe life into a diverse range of premium timbers. Our portfolio features ethically sourced solid woods, including Mango, Oak, Teak, Pine, and Acacia, alongside unique, sustainable pieces crafted from reclaimed old truck and sleeper wood.
            </p>

            <p className="text-sm sm:text-base text-[#7D6E63] font-light leading-relaxed italic">
              This diverse material mastery allows us to create furniture that ranges from sleek and modern to richly rustic and industrial.
            </p>
          </div>

          {/* Timber Composition Grid: Mango, Oak, Teak, Pine, Acacia, Reclaimed */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {woodMaterials.map((timber) => (
              <div
                key={timber.name}
                className="group relative bg-[#FAF7F2] border border-[#EAE0D2] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="h-40 sm:h-48 overflow-hidden bg-black/5 relative">
                  <img
                    src={timber.image}
                    alt={`${timber.name} texture and wood grain`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#271911]/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D4AF37] block">
                      Solid Timber
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold tracking-wide">
                      {timber.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-[#FAF7F2]">
                  <p className="text-[11px] text-[#59534C] font-light leading-tight line-clamp-2">
                    {timber.character}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* =========================================================================
          4. OUR EXPORT EXPERIENCE (European Market & International Reach)
      ========================================================================= */}
      <div className="py-20 sm:py-28 bg-[#271911] text-[#F7F3EC] relative overflow-hidden">
        {/* Subtle Background Ambience */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src={getAssetPath("/images/about_european_interior.jpg")}
            alt="European Interior Background"
            className="w-full h-full object-cover object-center filter grayscale"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs uppercase font-semibold tracking-[0.24em] text-[#D4AF37]">
                  Global Trade &amp; B2B Delivery
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
                Trusted Craftsmanship. <br />
                <span className="text-[#C4975C] italic font-light">International Reach.</span>
              </h3>

              <p className="text-base sm:text-lg text-[#EAE0D2]/90 font-light leading-relaxed">
                For the past six years, Shree Shiv Shakti Art has successfully exported high-quality furniture across the European market. We have built a dedicated, experienced export team that deeply understands European design trends, quality standards, and compliance requirements. This specialized market knowledge ensures a seamless experience for our B2B partners, from initial design concepts to final delivery.
              </p>

              {/* Stat Highlights: 6 Years & European Market */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#A77B42]/30 max-w-lg">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#D4AF37]">
                    6 Years
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#EAE0D2]/80 font-medium">
                    Continuous European Export Presence
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#D4AF37]">
                    European Market
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#EAE0D2]/80 font-medium">
                    Strict Quality &amp; Compliance Standards
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: European interior showcase image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-[#A77B42]/30 shadow-2xl group">
                <img
                  src={getAssetPath("/images/about_european_interior.jpg")}
                  alt="Premium wooden furniture displayed in a sophisticated European-style interior"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-xs text-[#EAE0D2] font-light bg-[#271911]/85 backdrop-blur-xs p-3.5 border-l-2 border-[#D4AF37]">
                  Precision joinery, kiln-dried seasoned timbers, and packaging engineered for global shipping.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          5. IN-HOUSE MANUFACTURING & CUSTOMIZATION
      ========================================================================= */}
      <div className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Workshop and furniture assembly imagery */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-md border border-[#EAE0D2] h-52 sm:h-64">
                    <img
                      src={getAssetPath("/images/about_workshop_craft.jpg")}
                      alt="Artisan assembling custom wooden furniture in workshop"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md border border-[#EAE0D2] h-36 sm:h-44">
                    <img
                      src={getAssetPath("/images/craft_tools.jpg")}
                      alt="Traditional hand woodworking tools"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="rounded-lg overflow-hidden shadow-md border border-[#EAE0D2] h-36 sm:h-44">
                    <img
                      src={getAssetPath("/images/craft_joinery.jpg")}
                      alt="Precision wooden mortise and tenon joinery"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md border border-[#EAE0D2] h-52 sm:h-64">
                    <img
                      src={getAssetPath("/images/custom.jpg")}
                      alt="Finished bespoke customized wooden furniture"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-house Manufacturing & Customization content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
                <span className="text-xs uppercase font-semibold tracking-[0.24em] text-[#A77B42]">
                  Direct Factory Facility
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#382419] tracking-tight">
                From Our Workshop to Your Vision
              </h3>

              <p className="text-base sm:text-lg text-[#59534C] font-light leading-relaxed">
                At the core of our business is a collaborative, highly skilled team and our own in-house manufacturing facility. Because we control the entire production process, we offer complete flexibility to our clients. Whether you are looking for our signature collections or require fully customized, bespoke products tailored to your exact specifications, our team is equipped to bring your vision to reality with unmatched quality and precision.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#A77B42] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#59534C] font-light">
                    <strong className="font-semibold text-[#382419]">Complete Process Control:</strong> From timber seasoning and carving to assembly and export packaging.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#A77B42] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#59534C] font-light">
                    <strong className="font-semibold text-[#382419]">Bespoke OEM &amp; Private Label:</strong> Adaptations in dimensions, species, hardware, and finishes.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          6. WHY PARTNER WITH US? (4 Distinct Advantages)
      ========================================================================= */}
      <div className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#EAE0D2]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
              Partnership Strengths
            </span>
            <span className="w-5 h-[1.5px] bg-[#A77B42]"></span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#382419] tracking-tight">
            Why Partner With Shree Shiv Shakti Art?
          </h3>
        </div>

        {/* 4 Distinct Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {partnershipAdvantages.map((adv) => (
            <div
              key={adv.title}
              className="p-8 bg-[#FAF7F2] border border-[#EAE0D2] rounded-lg shadow-xs hover:shadow-lg transition-all duration-300 hover:border-[#A77B42]/50 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#EAE0D2]/50 flex items-center justify-center mb-6">
                  {adv.icon}
                </div>
                
                <h4 className="text-xl font-serif font-bold text-[#382419] mb-3">
                  {adv.title}
                </h4>

                <p className="text-sm text-[#59534C] font-light leading-relaxed">
                  {adv.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EAE0D2]/60">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A77B42]">
                  SSSA Advantage
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          7. CLOSING CTA
      ========================================================================= */}
      <div className="py-20 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <img src={emblem} alt="SSSA Emblem" className="w-10 h-10 object-contain mx-auto opacity-90" />
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#382419] tracking-tight">
            Let's Create Something Exceptional Together.
          </h3>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#59534C] font-light leading-relaxed">
            Looking for a reliable wooden furniture manufacturing partner? Connect with our team to discuss your next collection or custom furniture requirements.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => openWhatsAppEnquiry('About Us Partnership Enquiry')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#382419] text-[#F7F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#A77B42] transition-colors duration-300 shadow-md cursor-pointer"
            >
              <span>REQUEST AN ENQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#collections"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent text-[#382419] border border-[#382419]/40 text-xs uppercase tracking-widest font-semibold hover:bg-[#382419] hover:text-white hover:border-[#382419] transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE OUR COLLECTIONS</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};
