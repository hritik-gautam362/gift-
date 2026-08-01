import React, { useState, useEffect } from 'react';
import { Music, Quote, Sparkles, ArrowRight, Play, Pause, RefreshCw } from 'lucide-react';
import { RomanticQuote } from '../../types';
import { soundEngine } from '../../utils/sound';

interface Scene4LyricsProps {
  quotes: RomanticQuote[];
  onNext: () => void;
}

export const Scene4Lyrics: React.FC<Scene4LyricsProps> = ({ quotes, onNext }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [revealedWordCount, setRevealedWordCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const currentQuoteObj = quotes[currentQuoteIndex] || quotes[0];
  const words = currentQuoteObj.quote.split(' ');

  useEffect(() => {
    // Start background music automatically
    soundEngine.startRomanticBgm();

    return () => {
      // Keep music running or manage in player
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    if (revealedWordCount < words.length) {
      const timer = setTimeout(() => {
        setRevealedWordCount((prev) => prev + 1);
        soundEngine.playChime(400 + revealedWordCount * 25, 'sine', 0.2);
      }, 350); // 350ms per word
      return () => clearTimeout(timer);
    }
  }, [revealedWordCount, words.length, isPlaying]);

  const handleNextQuote = () => {
    setRevealedWordCount(0);
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-gradient-to-b from-slate-950 via-rose-950/40 to-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden select-none font-sans-clean">
      {/* Background audio aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Floating music note particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-300 text-lg animate-bounce"
            style={{
              top: `${(i * 25) % 90}%`,
              left: `${(i * 35) % 90}%`,
              animationDuration: `${4 + (i % 3)}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ♪
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="pt-6 text-center space-y-1.5 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-medium">
          <Music className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />
          Scene 4: Words From My Soul
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-display text-rose-100 text-glow-pink">
          A Melody Written for You
        </h2>
      </div>

      {/* Word-by-word Kinetic Typography Display */}
      <div className="relative z-20 my-auto px-2 py-8 glass-card rounded-3xl border border-pink-500/20 text-center space-y-6 max-w-sm mx-auto shadow-2xl">
        <Quote className="w-8 h-8 text-pink-400/60 mx-auto" />

        <div className="min-h-[120px] flex flex-wrap justify-center items-center gap-2 p-2 leading-relaxed">
          {words.map((word, index) => {
            const isRevealed = index < revealedWordCount;
            return (
              <span
                key={index}
                className={`text-xl sm:text-2xl font-serif-display transition-all duration-500 transform inline-block ${
                  isRevealed
                    ? 'opacity-100 translate-y-0 text-rose-100 text-glow-pink scale-100'
                    : 'opacity-0 translate-y-4 scale-90 blur-sm'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {currentQuoteObj.author && revealedWordCount >= words.length && (
          <p className="text-xs text-rose-300/80 font-serif-display italic animate-fadeIn">
            — {currentQuoteObj.author}
          </p>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full bg-slate-950/60 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title={isPlaying ? 'Pause Word Flow' : 'Play Word Flow'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNextQuote}
            className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-200 text-xs font-medium flex items-center gap-1.5 hover:bg-pink-500/30 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Next Quote ({currentQuoteIndex + 1}/{quotes.length})
          </button>
        </div>
      </div>

      {/* Footer Next Button */}
      <div className="pb-6 pt-2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onNext}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Open My Love Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
