import React, { useState } from 'react';
import { Menu, X, Sparkles, GraduationCap, RotateCcw, Wrench } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: 'home' | 'how-it-works' | 'examples' | 'workshop' | 'builder') => void;
  isWorkshopActive: boolean;
  onToggleWorkshop: () => void;
  isBeginnerMode: boolean;
  onToggleBeginnerMode: () => void;
  onOpenResetConfirm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  isWorkshopActive,
  onToggleWorkshop,
  isBeginnerMode,
  onToggleBeginnerMode,
  onOpenResetConfirm,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: 'home' | 'how-it-works' | 'examples' | 'workshop' | 'builder') => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#262626] bg-[#0A0A0A]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center font-black text-black text-base tracking-tighter shadow-md shadow-[#FF6B00]/20 group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight">
                <span className="text-white text-base sm:text-lg tracking-wider font-extrabold">APDOVA</span>
                <span className="text-[#737373] text-sm">/</span>
                <span className="text-[#FF6B00] text-sm sm:text-base font-bold tracking-wide">CHATBOTFORGE</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-[#E5E5E5] hover:text-[#FF6B00] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('examples')}
              className="text-[#E5E5E5] hover:text-[#FF6B00] transition-colors"
            >
              Examples
            </button>
            <button
              onClick={() => {
                onToggleWorkshop();
                handleNavClick('workshop');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-semibold ${
                isWorkshopActive
                  ? 'bg-[#FF6B00]/15 border-[#FF6B00] text-[#FF6B00]'
                  : 'bg-[#171717] border-[#262626] text-[#E5E5E5] hover:border-[#737373]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Workshop Mode
            </button>

            {/* Beginner / Advanced Mode Pill */}
            <button
              onClick={onToggleBeginnerMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isBeginnerMode
                  ? 'bg-[#171717] border-[#262626] text-[#E5E5E5] hover:border-[#FF6B00]'
                  : 'bg-[#FF6B00]/10 border-[#FF6B00]/60 text-[#FF6B00]'
              }`}
              title={isBeginnerMode ? 'Switch to Advanced Mode (Detailed technical controls)' : 'Switch to Beginner Mode (Streamlined flow)'}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{isBeginnerMode ? 'Beginner Mode' : 'Advanced Mode'}</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenResetConfirm}
              title="Reset project"
              className="p-2 text-[#737373] hover:text-white hover:bg-[#171717] rounded-lg transition-colors border border-transparent hover:border-[#262626]"
              aria-label="Clear project"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('builder')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-sm tracking-wide transition-all shadow-md shadow-[#FF6B00]/25 active:scale-95"
            >
              <span>Start Building</span>
              <span className="text-base font-bold">→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('builder')}
              className="px-3 py-1.5 rounded-lg bg-[#FF6B00] text-black font-bold text-xs"
            >
              Build →
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E5E5E5] hover:text-white rounded-lg bg-[#171717] border border-[#262626]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#262626] bg-[#0A0A0A] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('builder')}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-[#FF6B00] text-black font-bold flex items-center justify-between"
            >
              <span>Create My Chatbot Prompt</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="w-full text-left px-3 py-2 rounded-lg text-[#E5E5E5] hover:bg-[#171717]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('examples')}
              className="w-full text-left px-3 py-2 rounded-lg text-[#E5E5E5] hover:bg-[#171717]"
            >
              Examples
            </button>
            <button
              onClick={() => {
                onToggleWorkshop();
                handleNavClick('workshop');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                isWorkshopActive ? 'bg-[#FF6B00]/15 text-[#FF6B00] font-semibold' : 'text-[#E5E5E5] hover:bg-[#171717]'
              }`}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Workshop Mode
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#171717] border border-[#262626]">
                {isWorkshopActive ? 'Active' : 'Open'}
              </span>
            </button>
            <button
              onClick={onToggleBeginnerMode}
              className="w-full text-left px-3 py-2 rounded-lg text-[#E5E5E5] hover:bg-[#171717] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Mode
              </span>
              <span className="text-xs font-semibold text-[#FF6B00]">
                {isBeginnerMode ? 'Beginner' : 'Advanced'}
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResetConfirm();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-[#171717] flex items-center gap-2 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear My Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
