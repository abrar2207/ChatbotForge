import React, { useState, useEffect } from 'react';
import { ChatbotConfig } from '../../types';
import { generateApdovaPrompt } from '../../utils/promptGenerator';
import {
  Sparkles,
  Copy,
  RotateCw,
  Edit3,
  Download,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code,
  FileText,
} from 'lucide-react';
import { GoogleAIStudioGuide } from '../GoogleAIStudioGuide';

interface Step5GenerateProps {
  config: ChatbotConfig;
  isBeginnerMode: boolean;
  onEditRequirements: () => void;
  onResetProject: () => void;
  onNotify: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const Step5Generate: React.FC<Step5GenerateProps> = ({
  config,
  isBeginnerMode,
  onEditRequirements,
  onResetProject,
  onNotify,
}) => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  // Validate requirements
  const isValid = Boolean(config.name.trim() && config.purpose.trim() && config.type);

  // Trigger prompt generation
  const handleGenerate = () => {
    if (!isValid) {
      setErrorState('Tell us what your chatbot should do first.');
      return;
    }

    try {
      setIsGenerating(true);
      setErrorState(null);

      // Micro-delay for smooth animation feedback
      setTimeout(() => {
        try {
          const result = generateApdovaPrompt(config, isBeginnerMode);
          setGeneratedPrompt(result);
          setIsGenerating(false);
          onNotify(
            'success',
            'Prompt Generated Successfully',
            'Your Google AI Studio build specification is compiled and ready.'
          );
        } catch (err) {
          setIsGenerating(false);
          setErrorState('Something went wrong while generating your prompt. Please check your details and try again.');
        }
      }, 400);
    } catch {
      setIsGenerating(false);
      setErrorState('Something went wrong while generating your prompt. Please check your details and try again.');
    }
  };

  // Generate automatically if not generated yet and valid
  useEffect(() => {
    if (isValid && !generatedPrompt) {
      handleGenerate();
    }
  }, []);

  const handleCopy = async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setHasCopied(true);
      onNotify(
        'success',
        '✓ Prompt copied successfully',
        'Next: Open Google AI Studio and paste your prompt.'
      );
      setTimeout(() => setHasCopied(false), 3000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = generatedPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setHasCopied(true);
      onNotify(
        'success',
        '✓ Prompt copied successfully',
        'Next: Open Google AI Studio and paste your prompt.'
      );
      setTimeout(() => setHasCopied(false), 3000);
    }
  };

  const handleDownload = () => {
    if (!generatedPrompt) return;
    const blob = new Blob([generatedPrompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = config.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'chatbot';
    link.href = url;
    link.download = `apdova_${safeName}_prompt.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify('info', 'Download Started', `Saved as apdova_${safeName}_prompt.txt`);
  };

  const handleOpenAIStudio = () => {
    window.open('https://aistudio.google.com/', '_blank', 'noopener,noreferrer');
  };

  const wordCount = generatedPrompt ? generatedPrompt.trim().split(/\s+/).length : 0;
  const charCount = generatedPrompt ? generatedPrompt.length : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      {/* Top Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] mb-3">
          <span className="text-xs font-mono font-bold text-[#FF6B00]">STEP 05</span>
          <span className="text-xs text-[#737373]">/ 05</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>🚀 Your Google AI Studio Prompt Is Ready</span>
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#737373]">
          Copy this prompt and paste it into Google AI Studio.
        </p>
      </div>

      {/* Validation Error State */}
      {!isValid && (
        <div className="p-5 rounded-2xl bg-[#171717] border border-red-500/50 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">Missing Required Details</h4>
            <p className="text-xs text-[#E5E5E5]/90 mt-1">
              Tell us what your chatbot should do first. Please enter a Chatbot Name and Purpose before generating.
            </p>
            <button
              onClick={onEditRequirements}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-bold hover:bg-[#ff7a1a]"
            >
              Go to Step 2 to Complete →
            </button>
          </div>
        </div>
      )}

      {/* Generation Failure Error Box */}
      {errorState && (
        <div className="p-4 rounded-xl bg-[#171717] border border-red-500 flex items-center justify-between">
          <span className="text-xs text-red-400 font-medium">{errorState}</span>
          <button
            onClick={handleGenerate}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#171717] border border-[#262626]">
        {/* Left Stats */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
          <span className="flex items-center gap-1.5 text-white font-semibold">
            <Code className="w-4 h-4 text-[#FF6B00]" />
            <span>AI Studio Specification</span>
          </span>
          <span>•</span>
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 ${
              hasCopied
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-[#FF6B00] hover:bg-[#ff7a1a] text-black shadow-md shadow-[#FF6B00]/25'
            }`}
          >
            {hasCopied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>📋 Copy Prompt</span>
              </>
            )}
          </button>

          {/* Regenerate */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-3 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] border border-[#262626] text-xs font-semibold text-[#E5E5E5] flex items-center gap-1.5 transition-colors disabled:opacity-50"
            title="Regenerate prompt with current settings"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#FF6B00] ${isGenerating ? 'animate-spin' : ''}`} />
            <span>🔄 Regenerate</span>
          </button>

          {/* Edit Requirements */}
          <button
            type="button"
            onClick={onEditRequirements}
            className="px-3 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] border border-[#262626] text-xs font-semibold text-[#E5E5E5] flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>✏️ Edit Requirements</span>
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] border border-[#262626] text-xs font-semibold text-[#E5E5E5] flex items-center gap-1.5 transition-colors"
            title="Download prompt as .txt"
          >
            <Download className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>⬇️ Download</span>
          </button>
        </div>
      </div>

      {/* Prompt Editor Display Container */}
      <div className="relative rounded-2xl bg-[#000000] border border-[#262626] shadow-2xl overflow-hidden">
        {/* Editor Top Bar */}
        <div className="px-4 py-2.5 bg-[#0A0A0A] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#262626]" />
            <div className="w-3 h-3 rounded-full bg-[#262626]" />
            <div className="w-3 h-3 rounded-full bg-[#262626]" />
            <span className="ml-2 font-mono text-xs text-[#737373]">
              google-aistudio-build-prompt.md
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#FF6B00]">
            Format: Markdown Spec
          </span>
        </div>

        {/* Prompt Content */}
        {isGenerating ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3 text-center p-8">
            <div className="w-10 h-10 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-white">
              Synthesizing Google AI Studio Architecture...
            </p>
            <p className="text-xs text-[#737373]">
              Assembling safety rules, mobile viewport constraints, and prompt logic.
            </p>
          </div>
        ) : generatedPrompt ? (
          <div className="relative">
            <pre className="p-5 sm:p-6 text-xs sm:text-sm font-mono text-[#E5E5E5] leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[560px] select-text">
              {generatedPrompt}
            </pre>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#737373]">
            <FileText className="w-8 h-8 mb-2 opacity-50 text-[#FF6B00]" />
            <p className="text-sm font-semibold text-white">Your chatbot prompt will appear here.</p>
            <p className="text-xs mt-1">Click the button below to generate your specification.</p>
            <button
              onClick={handleGenerate}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#FF6B00] text-black font-bold text-xs"
            >
              Generate Now
            </button>
          </div>
        )}
      </div>

      {/* FINAL SUCCESS SCREEN / ACTION CARDS (Requirement 24) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#171717] border border-[#FF6B00]/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Deployment</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              🚀 Your AI Idea Is Ready to Build
            </h3>
            <p className="text-sm text-[#E5E5E5]/90 mt-1">
              You now have a complete, production-grade specification for your chatbot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#FF6B00]/25 flex items-center gap-1.5"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Prompt</span>
            </button>
            <button
              onClick={handleOpenAIStudio}
              className="px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] border border-[#262626] text-white font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-[#FF6B00]" />
              <span>Open Google AI Studio</span>
            </button>
            <button
              onClick={onResetProject}
              className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#737373] hover:text-white font-bold text-xs transition-colors"
            >
              Build Another Chatbot
            </button>
          </div>
        </div>
      </div>

      {/* Google AI Studio Guide Step-by-Step */}
      <GoogleAIStudioGuide
        onCopyPrompt={handleCopy}
        hasGeneratedPrompt={Boolean(generatedPrompt)}
      />
    </div>
  );
};
