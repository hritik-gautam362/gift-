import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Moon, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/sound';

interface SceneFinalMoonProps {
  herName: string;
  senderName: string;
  onRestart: () => void;
}

export const SceneFinalMoon: React.FC<SceneFinalMoonProps> = ({
  herName,
  senderName,
  onRestart,
}) => {
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [isMerged, setIsMerged] = useState<boolean>(false);

  const holdTimerRef = useRef<number | null>(null);

  const startHoldingHand = () => {
    if (isMerged) return;
    setIsHolding(true);
    soundEngine.playHeartbeat();

    let count = 0;
    holdTimerRef.current = window.setInterval(() => {
      count += 5;

      if (count % 30 === 0) {
        soundEngine.playHeartbeat();
      }

      if (count >= 100) {
        completeHandHold();
      }
    }, 80);
  };

  const stopHoldingHand = () => {
    if (isMerged) return;
    setIsHolding(false);
    if (holdTimerRef.current !== null) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const completeHandHold = () => {
    if (holdTimerRef.current !== null) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsMerged(true);

    soundEngine.playUnlockSound();
    soundEngine.playFirework();

    // Trigger grand fireworks bursts
    const fireworkInterval = setInterval(() => {
      confetti({
        particleCount: 60,
        angle: 60 + Math.random() * 60,
        spread: 80,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#f43f5e', '#fbbf24', '#e879f9', '#38bdf8', '#ffffff'],
      });
      soundEngine.playFirework();
    }, 600);

    setTimeout(() => {
      clearInterval(fireworkInterval);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current !== null) clearInterval(holdTimerRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden select-none font-sans-clean">
      {/* Peaceful Night Sky Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black pointer-events-none"></div>

      {/* Floating Fireflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-amber-300 blur-[1px] transition-all duration-1000 ${
              isMerged ? 'animate-ping scale-125 bg-pink-300' : 'animate-pulse'
            }`}
            style={{
              width: `${(i % 3) + 3}px`,
              height: `${(i % 3) + 3}px`,
              top: isMerged ? '50%' : `${(i * 19) % 90}%`,
              left: isMerged ? '50%' : `${(i * 31) % 90}%`,
              transform: isMerged
                ? `rotate(${i * 15}deg) translate(80px)`
                : 'translate(0, 0)',
              animationDuration: `${2 + (i % 3)}s`,
              animationDelay: `${i * 0.2}s`,
              boxShadow: '0 0 10px rgba(251, 191, 36, 0.9)',
            }}
          />
        ))}
      </div>

      {/* Floating Rising Hearts when merged */}
      {isMerged && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-400 text-lg animate-bounce"
              style={{
                left: `${(i * 17) % 90}%`,
                top: '-10%',
                animation: `riseUp ${4 + (i % 3)}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes riseUp {
          0% { top: 105%; opacity: 0; transform: scale(0.6); }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { top: -10%; opacity: 0; transform: scale(1.2); }
        }
      `}</style>

      {/* Large Glowing Illuminated Moon */}
      <div className="absolute top-8 right-6 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 via-rose-100 to-amber-200 shadow-[0_0_40px_rgba(251,191,36,0.5)] border border-amber-200/60 pointer-events-none flex items-center justify-center opacity-90">
        <Moon className="w-16 h-16 text-amber-200/40 fill-amber-200/20" />
      </div>

      {/* Top Header Title */}
      <div className="pt-8 text-center space-y-2 z-10 animate-fadeIn">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          Girlfriend Day Celebration
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 text-glow-pink">
          Happy Girlfriend Day ❤️
        </h1>

        {/* Gold Underline Glow Bar */}
        <div className="w-24 h-1 mx-auto bg-gold-accent rounded-full gold-glow-bar my-2" />

        {/* Stars Slowly Rearranging to Spell Her Name */}
        <div className={`pt-2 transition-all duration-1000 ${isMerged ? 'scale-110' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-400/30 text-amber-200 font-serif-display text-sm tracking-widest shadow-lg">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
            <span>{isMerged ? `Stars Spell: ${herName}` : herName}</span>
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>
      </div>

      {/* Center Interactive Hand Hold Arena */}
      <div className="relative my-auto z-20 flex flex-col items-center justify-center space-y-6">
        {!isMerged ? (
          /* Glowing Hold Button */
          <button
            onMouseDown={startHoldingHand}
            onMouseUp={stopHoldingHand}
            onMouseLeave={stopHoldingHand}
            onTouchStart={startHoldingHand}
            onTouchEnd={stopHoldingHand}
            onTouchCancel={stopHoldingHand}
            className={`px-8 py-4 rounded-full font-serif-display font-medium text-base tracking-wider transition-all duration-300 shadow-2xl flex items-center gap-2 cursor-pointer ${
              isHolding
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-2 border-amber-300 shadow-rose-500/50 scale-105'
                : 'bg-slate-900/90 border-2 border-pink-500/40 text-pink-200 hover:border-pink-400 shadow-pink-500/20 active:scale-95'
            }`}
          >
            <Heart className={`w-5 h-5 fill-rose-400 text-rose-400 ${isHolding ? 'animate-ping' : ''}`} />
            <span>Hold my hand</span>
          </button>
        ) : (
          /* Merged Heart & Final Message */
          <div className="text-center space-y-4 animate-scaleUp">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-rose-500/40 blur-2xl animate-pulse"></div>
              <div className="relative w-28 h-28 bg-gradient-to-tr from-rose-500 to-pink-600 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.9)] animate-heartbeat">
                <Heart className="w-16 h-16 fill-white text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-300 text-glow-gold">
                Forever begins with us ❤️
              </h2>
              <p className="text-xs text-rose-200/80 font-serif-display italic">
                From {senderName} with all my heart
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Replay */}
      <div className="pb-6 pt-2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onRestart}
          className="px-5 py-2.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white text-xs font-medium transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Relive Experience
        </button>
      </div>
    </div>
  );
};
