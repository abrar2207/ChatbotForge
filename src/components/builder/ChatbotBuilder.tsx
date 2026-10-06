import React from 'react';
import { ChatbotConfig } from '../../types';
import { Step1Idea } from './Step1Idea';
import { Step2Behaviour } from './Step2Behaviour';
import { Step3Features } from './Step3Features';
import { Step4Design } from './Step4Design';
import { Step5Generate } from './Step5Generate';
import { Check } from 'lucide-react';

interface ChatbotBuilderProps {
  currentStep: number;
  onSetStep: (step: number) => void;
  config: ChatbotConfig;
  onChangeConfig: (updated: Partial<ChatbotConfig>) => void;
  isBeginnerMode: boolean;
  onResetProject: () => void;
  onNotify: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const ChatbotBuilder: React.FC<ChatbotBuilderProps> = ({
  currentStep,
  onSetStep,
  config,
  onChangeConfig,
  isBeginnerMode,
  onResetProject,
  onNotify,
}) => {
  const steps = [
    { num: 1, label: 'Idea', code: '01' },
    { num: 2, label: 'Behaviour', code: '02' },
    { num: 3, label: 'Features', code: '03' },
    { num: 4, label: 'Design', code: '04' },
    { num: 5, label: 'Generate', code: '05' },
  ];

  return (
    <section id="builder" className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
      {/* Top Progress Indicator */}
      <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-[#171717] border border-[#262626] shadow-xl">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <React.Fragment key={step.num}>
                <button
                  type="button"
                  onClick={() => onSetStep(step.num)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0A0A0A] border border-[#FF6B00] shadow-md shadow-[#FF6B00]/20'
                      : isCompleted
                      ? 'hover:bg-[#262626] text-[#E5E5E5]'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* Step Pill */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                      isActive
                        ? 'bg-[#FF6B00] text-black'
                        : isCompleted
                        ? 'bg-[#262626] text-[#FF6B00]'
                        : 'bg-[#0A0A0A] text-[#737373]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.code}
                  </div>

                  {/* Label (Visible on all sizes, responsive font) */}
                  <span
                    className={`text-xs font-bold tracking-tight hidden min-[400px]:inline ${
                      isActive
                        ? 'text-[#FF6B00]'
                        : isCompleted
                        ? 'text-white'
                        : 'text-[#737373]'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-1 sm:mx-2 bg-[#262626] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentStep > step.num ? 'bg-[#FF6B00]' : 'bg-transparent'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Panels */}
      <div className="min-h-[500px]">
        {currentStep === 1 && (
          <Step1Idea
            config={config}
            onChange={onChangeConfig}
            onNext={() => onSetStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Behaviour
            config={config}
            onChange={onChangeConfig}
            onNext={() => onSetStep(3)}
            onBack={() => onSetStep(1)}
            isBeginnerMode={isBeginnerMode}
          />
        )}

        {currentStep === 3 && (
          <Step3Features
            config={config}
            onChange={onChangeConfig}
            onNext={() => onSetStep(4)}
            onBack={() => onSetStep(2)}
            isBeginnerMode={isBeginnerMode}
          />
        )}

        {currentStep === 4 && (
          <Step4Design
            config={config}
            onChange={onChangeConfig}
            onNext={() => onSetStep(5)}
            onBack={() => onSetStep(3)}
            isBeginnerMode={isBeginnerMode}
          />
        )}

        {currentStep === 5 && (
          <Step5Generate
            config={config}
            isBeginnerMode={isBeginnerMode}
            onEditRequirements={() => onSetStep(2)}
            onResetProject={onResetProject}
            onNotify={onNotify}
          />
        )}
      </div>
    </section>
  );
};
