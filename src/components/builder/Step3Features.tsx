import React from 'react';
import { ChatbotConfig } from '../../types';
import { BASIC_FEATURES, ADVANCED_FEATURES } from '../../constants/presets';
import { CheckSquare, Square, Sparkles, Zap, Smartphone } from 'lucide-react';

interface Step3FeaturesProps {
  config: ChatbotConfig;
  onChange: (updated: Partial<ChatbotConfig>) => void;
  onNext: () => void;
  onBack: () => void;
  isBeginnerMode: boolean;
}

export const Step3Features: React.FC<Step3FeaturesProps> = ({
  config,
  onChange,
  onNext,
  onBack,
  isBeginnerMode,
}) => {
  const toggleFeature = (featureKey: keyof ChatbotConfig['features']) => {
    onChange({
      features: {
        ...config.features,
        [featureKey]: !config.features[featureKey],
      },
    });
  };

  const selectedCount = Object.values(config.features).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <span className="text-xs font-mono font-bold text-[#FF6B00]">STEP 03</span>
          <span className="text-xs text-[#737373]">/ 05</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What features do you want?
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#737373]">
          Choose the interactive capabilities of your chatbot. All features are configured mobile-first.
        </p>
      </div>

      {/* Beginner Mode Notice */}
      {isBeginnerMode && (
        <div className="p-4 rounded-xl bg-[#171717] border border-[#262626] flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-white">Beginner Workshop Tip:</span>{' '}
            <span className="text-[#E5E5E5]/90">
              All 8 core basic features are enabled by default for a flawless mobile chat experience. Advanced features like Multimodal Vision or Speech can be enabled with one click.
            </span>
          </div>
        </div>
      )}

      {/* 1. Basic Features */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF6B00]" />
            <span>Basic Features</span>
          </h3>
          <span className="text-xs font-mono text-[#737373]">Essential Core</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BASIC_FEATURES.map((item) => {
            const isChecked = Boolean(config.features[item.id as keyof ChatbotConfig['features']]);
            return (
              <div
                key={item.id}
                onClick={() => toggleFeature(item.id as keyof ChatbotConfig['features'])}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-[#171717] border-[#FF6B00]/70 text-white shadow-sm'
                    : 'bg-[#171717]/50 border-[#262626] text-[#737373] hover:border-[#737373]'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5 text-[#FF6B00]">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 fill-[#FF6B00]/20 text-[#FF6B00]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#737373]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white">{item.label}</div>
                  <div className="text-[11px] text-[#737373] mt-0.5 leading-snug">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Advanced Features */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            <span>Advanced Features</span>
          </h3>
          <span className="text-xs font-mono text-[#FF6B00]">Extended Capabilities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ADVANCED_FEATURES.map((item) => {
            const isChecked = Boolean(config.features[item.id as keyof ChatbotConfig['features']]);
            return (
              <div
                key={item.id}
                onClick={() => toggleFeature(item.id as keyof ChatbotConfig['features'])}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isChecked
                    ? 'bg-[#171717] border-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/10'
                    : 'bg-[#171717]/50 border-[#262626] text-[#737373] hover:border-[#737373]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#262626] text-[#FF6B00]">
                      ADVANCED
                    </span>
                    <div className="text-[#FF6B00]">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 fill-[#FF6B00]/20 text-[#FF6B00]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#737373]" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-white">{item.label}</div>
                  <div className="text-[11px] text-[#737373] mt-1 leading-snug">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Counter */}
      <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center justify-between text-xs font-mono text-[#737373]">
        <span>Total Selected Features:</span>
        <span className="text-[#FF6B00] font-bold">{selectedCount} active</span>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-sm font-semibold text-white transition-colors"
        >
          ← Back to Behaviour
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-[#FF6B00]/25 active:scale-95 flex items-center gap-2"
        >
          <span>Continue to Design</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
};
