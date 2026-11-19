import React from 'react';
import { Award, Shield, Palette, Eye, Globe2, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: "Skilled Craftsmanship",
      description: "Experienced artisans bringing traditional hand-carving and joinery techniques into distinctive wooden creations."
    },
    {
      icon: Shield,
      title: "Quality-Focused Manufacturing",
      description: "Careful timber inspection, structural joinery, and attentive multi-stage surface review before dispatch."
    },
    {
      icon: Palette,
      title: "Customisation Capabilities",
      description: "Capable of tailoring sizes, timber preferences, finishes, and designs to match specific client specifications."
    },
    {
      icon: Eye,
      title: "Attention To Detail",
      description: "From intricate chisel cuts to consistent hand-buffed finishes, every piece receives careful artisan attention."
    },
    {
      icon: Globe2,
      title: "Export-Oriented Approach",
      description: "Structured communication, clear trade order coordination, and protective packing suited for international transit."
    },
    {
      icon: Sparkles,
      title: "Authentic Materials",
      description: "Commitment to solid wood integrity and genuine craftsmanship without compromising on artisanal value."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
              Why Choose Us
            </span>
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight">
            Built On Integrity. Defined By Quality.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#59534C] font-light leading-relaxed">
            We work closely with trade partners, retailers, and design professionals to deliver dependable wooden handicraft and furniture manufacturing solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="p-8 bg-white border border-[#EAE0D2] hover:border-[#A77B42] transition-all duration-300 shadow-sm hover:shadow-md group relative"
              >
                <div className="w-12 h-12 bg-[#F7F3EC] border border-[#EAE0D2] group-hover:bg-[#382419] group-hover:border-[#382419] flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-5 h-5 text-[#A77B42] group-hover:text-[#C4975C] transition-colors" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#382419] mb-3 group-hover:text-[#A77B42] transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#59534C] font-light leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
