import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X, ArrowRight, Stamp } from 'lucide-react';
import { soundEngine } from '../../utils/sound';
import { InstructionBanner } from '../InstructionBanner';

interface Scene5LetterProps {
  letterText: string;
  senderName: string;
  herName: string;
  onNext: () => void;
}

export const Scene5Letter: React.FC<Scene5LetterProps> = ({
  letterText,
  senderName,
  herName,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedEnvelope, setSelectedEnvelope] = useState<number | null>(null);

  const handleOpenEnvelope = (id: number) => {
    setSelectedEnvelope(id);
    soundEngine.playSparkle();
    setTimeout(() => {
      setIsOpen(true);
      soundEngine.playChime(600, 'sine', 0.8);
    }, 400);
  };

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-gradient-to-b from-slate-950 via-rose-950/30 to-black text-white flex flex-col justify-between p-6 overflow-hidden select-none font-sans-clean">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-900/10 to-transparent pointer-events-none"></div>

      {/* Instruction Overlay */}
      <InstructionBanner
        text="Tap an Envelope to Break the Wax Seal"
        visible={!isOpen}
        position="top"
      />

      {/* Header */}
      <div className="pt-6 text-center space-y-1.5 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          Scene 5: Sealed With a Kiss
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-display text-amber-100 text-glow-gold">
          A Sealed Letter for {herName}
        </h2>
        <p className="text-xs text-slate-300/80">
          Tap an envelope to break the wax seal and unfold my message
        </p>
      </div>

      {/* Floating Envelopes Arena */}
      {!isOpen && (
        <div className="relative flex-1 w-full my-6 z-20 flex items-center justify-center">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              onClick={() => handleOpenEnvelope(id)}
              className={`absolute cursor-pointer transition-all duration-500 transform hover:scale-110 active:scale-95 group ${
                selectedEnvelope === id ? 'scale-125 opacity-0' : ''
              }`}
              style={{
                top: `${20 + (id - 1) * 25}%`,
                left: `${15 + ((id * 23) % 45)}%`,
                animation: `floatDrift ${3 + id}s ease-in-out infinite alternate`,
                animationDelay: `${id * 0.4}s`,
              }}
            >
              {/* 3D Envelope Card */}
              <div className="w-48 h-32 bg-gradient-to-br from-amber-100 via-rose-50 to-pink-100 rounded-2xl shadow-2xl p-3 border-2 border-amber-300/60 relative flex flex-col justify-between overflow-hidden">
                {/* Envelope Fold Pattern */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-amber-200/50 clip-path-envelope pointer-events-none border-b border-amber-300/40"></div>

                {/* Wax Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-rose-600 rounded-full border-2 border-amber-200 shadow-md flex items-center justify-center text-amber-100 font-serif-display font-bold text-xs group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 fill-rose-100 text-rose-100" />
                </div>

                <div className="flex justify-between items-center text-[10px] text-amber-900/60 font-serif-display italic pt-1">
                  <span>To: My Beloved</span>
                  <span>#0{id}</span>
                </div>

                <div className="text-center text-[11px] font-handwriting text-rose-950 font-bold tracking-wider">
                  Tap to Unfold ❤️
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Keyframe animation for drifting envelopes */}
      <style>{`
        @keyframes floatDrift {
          0% { transform: translateY(0px) rotate(-3deg); }
          10% { transform: translateY(-12px) rotate(2deg); }
        }
      `}</style>

      {/* Unfolded Love Letter Modal / View */}
      {isOpen && (
        <div className="relative z-30 my-auto p-5 bg-[#faf6f0] text-slate-900 rounded-3xl shadow-2xl border-4 border-amber-200/80 max-w-sm mx-auto space-y-4 animate-scaleUp">
          {/* Header stamp */}
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif-display font-bold text-sm">
              <Stamp className="w-4 h-4 text-amber-700" />
              <span>Personal Love Letter</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Paper Letter Text Content */}
          <div className="max-h-[320px] overflow-y-auto pr-1 space-y-3 font-handwriting text-xl text-slate-800 leading-relaxed font-medium">
            {letterText.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Signature */}
          <div className="pt-2 border-t border-amber-900/10 text-right font-handwriting-calligraphy text-2xl text-rose-900">
            {senderName}
          </div>
        </div>
      )}

      {/* Footer Next Button */}
      <div className="pb-6 pt-2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onNext}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-medium text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Reveal My Surprise Gift 🎁</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
