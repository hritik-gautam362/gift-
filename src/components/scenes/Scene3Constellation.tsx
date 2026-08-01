import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Star, Heart, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/sound';
import { InstructionBanner } from '../InstructionBanner';

interface Scene3ConstellationProps {
  herName: string;
  onNext: () => void;
}

interface StarNode {
  id: number;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  connected: boolean;
}

export const Scene3Constellation: React.FC<Scene3ConstellationProps> = ({ herName, onNext }) => {
  // Preset star nodes forming a glowing heart / "I Love You" constellation path
  const defaultNodes: StarNode[] = [
    { id: 0, x: 50, y: 32, connected: false }, // top center dip
    { id: 1, x: 30, y: 22, connected: false }, // left curve top
    { id: 2, x: 18, y: 34, connected: false }, // left side
    { id: 3, x: 26, y: 52, connected: false }, // left lower
    { id: 4, x: 50, y: 70, connected: false }, // bottom tip
    { id: 5, x: 74, y: 52, connected: false }, // right lower
    { id: 6, x: 82, y: 34, connected: false }, // right side
    { id: 7, x: 70, y: 22, connected: false }, // right curve top
  ];

  const [nodes, setNodes] = useState<StarNode[]>(defaultNodes);
  const [connectedOrder, setConnectedOrder] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [dragLine, setDragLine] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerStartOrMove = (e: React.PointerEvent) => {
    if (isCompleted || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = ((e.clientX - rect.left) / rect.width) * 100;
    const touchY = ((e.clientY - rect.top) / rect.height) * 100;

    setDragLine({ x: touchX, y: touchY });

    // Check proximity to any node
    nodes.forEach((node) => {
      const dist = Math.hypot(node.x - touchX, node.y - touchY);
      if (dist < 8) {
        // Node touched!
        if (!connectedOrder.includes(node.id)) {
          const newOrder = [...connectedOrder, node.id];
          setConnectedOrder(newOrder);

          setNodes((prev) =>
            prev.map((n) => (n.id === node.id ? { ...n, connected: true } : n))
          );

          soundEngine.playSparkle(newOrder.length);

          if (newOrder.length === defaultNodes.length) {
            // All stars connected!
            setIsCompleted(true);
            soundEngine.playFirework();
          }
        }
      }
    });
  };

  const handlePointerEnd = () => {
    setDragLine(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerStartOrMove}
      onPointerDown={handlePointerStartOrMove}
      onPointerUp={handlePointerEnd}
      className="absolute inset-0 w-full h-[100dvh] bg-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden select-none touch-none font-sans-clean"
    >
      {/* Starry Sky Canvas Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/60 via-slate-950 to-black pointer-events-none"></div>

      {/* Instruction Overlay */}
      <InstructionBanner
        text="Drag Across Stars to Connect Our Constellation"
        visible={!isCompleted}
        position="top"
      />

      {/* Random Background Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-80 animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 17) % 100}%`,
              left: `${(i * 29) % 100}%`,
              animationDuration: `${1.5 + (i % 3)}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="pt-6 text-center space-y-1.5 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium">
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          Scene 3: Constellation of Love
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-display text-pink-100 text-glow-pink">
          Connect our stars across the distance
        </h2>
        <p className="text-xs text-indigo-200/80">
          No matter the miles, drag your finger to connect our hearts
        </p>
      </div>

      {/* Interactive Constellation Arena */}
      <div className="relative flex-1 w-full my-4 z-20 flex items-center justify-center">
        {/* SVG Stardust Beam Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Connected Lines */}
          {connectedOrder.map((nodeId, idx) => {
            if (idx === 0) return null;
            const prevNode = nodes.find((n) => n.id === connectedOrder[idx - 1]);
            const currNode = nodes.find((n) => n.id === nodeId);
            if (!prevNode || !currNode) return null;

            return (
              <line
                key={`line-${idx}`}
                x1={`${prevNode.x}%`}
                y1={`${prevNode.y}%`}
                x2={`${currNode.x}%`}
                y2={`${currNode.y}%`}
                stroke="url(#starLineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.9))' }}
              />
            );
          })}

          {/* Active Drag Line */}
          {dragLine && connectedOrder.length > 0 && !isCompleted && (
            <line
              x1={`${nodes.find((n) => n.id === connectedOrder[connectedOrder.length - 1])?.x}%`}
              y1={`${nodes.find((n) => n.id === connectedOrder[connectedOrder.length - 1])?.y}%`}
              x2={`${dragLine.x}%`}
              y2={`${dragLine.y}%`}
              stroke="rgba(244, 114, 182, 0.7)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Closing line if completed */}
          {isCompleted && (
            <line
              x1={`${nodes[connectedOrder[connectedOrder.length - 1]].x}%`}
              y1={`${nodes[connectedOrder[connectedOrder.length - 1]].y}%`}
              x2={`${nodes[connectedOrder[0]].x}%`}
              y2={`${nodes[connectedOrder[0]].y}%`}
              stroke="url(#starLineGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 1))' }}
            />
          )}

          <defs>
            <linearGradient id="starLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>

        {/* Constellation Star Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
              node.connected
                ? 'w-10 h-10 bg-amber-400 text-slate-950 shadow-[0_0_25px_rgba(251,191,36,1)] scale-110'
                : 'w-8 h-8 bg-slate-900 border-2 border-pink-400/60 text-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.4)] animate-pulse'
            }`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          >
            <Star
              className={`w-4 h-4 ${
                node.connected ? 'fill-slate-950 text-slate-950' : 'fill-pink-300 text-pink-300'
              }`}
            />
          </div>
        ))}

        {/* Revealed Text Overlay when Completed */}
        {isCompleted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-3 bg-slate-950/40 backdrop-blur-sm animate-scaleUp pointer-events-none p-4">
            <div className="p-3 bg-pink-500/20 rounded-full border border-pink-400/40 text-pink-300 shadow-xl">
              <Heart className="w-8 h-8 fill-pink-500 text-pink-500 animate-bounce" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-rose-300 to-pink-400 text-glow-gold tracking-wider">
              I Love You
            </h1>
            <p className="text-sm font-handwriting text-pink-200 text-lg">
              Connected across every mile, forever for {herName} ❤️
            </p>
          </div>
        )}
      </div>

      {/* Footer Next Button */}
      <div className="pb-6 pt-2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onNext}
          className={`w-full max-w-xs py-3.5 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
            isCompleted
              ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-600 text-slate-950 font-semibold shadow-amber-400/30 scale-100 animate-pulse'
              : 'bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <span>{isCompleted ? 'Listen to Our Song ✨' : 'Skip Constellation →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
