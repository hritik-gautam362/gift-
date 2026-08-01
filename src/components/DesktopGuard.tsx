import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Sparkles, ExternalLink } from 'lucide-react';

interface DesktopGuardProps {
  children: React.ReactNode;
}

export const DesktopGuard: React.FC<DesktopGuardProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [frameSize, setFrameSize] = useState<'6.7' | '6.1' | 'full'>('6.7');

  useEffect(() => {
    const checkScreen = () => {
      const isWide = window.innerWidth > 768;
      setIsDesktop(isWide);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // On actual mobile devices, render full-width mobile container natively tailored for 6" to 7" screens
  if (!isDesktop) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] max-w-[430px] mx-auto relative overflow-hidden bg-black flex flex-col">
        {children}
      </div>
    );
  }

  // If full-screen native mode is selected on desktop
  if (frameSize === 'full') {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] bg-black overflow-hidden">
        {children}
        <button
          onClick={() => setFrameSize('6.7')}
          className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-xs text-rose-300 border border-rose-500/30 backdrop-blur-md shadow-xl flex items-center gap-2"
        >
          <Smartphone className="w-3.5 h-3.5" />
          Switch to 6"-7" Phone Frame
        </button>
      </div>
    );
  }

  // Desktop view: Embed in 6" - 7" smartphone frame by default
  const isLargeFrame = frameSize === '6.7';
  const frameWidthClass = isLargeFrame ? 'w-[414px] h-[882px]' : 'w-[390px] h-[844px]';

  return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col items-center justify-center p-3 z-50 overflow-hidden font-sans-clean select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-purple-950/30 to-slate-950 pointer-events-none"></div>

      {/* Top Frame Controller bar */}
      <div className="mb-3 z-50 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 px-3 rounded-full border border-white/10 shadow-lg text-xs text-slate-300">
        <span className="flex items-center gap-1.5 text-rose-300 font-medium px-2">
          <Smartphone className="w-3.5 h-3.5 text-rose-400" />
          {isLargeFrame ? '6.7" Flagship Display (414×882)' : '6.1" Standard Display (390×844)'}
        </span>

        <div className="h-4 w-px bg-white/10"></div>

        <button
          onClick={() => setFrameSize('6.7')}
          className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
            frameSize === '6.7' ? 'bg-rose-500 text-white font-medium' : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          6.7" Phone
        </button>

        <button
          onClick={() => setFrameSize('6.1')}
          className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
            frameSize === '6.1' ? 'bg-rose-500 text-white font-medium' : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          6.1" Phone
        </button>

        <button
          onClick={() => setFrameSize('full')}
          className="p-1 px-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          title="Toggle Fullscreen View"
        >
          <Maximize2 className="w-3 h-3" />
          Full Screen
        </button>
      </div>

      {/* Smartphone Hardware Frame Simulation */}
      <div
        className={`relative ${frameWidthClass} max-h-[92vh] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(225,29,72,0.25)] border-[5px] border-slate-800 flex flex-col ring-1 ring-white/15 overflow-hidden transition-all duration-300 ease-out`}
      >
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2 border border-white/10 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-blue-900/40"></div>
        </div>

        {/* Inner Mobile Viewport Screen */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black shadow-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

