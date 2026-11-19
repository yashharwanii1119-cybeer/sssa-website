import React from 'react';
import { Trees, Compass, Hammer, CheckSquare2 } from 'lucide-react';

export const Manufacturing: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Material Selection",
      icon: Trees,
      description: "Careful grading and selection of quality natural timber. Wood stock is selected and seasoned to prepare for stability and structural carving.",
    },
    {
      num: "02",
      title: "Crafting & Carving",
      icon: Hammer,
      description: "Timber pieces are sized and shaped with traditional joinery. Artisans carve relief motifs, moldings, and sculptural profiles according to product designs.",
    },
    {
      num: "03",
      title: "Detailing & Assembly",
      icon: Compass,
      description: "Fine joinery lockup, edge smoothing, and optional metal or inlay elements. Parts are fitted and checked for alignment and aesthetic balance.",
    },
    {
      num: "04",
      title: "Final Finishing & Quality Inspection",
      icon: CheckSquare2,
      description: "Surface sanding followed by client-specified finishes (wax, stain, patina, or protective topcoat). Detailed visual check and protective packaging.",
    },
  ];

  return (
    <section id="manufacturing" className="py-24 bg-[#EAE0D2]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#A77B42]">
              Manufacturing Process
            </span>
            <span className="w-6 h-[1.5px] bg-[#A77B42]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#382419] tracking-tight">
            From Raw Wood To Timeless Creations.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#59534C] font-light leading-relaxed">
            Our manufacturing approach aligns traditional woodworking artistry with disciplined inspection checkpoints to ensure dependable quality for domestic and overseas shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[1px] bg-[#A77B42]/30 z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 bg-[#F7F3EC] p-7 border border-[#EAE0D2] shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#382419] text-[#C4975C] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#A77B42] group-hover:text-white transition-colors">
                    {step.num}
                  </div>
                  <Icon className="w-6 h-6 text-[#A77B42] stroke-[1.5]" />
                </div>

                <h3 className="text-lg font-serif font-semibold text-[#382419] mb-3 leading-snug group-hover:text-[#A77B42] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#59534C] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-[#382419] text-[#F7F3EC] p-8 sm:p-10 border-l-4 border-[#A77B42] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-serif font-normal text-white">
              Protective Packaging &amp; Export Care
            </h4>
            <p className="text-xs text-[#EAE0D2]/80 font-light max-w-2xl leading-relaxed">
              Finished creations are wrapped with protective foam and packed in durable multi-wall cartons with corner reinforcements and custom crating options for secure transit.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#C4975C] whitespace-nowrap">
            <span>Domestic &amp; Export Shipments</span>
          </div>
        </div>
      </div>
    </section>
  );
};
