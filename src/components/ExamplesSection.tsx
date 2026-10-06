import React from 'react';
import { EXAMPLE_TEMPLATES } from '../constants/presets';
import { ExampleTemplate } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ExamplesSectionProps {
  onSelectExample: (template: ExampleTemplate) => void;
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({ onSelectExample }) => {
  return (
    <section id="examples" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#262626]">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-xs font-mono font-semibold tracking-wider text-[#FF6B00] uppercase">
            Curated Templates
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          What Can You Build?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#737373]">
          Click any example below to prefill the builder with a tested, workshop-ready configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXAMPLE_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => onSelectExample(tpl)}
            className="flex flex-col p-6 rounded-2xl bg-[#171717] border border-[#262626] hover:border-[#FF6B00] transition-all duration-300 group cursor-pointer text-left relative overflow-hidden shadow-md"
          >
            {/* Top row with emoji & action */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {tpl.emoji}
              </div>
              <span className="text-xs font-semibold text-[#737373] group-hover:text-[#FF6B00] flex items-center gap-1 transition-colors">
                <span>Load Template</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B00] transition-colors tracking-tight">
              {tpl.title}
            </h3>
            <p className="text-xs font-semibold text-[#FF6B00] mt-1">
              {tpl.tagline}
            </p>

            {/* Description */}
            <p className="mt-2.5 text-xs text-[#E5E5E5]/80 leading-relaxed flex-1">
              {tpl.description}
            </p>

            {/* Bottom tag preview */}
            <div className="mt-5 pt-3 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#737373]">
              <span>Category: {tpl.config.type?.toUpperCase()}</span>
              <span className="px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#262626] text-[#E5E5E5]">
                1-Click Load
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
