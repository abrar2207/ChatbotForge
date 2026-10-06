import React from 'react';
import { CHATBOT_TYPES } from '../../constants/presets';
import { ChatbotConfig, ChatbotType } from '../../types';
import { Check, Sparkles } from 'lucide-react';

interface Step1IdeaProps {
  config: ChatbotConfig;
  onChange: (updated: Partial<ChatbotConfig>) => void;
  onNext: () => void;
}

export const Step1Idea: React.FC<Step1IdeaProps> = ({ config, onChange, onNext }) => {
  const handleSelectType = (typeId: ChatbotType) => {
    const preset = CHATBOT_TYPES.find((t) => t.id === typeId);
    if (!preset) return;

    // If changing type, intelligently update default name and purpose if currently default or empty
    const currentIsDefaultName = CHATBOT_TYPES.some((t) => t.defaultName === config.name) || !config.name;
    const currentIsDefaultPurpose = CHATBOT_TYPES.some((t) => t.defaultPurpose === config.purpose) || !config.purpose;

    onChange({
      type: typeId,
      name: currentIsDefaultName ? preset.defaultName : config.name,
      purpose: currentIsDefaultPurpose ? preset.defaultPurpose : config.purpose,
      knowledge: config.knowledge || preset.defaultKnowledge,
    });
  };

  const isCustom = config.type === 'custom';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <span className="text-xs font-mono font-bold text-[#FF6B00]">STEP 01</span>
          <span className="text-xs text-[#737373]">/ 05</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What do you want to build?
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#737373]">
          Start with an idea. You can customize everything later.
        </p>
      </div>

      {/* Grid of 9 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {CHATBOT_TYPES.map((item) => {
          const isSelected = config.type === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectType(item.id)}
              className={`flex flex-col p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 relative group active:scale-[0.98] ${
                isSelected
                  ? 'bg-[#171717] border-[#FF6B00] shadow-xl shadow-[#FF6B00]/15 ring-1 ring-[#FF6B00]'
                  : 'bg-[#171717]/60 border-[#262626] hover:border-[#737373] hover:bg-[#171717]'
              }`}
            >
              {/* Checkmark indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#FF6B00] text-black flex items-center justify-center font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className={`text-base font-bold tracking-tight transition-colors ${
                isSelected ? 'text-[#FF6B00]' : 'text-white group-hover:text-[#FF6B00]'
              }`}>
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-[#E5E5E5]/80 leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Custom Idea Field (shown if custom is selected) */}
      {isCustom && (
        <div className="p-5 rounded-2xl bg-[#171717] border border-[#FF6B00] animate-in fade-in duration-200 text-left">
          <label className="block text-sm font-bold text-white mb-2">
            Describe your idea
          </label>
          <p className="text-xs text-[#737373] mb-3">
            What is your unique concept? What problem does it solve and who is it for?
          </p>
          <textarea
            value={config.customTypeDescription}
            onChange={(e) => onChange({ customTypeDescription: e.target.value })}
            placeholder="e.g. An AI mentor for freshman architecture students that analyzes blueprint scales, drafting standards, and materials..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#262626] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-sm text-white placeholder-[#737373] outline-none transition-all resize-y"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end pt-4 border-t border-[#262626]">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-[#FF6B00]/25 active:scale-95 flex items-center gap-2"
        >
          <span>Continue to Behaviour</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
};
