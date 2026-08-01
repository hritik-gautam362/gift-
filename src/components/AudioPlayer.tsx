import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (autoPlay) {
      soundEngine.startRomanticBgm();
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    const active = soundEngine.toggleBgm();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center border shadow-lg ${
          isPlaying
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/20 animate-pulse'
            : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
        }`}
        title={isPlaying ? 'Pause Soft Music' : 'Play Romantic Music'}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
      </button>
    </div>
  );
};
