import React, { useState } from 'react';
import { ChatbotConfig, DesignStyle, AvatarChoice } from '../../types';
import { DESIGN_STYLES, AVATAR_OPTIONS } from '../../constants/presets';
import { Palette, Check, Sliders, Smartphone } from 'lucide-react';

interface Step4DesignProps {
  config: ChatbotConfig;
  onChange: (updated: Partial<ChatbotConfig>) => void;
  onNext: () => void;
  onBack: () => void;
  isBeginnerMode: boolean;
}

export const Step4Design: React.FC<Step4DesignProps> = ({
  config,
  onChange,
  onNext,
  onBack,
  isBeginnerMode,
}) => {
  const [customEmojiInput, setCustomEmojiInput] = useState(
    config.design.customAvatarEmoji || '🤖'
  );

  const handleSelectStyle = (styleId: DesignStyle) => {
    onChange({
      design: {
        ...config.design,
        style: styleId,
      },
    });
  };

  const handleSelectAvatar = (avatarId: AvatarChoice) => {
    onChange({
      design: {
        ...config.design,
        avatar: avatarId,
      },
    });
  };

  const colorPresets = [
    { hex: '#FF6B00', name: 'Apdova Orange', recommended: true },
    { hex: '#FFFFFF', name: 'Pure White', recommended: false },
    { hex: '#F5A623', name: 'Warm Amber', recommended: false },
    { hex: '#94A3B8', name: 'Slate Light', recommended: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <span className="text-xs font-mono font-bold text-[#FF6B00]">STEP 04</span>
          <span className="text-xs text-[#737373]">/ 05</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Design your chatbot
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#737373]">
          Configure visual style, avatar icon, and theme colors. Strictly optimized for the Apdova design system.
        </p>
      </div>

      {/* 1. Choose a Style */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white">Choose a style</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DESIGN_STYLES.map((st) => {
            const isSelected = config.design.style === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleSelectStyle(st.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#171717] border-[#FF6B00] shadow-md shadow-[#FF6B00]/10 ring-1 ring-[#FF6B00]'
                    : 'bg-[#171717]/60 border-[#262626] text-[#E5E5E5] hover:border-[#737373]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white">{st.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#FF6B00] stroke-[3]" />}
                </div>
                <p className="text-[11px] text-[#737373] leading-snug">{st.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Chatbot Avatar */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white">Chatbot Avatar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {AVATAR_OPTIONS.map((av) => {
            const isSelected = config.design.avatar === av.id;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => handleSelectAvatar(av.id)}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-[#171717] border-[#FF6B00] ring-1 ring-[#FF6B00]'
                    : 'bg-[#171717]/60 border-[#262626] hover:border-[#737373]'
                }`}
              >
                <div className="text-2xl mb-1">{av.emoji}</div>
                <div className="text-xs font-bold text-white">{av.label}</div>
              </button>
            );
          })}
        </div>

        {/* Custom Avatar Emoji input */}
        {config.design.avatar === 'custom' && (
          <div className="p-3.5 rounded-xl bg-[#171717] border border-[#262626] flex items-center gap-3">
            <label className="text-xs font-bold text-white">Type any emoji:</label>
            <input
              type="text"
              value={customEmojiInput}
              maxLength={2}
              onChange={(e) => {
                setCustomEmojiInput(e.target.value);
                onChange({
                  design: {
                    ...config.design,
                    customAvatarEmoji: e.target.value,
                  },
                });
              }}
              className="w-16 px-2 py-1 text-center text-lg bg-[#0A0A0A] border border-[#262626] rounded-lg text-white"
            />
          </div>
        )}
      </div>

      {/* 3. Accent Color */}
      <div className="p-5 rounded-2xl bg-[#171717] border border-[#262626] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#FF6B00]" />
              <span>Accent Color</span>
            </h3>
            <p className="text-xs text-[#737373] mt-0.5">
              Default is Apdova Orange (#FF6B00). Strictly recommended for the Apdova design identity.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#FF6B00]">
            {config.design.accentColor}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {colorPresets.map((c) => {
            const isSelected = config.design.accentColor === c.hex;
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() =>
                  onChange({
                    design: {
                      ...config.design,
                      accentColor: c.hex,
                    },
                  })
                }
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#0A0A0A] border-[#FF6B00] ring-1 ring-[#FF6B00]'
                    : 'bg-[#0A0A0A] border-[#262626] hover:border-[#737373]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-4 h-4 rounded-full border border-black/40"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-bold text-white">{c.name}</span>
                </div>
                {c.recommended && (
                  <span className="text-[10px] font-mono uppercase text-[#FF6B00] font-bold">
                    RECOMMENDED
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Advanced Settings (Visible in Advanced Mode) */}
      {!isBeginnerMode && (
        <div className="p-5 rounded-2xl bg-[#171717] border border-[#FF6B00]/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#FF6B00]" />
              <span>Advanced AI Studio Specs</span>
            </h3>
            <span className="text-xs font-mono text-[#FF6B00] uppercase font-bold">Advanced Mode</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Model Target */}
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Target Gemini Model
              </label>
              <select
                value={config.advancedSettings?.recommendedModel || 'gemini-2.5-flash'}
                onChange={(e) =>
                  onChange({
                    advancedSettings: {
                      ...config.advancedSettings!,
                      recommendedModel: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#0A0A0A] border border-[#262626] text-xs text-white outline-none focus:border-[#FF6B00]"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fast, multimodal, recommended)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep reasoning, complex code)</option>
              </select>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                <span>Creativity / Temperature</span>
                <span className="text-[#FF6B00] font-mono">
                  {config.advancedSettings?.temperature ?? 0.7}
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.1"
                value={config.advancedSettings?.temperature ?? 0.7}
                onChange={(e) =>
                  onChange({
                    advancedSettings: {
                      ...config.advancedSettings!,
                      temperature: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full accent-[#FF6B00] cursor-pointer"
              />
            </div>
          </div>

          {/* Custom System Instruction Override */}
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Custom System Instructions (Optional)
            </label>
            <input
              type="text"
              value={config.advancedSettings?.systemInstructionCustom || ''}
              onChange={(e) =>
                onChange({
                  advancedSettings: {
                    ...config.advancedSettings!,
                    systemInstructionCustom: e.target.value,
                  },
                })
              }
              placeholder="e.g. Always address user as 'Apprentice' and structure answers in markdown tables."
              className="w-full px-3 py-2 rounded-xl bg-[#0A0A0A] border border-[#262626] text-xs text-white outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-sm font-semibold text-white transition-colors"
        >
          ← Back to Features
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-7 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-[#FF6B00]/25 active:scale-95 flex items-center gap-2"
        >
          <span>✨ Review & Generate</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
};
