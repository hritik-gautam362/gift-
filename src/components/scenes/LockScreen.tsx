import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, Lock, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showTapHint, setShowTapHint] = useState<boolean>(false);
  
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const tapTimeoutRef = useRef<number | null>(null);

  const HOLD_DURATION = 2000; // 2 seconds

  const startHolding = () => {
    if (isUnlocked) return;
    setIsHolding(true);
    setShowTapHint(false);
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    soundEngine.playHeartbeat();

    const startTime = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsUnlocked(true);
        soundEngine.playSparkle();
        soundEngine.playMagicChime();
        setTimeout(() => {
          onUnlock();
        }, 800);
      }
    }, 30);
  };

  const stopHolding = () => {
    if (isUnlocked) return;
    setIsHolding(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (progress < 100) {
      setShowTapHint(true);
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = window.setTimeout(() => {
        setShowTapHint(false);
      }, 2500);
    }

    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-[#050208] flex flex-col items-center justify-between p-6 select-none overflow-hidden font-sans-clean">
      {/* Background stardust & Vibrant space radial gradient */}
      <div className="absolute inset-0 bg-vibrant-space pointer-events-none"></div>

      {/* Unlock Flash Effect */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/40 via-pink-400/30 to-white/60 animate-ping z-30 pointer-events-none"></div>
      )}

      {/* Heading and Subtitle Instruction Header */}
      {!isUnlocked ? (
        <div className="pt-8 text-center space-y-2 z-20 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-medium tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            Security Check
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 text-glow-pink">
            Touch & Hold to Begin
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 font-medium max-w-xs mx-auto leading-relaxed">
            Press and hold the fingerprint until the scan reaches 100%.
          </p>
        </div>
      ) : (
        <div className="pt-8"></div>
      )}

      {/* Fingerprint Scanner Interactive Ring */}
      <div className={`relative my-auto z-20 flex items-center justify-center transition-transform duration-500 ease-out ${isHolding ? 'scale-125' : 'scale-100'}`}>
        {/* SVG Progress Ring */}
        <svg className="w-48 h-48 -rotate-90 transform pointer-events-none">
          {/* Track */}
          <circle
            cx="96"
            cy="96"
            r="80"
            className="stroke-rose-950/40"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress fill */}
          <circle
            cx="96"
            cy="96"
            r="80"
            className="stroke-rose-500 transition-all duration-75"
            strokeWidth="5"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - progress / 100)}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: 'drop-shadow(0 0 12px rgba(244, 63, 94, 0.8))' }}
          />
        </svg>

        {/* Floating pulse rings when holding */}
        {isHolding && (
          <>
            <div className="absolute w-44 h-44 rounded-full border border-pink-500/40 animate-ping pointer-events-none"></div>
            <div className="absolute w-52 h-52 rounded-full border border-rose-500/20 animate-pulse pointer-events-none"></div>
          </>
        )}

        {/* Center Fingerprint Button with subtle pulsing animation when idle */}
        <button
          onMouseDown={startHolding}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={startHolding}
          onTouchEnd={stopHolding}
          onTouchCancel={stopHolding}
          className={`absolute w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${
            isUnlocked
              ? 'bg-rose-500 text-white shadow-[0_0_60px_rgba(244,63,94,1)] scale-125'
              : isHolding
              ? 'bg-rose-900/60 border-2 border-rose-300 text-rose-100 shadow-[0_0_50px_rgba(244,63,94,0.8)] scale-120'
              : 'bg-slate-950/80 border border-pink-500/30 text-rose-400 hover:border-pink-400/60 shadow-[0_0_25px_rgba(244,63,94,0.4)] scale-100 animate-pulse'
          }`}
        >
          {/* Shimmer scanline */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent animate-scan opacity-70"></div>
          </div>

          <Fingerprint className={`w-14 h-14 transition-transform duration-300 ${isHolding ? 'scale-110 animate-pulse text-rose-200' : 'text-rose-400 animate-pulse'}`} />

          <span className="text-[10px] mt-1 font-medium tracking-wider text-rose-300/80">
            {isUnlocked ? 'UNLOCKED' : `${Math.round(progress)}%`}
          </span>
        </button>
      </div>

      {/* Footer Hints */}
      {!isUnlocked ? (
        <div className="pb-8 text-center z-20 space-y-2">
          {showTapHint ? (
            <div className="px-4 py-1.5 bg-rose-950/90 border border-rose-400/50 backdrop-blur-md rounded-full text-rose-200 text-xs font-medium shadow-lg animate-bounce inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>Press and hold to continue.</span>
            </div>
          ) : (
            <p className="text-xs text-rose-300/60 font-light tracking-wide animate-fadeIn">
              Do not release your finger while scanning.
            </p>
          )}
        </div>
      ) : (
        <div className="pb-8"></div>
      )}
    </div>
  );
};

