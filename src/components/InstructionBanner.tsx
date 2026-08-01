import React from 'react';
import { Sparkles } from 'lucide-react';

interface InstructionBannerProps {
  text: string;
  icon?: React.ReactNode;
  visible: boolean;
  position?: 'top' | 'bottom' | 'center';
}

export const InstructionBanner: React.FC<InstructionBannerProps> = ({
  text,
  icon,
  visible,
  position = 'top',
}) => {
  if (!visible) return null;

  const positionClasses =
    position === 'top'
      ? 'top-24 sm:top-28'
      : position === 'bottom'
      ? 'bottom-24 sm:bottom-28'
      : 'top-1/2 -translate-y-1/2';

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${positionClasses} z-40 transition-all duration-500 ease-out transform ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
      }`}
    >
      <div className="px-4 py-2 bg-slate-950/85 border border-pink-500/35 backdrop-blur-xl rounded-full text-pink-200 text-xs font-medium tracking-wide shadow-[0_4px_25px_rgba(236,72,153,0.3)] flex items-center gap-2 max-w-[90vw] text-center justify-center animate-pulse">
        {icon || <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />}
        <span>{text}</span>
      </div>
    </div>
  );
};
