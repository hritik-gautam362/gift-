import React, { useState, useEffect } from 'react';
import { Camera, Heart, Sparkles, X, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { MemoryPhoto } from '../../types';
import { soundEngine } from '../../utils/sound';
import { InstructionBanner } from '../InstructionBanner';

interface Scene2MemoriesProps {
  photos: MemoryPhoto[];
  onUpdatePhotos?: (photos: MemoryPhoto[]) => void;
  onNext: () => void;
}

interface FallingPhotoItem extends MemoryPhoto {
  x: number;       // percentage left
  delay: number;   // animation delay in seconds
  speed: number;   // fall duration in seconds
  rotation: number;// rotation angle
}

export const Scene2Memories: React.FC<Scene2MemoriesProps> = ({ photos, onUpdatePhotos, onNext }) => {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<FallingPhotoItem[]>([]);

  useEffect(() => {
    const fallingItems: FallingPhotoItem[] = photos.map((photo, index) => ({
      ...photo,
      x: 10 + (index * 22) % 75,
      delay: index * 0.8,
      speed: 8 + (index % 3) * 2,
      rotation: (index % 2 === 0 ? 1 : -1) * (6 + index * 4),
    }));
    setItems(fallingItems);
  }, [photos]);

  const handlePhotoClick = (photo: MemoryPhoto) => {
    setActivePhoto(photo);
    setOpenedIds((prev) => new Set(prev).add(photo.id));
    soundEngine.playSparkle();
  };

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-gradient-to-b from-slate-950 via-purple-950/40 to-black flex flex-col justify-between p-6 overflow-hidden select-none font-sans-clean">
      {/* Background glowing particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Instruction Banner Overlay */}
      <InstructionBanner
        text="Tap Any Floating Memory to Open"
        visible={openedIds.size === 0 && !activePhoto}
        position="top"
      />

      {/* Header */}
      <div className="pt-6 text-center space-y-1.5 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-[11px] font-medium">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          Scene 2: Falling Memories ({openedIds.size}/{photos.length})
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-display text-rose-100 text-glow-pink">
          Catch our floating memories
        </h2>
        <p className="text-xs text-slate-300/80">
          Tap any falling photo card to open its story
        </p>
      </div>

      {/* Falling Photos Playground */}
      <div className="relative flex-1 w-full my-4 overflow-hidden z-20">
        {items.map((item) => {
          const isOpened = openedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handlePhotoClick(item)}
              className="absolute cursor-pointer transition-transform hover:scale-110 active:scale-95 group"
              style={{
                left: `${item.x}%`,
                top: '-15%',
                animation: `fallDown ${item.speed}s linear infinite`,
                animationDelay: `${item.delay}s`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              {/* CSS Animation Keyframe Inline definition via style tag or class */}
              <div className="p-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 w-32 sm:w-36 transition-all group-hover:border-rose-400">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isOpened && (
                    <div className="absolute top-1 right-1 p-1 rounded-full bg-rose-500 text-white shadow-md">
                      <Heart className="w-3 h-3 fill-white" />
                    </div>
                  )}
                </div>
                <div className="pt-1.5 text-center">
                  <p className="text-[11px] font-serif-display font-medium text-slate-800 truncate">
                    {item.title}
                  </p>
                  <p className="text-[9px] text-slate-500 font-light truncate">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Keyframes for falling animation */}
      <style>{`
        @keyframes fallDown {
          0% { top: -20%; opacity: 0; transform: translateY(0) rotate(0deg); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 105%; opacity: 0; transform: translateY(0) rotate(15deg); }
        }
      `}</style>

      {/* Memory Card Modal Drawer */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-5 animate-fadeIn">
          <div className="relative w-full max-w-xs bg-white text-slate-900 rounded-3xl p-4 shadow-2xl space-y-4 border-4 border-rose-100 animate-scaleUp">
            {/* Close button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 p-2 bg-slate-900 text-white rounded-full shadow-lg border border-white/20 hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Photo frame */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner border border-slate-200">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
              <label className="absolute top-2 left-2 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-full text-white text-[10px] flex items-center gap-1.5 cursor-pointer hover:bg-black transition-colors border border-white/20 shadow-lg active:scale-95">
                <Camera className="w-3 h-3 text-pink-300" />
                <span>Replace Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && onUpdatePhotos) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        if (evt.target?.result) {
                          const updatedUrl = evt.target.result as string;
                          const updatedPhotos = photos.map((p) =>
                            p.id === activePhoto.id ? { ...p, url: updatedUrl } : p
                          );
                          onUpdatePhotos(updatedPhotos);
                          setActivePhoto({ ...activePhoto, url: updatedUrl });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>Memory Saved</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif-display font-bold text-slate-900">
                  {activePhoto.title}
                </h3>
                <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activePhoto.date}
                </span>
              </div>

              {activePhoto.location && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{activePhoto.location}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed pt-1 font-serif-display italic border-t border-slate-100">
                "{activePhoto.caption}"
              </p>
            </div>

            <button
              onClick={() => setActivePhoto(null)}
              className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium text-xs rounded-xl shadow-md shadow-rose-500/20 active:scale-95 transition-transform"
            >
              Keep Memory Close ❤️
            </button>
          </div>
        </div>
      )}

      {/* Footer Next Button */}
      <div className="pb-6 pt-2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onNext}
          className={`w-full max-w-xs py-3.5 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
            openedIds.size > 0
              ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-pink-500/30 scale-100 animate-pulse'
              : 'bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <span>Continue Our Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
