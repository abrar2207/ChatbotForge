import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#262626] bg-[#000000] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FF6B00] flex items-center justify-center font-black text-black text-sm">
              A
            </div>
            <span className="text-xl font-extrabold tracking-wider text-white">APDOVA</span>
            <span className="text-xs text-[#737373]">/ CHATBOTFORGE</span>
          </div>
          <p className="mt-2 text-xs font-mono tracking-widest text-[#FF6B00] uppercase">
            AI • Innovation • Technology
          </p>
          <p className="mt-2 text-xs text-[#737373] max-w-sm">
            Empowering students, developers, and educators to engineer production-ready AI applications.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#E5E5E5]">
          <span className="text-[#E5E5E5] hover:text-[#FF6B00] cursor-pointer transition-colors">
            About Apdova
          </span>
          <span className="text-[#E5E5E5] hover:text-[#FF6B00] cursor-pointer transition-colors">
            Contact
          </span>
          <span className="text-[#E5E5E5] hover:text-[#FF6B00] cursor-pointer transition-colors">
            Privacy
          </span>
          <span className="text-[#E5E5E5] hover:text-[#FF6B00] cursor-pointer transition-colors">
            Terms
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#737373] font-mono">
          © 2026 Apdova. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
