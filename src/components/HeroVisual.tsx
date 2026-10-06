import React, { useState } from 'react';
import { Lightbulb, Cog, FileCode2, Bot, ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(2);

  const stages = [
    {
      id: 0,
      step: '01',
      title: 'YOUR IDEA',
      subtitle: 'Raw concept',
      icon: Lightbulb,
      preview: '“I want a study buddy to help freshman classmates pass programming exams.”',
      tag: 'Input',
    },
    {
      id: 1,
      step: '02',
      title: 'APDOVA CHATBOTFORGE',
      subtitle: 'Prompt compiler',
      icon: Cog,
      preview: 'Configures personality, strict safety rules, mobile UI & Gemini instructions.',
      tag: 'Engine',
      highlight: true,
    },
    {
      id: 2,
      step: '03',
      title: 'AI STUDIO PROMPT',
      subtitle: 'Complete specification',
      icon: FileCode2,
      preview: '# ROLE: Expert Developer\n# PROJECT: StudyBuddy\n# CONVERSATION RULES...',
      tag: 'Output',
    },
    {
      id: 3,
      step: '04',
      title: 'YOUR CHATBOT',
      subtitle: 'Working AI application',
      icon: Bot,
      preview: '🤖 StudyBuddy: “Hi Alex! Ready to tackle Python loops today with hints?”',
      tag: 'Live in AI Studio',
    },
  ];

  return (
    <div className="w-full my-8">
      {/* Container Card */}
      <div className="bg-[#171717]/80 border border-[#262626] rounded-2xl p-4 sm:p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
        {/* Subtle orange accent glow top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-80" />

        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
            <span className="text-xs font-mono font-semibold tracking-wider text-[#FF6B00] uppercase">
              How the Magic Happens
            </span>
          </div>
          <span className="text-xs text-[#737373]">Tap any stage to inspect</span>
        </div>

        {/* Desktop / Tablet Grid (4 columns) & Mobile Stack */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            const isApdova = stage.highlight;

            return (
              <React.Fragment key={stage.id}>
                <div
                  onClick={() => setActiveStage(idx)}
                  className={`group relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all duration-300 text-left ${
                    isSelected
                      ? 'bg-[#0A0A0A] border-[#FF6B00] shadow-lg shadow-[#FF6B00]/10 ring-1 ring-[#FF6B00]/50'
                      : isApdova
                      ? 'bg-[#171717] border-[#FF6B00]/40 hover:border-[#FF6B00]'
                      : 'bg-[#0A0A0A] border-[#262626] hover:border-[#737373]'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-xs font-bold text-[#FF6B00]">
                      {stage.step}
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#262626] text-[#E5E5E5]">
                      {stage.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isApdova || isSelected
                          ? 'bg-[#FF6B00] text-black'
                          : 'bg-[#262626] text-[#E5E5E5] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black tracking-wide text-white group-hover:text-[#FF6B00] transition-colors">
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-[#737373] leading-none mt-0.5">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Preview text */}
                  <div className="mt-2 text-[11px] text-[#E5E5E5]/90 font-mono bg-[#171717] p-2 rounded border border-[#262626]/70 line-clamp-2 leading-relaxed">
                    {stage.preview}
                  </div>

                  {/* Active Indicator dot */}
                  {isSelected && (
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#FF6B00]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active step</span>
                    </div>
                  )}
                </div>

                {/* Mobile Connector Arrow */}
                {idx < stages.length - 1 && (
                  <div className="md:hidden flex justify-center py-0.5 text-[#FF6B00]">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Stage Expanded Insight */}
        <div className="mt-4 pt-3 border-t border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#E5E5E5] gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B00] font-bold">Stage {stages[activeStage].step}:</span>
            <span className="font-medium text-white">{stages[activeStage].title}</span>
            <span className="text-[#737373] hidden sm:inline">—</span>
            <span className="text-[#737373]">{stages[activeStage].preview}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FF6B00]">
            <span>100% Free for AI Workshop Students</span>
          </div>
        </div>
      </div>
    </div>
  );
};
