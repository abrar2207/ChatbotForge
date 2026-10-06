import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Smartphone, Check } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onStartBuilding: () => void;
  onSeeHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilding, onSeeHowItWorks }) => {
  return (
    <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 overflow-hidden text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background subtle radial glow with Apdova orange */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6B00]/10 blur-[120px] rounded-full"
      />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#262626] mb-6 animate-in fade-in">
        <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
        <span className="text-xs font-semibold tracking-wide text-[#E5E5E5]">
          Apdova AI Workshop Edition
        </span>
        <span className="text-xs text-[#737373]">|</span>
        <span className="text-xs text-[#FF6B00] font-bold">Google AI Studio</span>
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] sm:leading-[1.15]">
        Build Your <span className="text-[#FF6B00] relative inline-block">AI Chatbot</span>.
        <br className="hidden sm:inline" /> Without Starting From Scratch.
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-xl text-[#E5E5E5]/90 max-w-2xl mx-auto leading-relaxed">
        Turn your idea into a complete Google AI Studio build prompt — even if you've never written code before.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
        <button
          onClick={onStartBuilding}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-extrabold text-base tracking-wide transition-all shadow-xl shadow-[#FF6B00]/30 active:scale-95 flex items-center justify-center gap-2.5 group"
        >
          <span>Create My Chatbot Prompt</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onSeeHowItWorks}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-[#FF6B00]" />
          <span>See How It Works</span>
        </button>
      </div>

      {/* Supporting Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs font-medium text-[#737373]">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-[#E5E5E5]">Mobile Friendly</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-[#E5E5E5]">Beginner Friendly</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-[#E5E5E5]">Google AI Studio</span>
        </div>
      </div>

      {/* Hero Visual showing the flow */}
      <HeroVisual />
    </section>
  );
};
