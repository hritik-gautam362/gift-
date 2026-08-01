import React, { useState } from 'react';
import { Sparkles, Heart as HeartIcon } from 'lucide-react';
import { soundEngine } from '../../utils/sound';
import { InstructionBanner } from '../InstructionBanner';

interface Scene1HeartProps {
  onNext: () => void;
}

export const Scene1Heart: React.FC<Scene1HeartProps> = ({ onNext }) => {
  const [isBlooming, setIsBlooming] = useState<boolean>(false);

  const handleHeartTap = () => {
    if (isBlooming) return;
    setIsBlooming(true);
    soundEngine.playHeartbeat();
    soundEngine.playSparkle(1);

    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-gradient-to-b from-slate-950 via-rose-950/30 to-black flex flex-col items-center justify-between p-6 overflow-hidden select-none font-sans-clean">
      {/* Background glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Instruction Overlay */}
      <InstructionBanner text="Tap Anywhere on the Heart to Bloom" visible={!isBlooming} position="top" />

      {/* Floating flower petals background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-pink-300/20 rounded-full blur-[1px] animate-bounce"
            style={{
              top: `${(i * 23) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Header Prompt */}
      <div className="pt-8 text-center space-y-2 z-10 animate-fadeIn">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-[11px] font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          Scene 1: The Heart Within
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-display text-rose-100 text-glow-pink">
          Bidisha, listen to my heart...
        </h2>
        <p className="text-xs text-rose-300/70 font-light">
          Tap the beating heart to bloom Hritik's love across the distance
        </p>
      </div>

      {/* Center Interactive Blooming Heart */}
      <div className="relative z-20 flex items-center justify-center my-auto cursor-pointer" onClick={handleHeartTap}>
        {/* Flower Petals Blooming Expansion when tapped */}
        {isBlooming && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="absolute w-24 h-48 bg-gradient-to-t from-rose-500/80 via-pink-400/60 to-transparent rounded-full origin-bottom transform transition-all duration-1000 ease-out"
                style={{
                  transform: `rotate(${idx * 45}deg) translateY(-80px) scale(${isBlooming ? 1.8 : 0.2})`,
                  opacity: isBlooming ? 0.9 : 0,
                  filter: 'blur(2px)',
                }}
              />
            ))}
          </div>
        )}

        {/* Outer Beating Heart Glow Rings */}
        <div className={`absolute w-64 h-64 rounded-full bg-rose-500/20 blur-2xl transition-all duration-700 ${isBlooming ? 'scale-150 opacity-100' : 'animate-ping'}`}></div>

        {/* Realistic SVG Beating Heart */}
        <div
          className={`relative transition-all duration-1000 transform ${
            isBlooming
              ? 'scale-150 rotate-180 opacity-0 filter blur-md'
              : 'animate-heartbeat hover:scale-110 active:scale-95'
          }`}
        >
          <svg className="w-48 h-48 drop-shadow-[0_0_35px_rgba(244,63,94,0.85)]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="40%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Heart Path */}
            <path
              d="M50 88 C20 60 5 40 5 25 A 20 20 0 0 1 45 15 L 50 20 L 55 15 A 20 20 0 0 1 95 25 C 95 40 80 60 50 88 Z"
              fill="url(#heartGrad)"
              filter="url(#glow)"
            />

            {/* Anatomical Arterial Highlights */}
            <path
              d="M30 20 Q 40 28 45 38"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M60 22 Q 68 30 70 42"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Center heart icon prompt */}
          <div className="absolute inset-0 flex items-center justify-center text-white/90">
            <HeartIcon className="w-8 h-8 fill-white/80 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Tap Hint */}
      <div className="pb-8 text-center z-10 space-y-1">
        <p className="text-xs text-rose-300 font-medium tracking-widest uppercase animate-bounce">
          Tap the heart to unfold
        </p>
      </div>
    </div>
  );
};
