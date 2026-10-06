import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckSquare, Square, Timer, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import { WorkshopChecklistItem } from '../types';

interface WorkshopModeProps {
  checklist: WorkshopChecklistItem[];
  onToggleItem: (id: string) => void;
  onResetChecklist: () => void;
  onJumpToBuilder: () => void;
}

export const WorkshopMode: React.FC<WorkshopModeProps> = ({
  checklist,
  onToggleItem,
  onResetChecklist,
  onJumpToBuilder,
}) => {
  // Timer state (seconds)
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleSelectDuration = (mins: number) => {
    setSelectedDurationMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setTimeLeft(selectedDurationMinutes * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = selectedDurationMinutes * 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  const completedCount = checklist.filter((item) => item.completed).length;
  const progress = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4 sm:px-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#171717] border-2 border-[#FF6B00] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B00]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Challenge Header */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Apdova AI Workshop Challenge</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Your Workshop Challenge
            </h2>
            <p className="mt-2 text-base sm:text-lg font-semibold text-[#FF6B00]">
              Build an AI chatbot that solves one real problem.
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#737373]">
              Work through the 11-step challenge below with your team or individually. Track your progress as you design, generate, and build your chatbot in Google AI Studio.
            </p>
          </div>

          {/* Workshop Timer Widget */}
          <div className="flex-shrink-0 bg-[#0A0A0A] border border-[#262626] rounded-xl p-4 w-full md:w-64 text-center">
            <div className="flex items-center justify-between text-xs font-mono text-[#737373] mb-2">
              <span className="flex items-center gap-1 text-[#FF6B00]">
                <Timer className="w-3.5 h-3.5" />
                Workshop Timer
              </span>
              <span>{isRunning ? 'RUNNING' : 'PAUSED'}</span>
            </div>

            {/* Big Countdown */}
            <div className="text-3xl font-black font-mono tracking-wider text-white py-1">
              {formattedTime}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden my-2.5">
              <div
                className="h-full bg-[#FF6B00] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Timer controls */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs transition-colors"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start</span>
                  </>
                )}
              </button>
              <button
                onClick={handleResetTimer}
                title="Reset timer"
                className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#262626] text-[#E5E5E5] border border-[#262626]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Minute Preset Selection */}
            <div className="grid grid-cols-4 gap-1 mt-3">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSelectDuration(mins)}
                  className={`py-1 text-[11px] font-mono rounded border transition-colors ${
                    selectedDurationMinutes === mins
                      ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00] font-bold'
                      : 'bg-[#171717] border-[#262626] text-[#737373] hover:text-white'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress summary bar */}
        <div className="mt-8 pt-6 border-t border-[#262626]">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-white">
              Challenge Checklist Progress ({completedCount} / {checklist.length})
            </span>
            <span className="text-[#FF6B00] font-mono">{progress}% Complete</span>
          </div>
          <div className="w-full h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B00] to-[#ff8c33] transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 11 Checklist Items */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checklist.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                item.completed
                  ? 'bg-[#0A0A0A] border-[#FF6B00]/40 text-white'
                  : 'bg-[#0A0A0A]/60 border-[#262626] text-[#E5E5E5] hover:border-[#737373]'
              }`}
            >
              <div className="flex-shrink-0 text-[#FF6B00]">
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 fill-[#FF6B00]/20 text-[#FF6B00]" />
                ) : (
                  <Square className="w-5 h-5 text-[#737373]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-mono text-[#737373] mr-1.5">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <span
                  className={`text-sm ${
                    item.completed ? 'line-through text-[#737373]' : 'font-medium text-white'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#262626]">
          <button
            onClick={onResetChecklist}
            className="text-xs text-[#737373] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Workshop Checklist</span>
          </button>

          <button
            onClick={onJumpToBuilder}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF6B00]/20"
          >
            <span>Jump to Prompt Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
