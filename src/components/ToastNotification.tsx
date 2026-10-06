import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onClose: (id: string) => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ id, type, title, message, onClose }) => {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 p-4 bg-[#171717] border border-[#262626] rounded-xl shadow-2xl shadow-black/80 max-w-sm w-full transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      <div className="flex-shrink-0 mt-0.5">
        {type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#FF6B00]" />}
        {type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
        {type === 'info' && <Info className="w-5 h-5 text-[#FF6B00]" />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white tracking-wide">{title}</h4>
        {message && <p className="text-xs text-[#E5E5E5]/80 mt-0.5 leading-relaxed">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        aria-label="Dismiss notification"
        className="flex-shrink-0 text-[#737373] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#262626]"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
