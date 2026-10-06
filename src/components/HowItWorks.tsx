import React from 'react';
import { Lightbulb, Sliders, FileCheck2, ExternalLink } from 'lucide-react';

export const HowItWorks: React.FC<{ onStartBuilding: () => void }> = ({ onStartBuilding }) => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Idea',
      description: 'Tell us what kind of chatbot you want.',
      detail: 'Pick from popular student templates like Study Assistant, Coding Mentor, or create a completely custom bot.',
      icon: Lightbulb,
    },
    {
      num: '02',
      title: 'Customize It',
      description: 'Define its personality, knowledge, behaviour, and features.',
      detail: 'Tailor who it helps, what tone it speaks with, what rules prevent hallucinations, and whether it needs voice or files.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'Generate Your Prompt',
      description: 'ChatbotForge creates a complete AI Studio build specification.',
      detail: 'Our engine compiles your inputs into an exhaustive engineering prompt with security, UI, and mobile rules.',
      icon: FileCheck2,
    },
    {
      num: '04',
      title: 'Build in Google AI Studio',
      description: 'Copy the prompt, paste it into Google AI Studio, and start building.',
      detail: 'One tap copies your prompt. Switch to Google AI Studio, paste it into the editor, and watch your chatbot build.',
      icon: ExternalLink,
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#262626]">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          <span className="text-xs font-mono font-semibold tracking-wider text-[#FF6B00] uppercase">
            Four Simple Steps
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          How It Works
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#737373]">
          No technical jargon, no prerequisite coding experience. Built specifically for students in AI workshops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative flex flex-col p-6 rounded-2xl bg-[#171717] border border-[#262626] hover:border-[#FF6B00]/60 transition-all duration-300 group shadow-lg"
            >
              {/* Orange Step Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-black text-[#FF6B00] group-hover:scale-105 transition-transform">
                  {step.num}
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#E5E5E5] group-hover:text-[#FF6B00] group-hover:border-[#FF6B00]/40 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#FF6B00] transition-colors tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-white/90 leading-snug">
                {step.description}
              </p>
              <p className="mt-2 text-xs text-[#737373] leading-relaxed">
                {step.detail}
              </p>

              {/* Bottom connecting subtle bar */}
              <div className="mt-5 pt-3 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#737373]">
                <span>Step {idx + 1} of 4</span>
                <span className="text-[#FF6B00] font-semibold">Ready</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onStartBuilding}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#FF6B00]/40 hover:border-[#FF6B00] text-white font-bold text-sm transition-all"
        >
          <span>Ready to build? Launch ChatbotForge</span>
          <span className="text-[#FF6B00]">→</span>
        </button>
      </div>
    </section>
  );
};
