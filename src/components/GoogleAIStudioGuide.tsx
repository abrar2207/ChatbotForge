import React from 'react';
import { Copy, ExternalLink, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface GoogleAIStudioGuideProps {
  onCopyPrompt?: () => void;
  hasGeneratedPrompt?: boolean;
}

export const GoogleAIStudioGuide: React.FC<GoogleAIStudioGuideProps> = ({
  onCopyPrompt,
  hasGeneratedPrompt = false,
}) => {
  const handleOpenAIStudio = () => {
    window.open('https://aistudio.google.com/', '_blank', 'noopener,noreferrer');
  };

  const steps = [
    {
      num: '01',
      title: 'Copy',
      tagline: 'Copy the generated prompt.',
      description: 'Click "Copy Prompt" above to save the complete specification to your device clipboard.',
      icon: Copy,
    },
    {
      num: '02',
      title: 'Open',
      tagline: 'Open Google AI Studio.',
      description: 'Navigate to Google AI Studio in a new tab using the orange button below or on your phone browser.',
      icon: ExternalLink,
    },
    {
      num: '03',
      title: 'Build',
      tagline: 'Paste the prompt and let AI Studio create your chatbot.',
      description: 'Create a new prompt/app, paste your prompt into the system prompt window, and tap Run.',
      icon: Cpu,
    },
  ];

  return (
    <section className="mt-12 pt-10 border-t border-[#262626] max-w-4xl mx-auto w-full text-left">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          <span className="text-xs font-mono font-semibold tracking-wider text-[#FF6B00] uppercase">
            Execution Blueprint
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Build It in Google AI Studio
        </h2>
        <p className="mt-2 text-sm text-[#737373] max-w-xl mx-auto">
          Take your prompt straight into the Google AI Studio ecosystem in three fast steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="p-5 rounded-2xl bg-[#171717] border border-[#262626] relative overflow-hidden group hover:border-[#FF6B00]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-black text-[#FF6B00]">
                    {s.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#E5E5E5] group-hover:text-[#FF6B00] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs font-semibold text-[#FF6B00] mt-0.5">
                  {s.tagline}
                </p>
                <p className="mt-2 text-xs text-[#737373] leading-relaxed">
                  {s.description}
                </p>
              </div>

              {s.num === '01' && onCopyPrompt && (
                <div className="mt-4 pt-3 border-t border-[#262626]">
                  <button
                    onClick={onCopyPrompt}
                    className="w-full py-2 px-3 rounded-lg bg-[#0A0A0A] hover:bg-[#262626] text-xs font-semibold text-white border border-[#262626] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Copy Now</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main CTA to Google AI Studio */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={handleOpenAIStudio}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#FF6B00]/25 active:scale-95 group"
        >
          <span>Open Google AI Studio</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {onCopyPrompt && hasGeneratedPrompt && (
          <button
            onClick={onCopyPrompt}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Copy className="w-4 h-4 text-[#FF6B00]" />
            <span>Copy Prompt First</span>
          </button>
        )}
      </div>

      {/* Helper notice */}
      <p className="text-center text-xs text-[#737373] mt-3">
        Google AI Studio is free to use with your Google account.
      </p>
    </section>
  );
};
