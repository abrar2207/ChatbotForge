import React, { useState } from 'react';
import { ChatbotConfig } from '../../types';
import {
  TARGET_USER_OPTIONS,
  PERSONALITY_OPTIONS,
  RESPONSE_STYLES,
} from '../../constants/presets';
import { ShieldCheck, HelpCircle, Check, Plus, AlertCircle } from 'lucide-react';

interface Step2BehaviourProps {
  config: ChatbotConfig;
  onChange: (updated: Partial<ChatbotConfig>) => void;
  onNext: () => void;
  onBack: () => void;
  isBeginnerMode: boolean;
}

export const Step2Behaviour: React.FC<Step2BehaviourProps> = ({
  config,
  onChange,
  onNext,
  onBack,
  isBeginnerMode,
}) => {
  const [showCustomPersonalityInput, setShowCustomPersonalityInput] = useState<boolean>(
    Boolean(config.customPersonality)
  );

  const toggleTargetUser = (user: string) => {
    const current = config.targetUsers;
    const exists = current.includes(user);
    onChange({
      targetUsers: exists ? current.filter((u) => u !== user) : [...current, user],
    });
  };

  const togglePersonality = (pId: string) => {
    const current = config.personalities;
    const exists = current.includes(pId);
    onChange({
      personalities: exists ? current.filter((p) => p !== pId) : [...current, pId],
    });
  };

  const toggleResponseStyle = (styleId: string) => {
    const current = config.responseStyles;
    const exists = current.includes(styleId);
    onChange({
      responseStyles: exists ? current.filter((s) => s !== styleId) : [...current, styleId],
    });
  };

  const toggleSafetyRule = (key: keyof ChatbotConfig['safetyRules']) => {
    onChange({
      safetyRules: {
        ...config.safetyRules,
        [key]: !config.safetyRules[key],
      },
    });
  };

  // Validation
  const hasName = Boolean(config.name.trim());
  const hasPurpose = Boolean(config.purpose.trim());
  const canProceed = hasName && hasPurpose;

  return (
    <div className="space-y-10 animate-in fade-in duration-300 text-left">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <span className="text-xs font-mono font-bold text-[#FF6B00]">STEP 02</span>
          <span className="text-xs text-[#737373]">/ 05</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Let's define your chatbot
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#737373]">
          Give your chatbot a name, purpose, personality traits, and safety guardrails.
        </p>
      </div>

      {/* 1. Basic Identity Fields */}
      <div className="p-6 rounded-2xl bg-[#171717] border border-[#262626] space-y-5">
        {/* Chatbot Name */}
        <div>
          <label className="block text-sm font-bold text-white mb-1.5">
            Chatbot Name <span className="text-[#FF6B00]">*</span>
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. StudyBuddy"
            maxLength={40}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#262626] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-white font-medium text-sm placeholder-[#737373] outline-none transition-all"
          />
          {!hasName && (
            <p className="text-xs text-[#FF6B00] mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Chatbot name is required.
            </p>
          )}
        </div>

        {/* What should it do? */}
        <div>
          <label className="block text-sm font-bold text-white mb-1.5">
            What should it do? <span className="text-[#FF6B00]">*</span>
          </label>
          <textarea
            value={config.purpose}
            onChange={(e) => onChange({ purpose: e.target.value })}
            placeholder="Help first-year students understand programming concepts in simple language."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#262626] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-sm text-white placeholder-[#737373] outline-none transition-all resize-y"
          />
          {!hasPurpose && (
            <p className="text-xs text-[#FF6B00] mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Tell us what your chatbot should do first.
            </p>
          )}
        </div>

        {/* Who will use it? */}
        <div>
          <label className="block text-sm font-bold text-white mb-1.5">
            Who will use it?
          </label>
          <p className="text-xs text-[#737373] mb-3">
            Select who will be talking to your chatbot (select all that apply).
          </p>
          <div className="flex flex-wrap gap-2">
            {TARGET_USER_OPTIONS.map((user) => {
              const selected = config.targetUsers.includes(user);
              return (
                <button
                  key={user}
                  type="button"
                  onClick={() => toggleTargetUser(user)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    selected
                      ? 'bg-[#FF6B00]/15 border-[#FF6B00] text-[#FF6B00]'
                      : 'bg-[#0A0A0A] border-[#262626] text-[#E5E5E5] hover:border-[#737373]'
                  }`}
                >
                  {selected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{user}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CHATBOT PERSONALITY */}
      <div className="p-6 rounded-2xl bg-[#171717] border border-[#262626] space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            How should your chatbot behave?
          </h3>
          <p className="text-xs text-[#737373] mt-1">
            Choose personality traits that match your target audience (select multiple).
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PERSONALITY_OPTIONS.map((item) => {
            const isSelected = config.personalities.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => togglePersonality(item.id)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#0A0A0A] border-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/10'
                    : 'bg-[#0A0A0A] border-[#262626] text-[#E5E5E5] hover:border-[#737373]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{item.emoji}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6B00] stroke-[3]" />}
                </div>
                <div className="font-bold text-xs mt-2 text-white">{item.label}</div>
                <div className="text-[10px] text-[#737373] mt-0.5 leading-tight">{item.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Custom Personality Toggle */}
        <div className="pt-2">
          {!showCustomPersonalityInput ? (
            <button
              type="button"
              onClick={() => setShowCustomPersonalityInput(true)}
              className="text-xs font-semibold text-[#FF6B00] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Personality</span>
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#262626]">
              <label className="block text-xs font-bold text-white mb-1">
                Custom Personality Description
              </label>
              <input
                type="text"
                value={config.customPersonality}
                onChange={(e) => onChange({ customPersonality: e.target.value })}
                placeholder="e.g. Sarcastic but supportive, like a tough older sibling"
                className="w-full px-3 py-2 rounded-lg bg-[#171717] border border-[#262626] text-xs text-white focus:border-[#FF6B00] outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. KNOWLEDGE */}
      <div className="p-6 rounded-2xl bg-[#171717] border border-[#262626] space-y-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            What should your chatbot know?
          </h3>
          <p className="text-xs text-[#737373] mt-1">
            Tell the chatbot what topics, information, or knowledge it should focus on.
          </p>
        </div>

        <textarea
          value={config.knowledge}
          onChange={(e) => onChange({ knowledge: e.target.value })}
          placeholder="Python basics, variables, loops, functions, lists, dictionaries, and beginner programming concepts."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#262626] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-sm text-white placeholder-[#737373] outline-none transition-all resize-y"
        />
        <p className="text-[11px] text-[#737373] font-mono">
          Tip: You can list specific syllabus chapters, code frameworks, formulas, or company FAQs.
        </p>
      </div>

      {/* 4. RESPONSE STYLE */}
      <div className="p-6 rounded-2xl bg-[#171717] border border-[#262626] space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            How should it answer?
          </h3>
          <p className="text-xs text-[#737373] mt-1">
            Select response styles that best assist your users (select all that apply).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {RESPONSE_STYLES.map((style) => {
            const isSelected = config.responseStyles.includes(style.id);
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => toggleResponseStyle(style.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#0A0A0A] border-[#FF6B00] text-white shadow-sm'
                    : 'bg-[#0A0A0A] border-[#262626] text-[#E5E5E5] hover:border-[#737373]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{style.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6B00] stroke-[3]" />}
                </div>
                <p className="text-[10px] text-[#737373] mt-1">{style.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. SAFETY & BEHAVIOUR */}
      <div className="p-6 rounded-2xl bg-[#171717] border border-[#262626] space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
          <div>
            <h3 className="text-lg font-bold text-white">
              How should your chatbot handle uncertainty?
            </h3>
            <p className="text-xs text-[#737373] mt-0.5">
              Default recommended safety settings for reliable AI behavior.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Don't make things up */}
          <div
            onClick={() => toggleSafetyRule('noHallucination')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              config.safetyRules.noHallucination
                ? 'bg-[#0A0A0A] border-[#FF6B00]/60'
                : 'bg-[#0A0A0A] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={config.safetyRules.noHallucination}
                onChange={() => {}}
                className="accent-[#FF6B00] w-4 h-4 cursor-pointer"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Don't make things up</h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                If the chatbot doesn't know something, it should clearly say so.
              </p>
            </div>
          </div>

          {/* Ask when information is missing */}
          <div
            onClick={() => toggleSafetyRule('askClarification')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              config.safetyRules.askClarification
                ? 'bg-[#0A0A0A] border-[#FF6B00]/60'
                : 'bg-[#0A0A0A] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={config.safetyRules.askClarification}
                onChange={() => {}}
                className="accent-[#FF6B00] w-4 h-4 cursor-pointer"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Ask when information is missing</h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                The chatbot should ask clarifying questions when necessary.
              </p>
            </div>
          </div>

          {/* Stay within its purpose */}
          <div
            onClick={() => toggleSafetyRule('stayInScope')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              config.safetyRules.stayInScope
                ? 'bg-[#0A0A0A] border-[#FF6B00]/60'
                : 'bg-[#0A0A0A] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={config.safetyRules.stayInScope}
                onChange={() => {}}
                className="accent-[#FF6B00] w-4 h-4 cursor-pointer"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Stay within its purpose</h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                The chatbot should avoid unrelated responses.
              </p>
            </div>
          </div>

          {/* Explain instead of blindly answering */}
          <div
            onClick={() => toggleSafetyRule('explainStepByStep')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              config.safetyRules.explainStepByStep
                ? 'bg-[#0A0A0A] border-[#FF6B00]/60'
                : 'bg-[#0A0A0A] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={config.safetyRules.explainStepByStep}
                onChange={() => {}}
                className="accent-[#FF6B00] w-4 h-4 cursor-pointer"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Explain instead of blindly answering</h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                The chatbot should prioritize useful explanations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-sm font-semibold text-white transition-colors"
        >
          ← Back to Idea
        </button>

        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl font-extrabold text-sm tracking-wide transition-all flex items-center gap-2 ${
            canProceed
              ? 'bg-[#FF6B00] hover:bg-[#ff7a1a] text-black shadow-lg shadow-[#FF6B00]/25 active:scale-95'
              : 'bg-[#262626] text-[#737373] cursor-not-allowed'
          }`}
        >
          <span>Continue to Features</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
};
