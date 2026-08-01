import React, { useState, useEffect } from 'react';
import { Gift as GiftIcon, Sparkles, Heart, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveCoupon } from '../../types';
import { soundEngine } from '../../utils/sound';

interface Scene6GiftProps {
  giftMessage: string;
  coupons: LoveCoupon[];
  onNext: () => void;
}

export const Scene6Gift: React.FC<Scene6GiftProps> = ({ giftMessage, coupons, onNext }) => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [redeemedIds, setRedeemedIds] = useState<Set<string>>(new Set());

  const TAPS_REQUIRED = 8;

  // Shake detector via DeviceMotionEvent
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      if (isOpened || !event.accelerationIncludingGravity) return;
      const { x, y, z } = event.accelerationIncludingGravity;
      if (x === null || y === null || z === null) return;

      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);

      if (deltaX + deltaY + deltaZ > 22) {
        // Shake detected!
        triggerShakeTap();
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, [isOpened]);

  const triggerShakeTap = () => {
    if (isOpened) return;

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    soundEngine.playHeartbeat();

    setTapCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= TAPS_REQUIRED) {
        openGiftBox();
      }
      return nextCount;
    });
  };

  const openGiftBox = () => {
    setIsOpened(true);
    soundEngine.playUnlockSound();
    soundEngine.playFirework();

    // Trigger confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#c084fc', '#ffffff'],
    });
  };

  const toggleCouponRedeem = (id: string) => {
    soundEngine.playSparkle();
    setRedeemedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="absolute inset-0 w-full h-[100dvh] bg-gradient-to-b from-slate-950 via-rose-950/30 to-black text-white flex flex-col justify-between p-6 overflow-hidden select-none font-sans-clean">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-950/20 to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="pt-6 text-center space-y-1.5 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium">
          <GiftIcon className="w-3.5 h-3.5 text-amber-400" />
          Scene 6: Unwrapping the Surprise
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif-display text-amber-100 text-glow-gold">
          {isOpened ? 'Your Special Gift & Coupons' : 'Tap repeatedly or shake phone!'}
        </h2>
        {!isOpened && (
          <p className="text-xs text-slate-300/80">
            Unwrap your gift ({tapCount}/{TAPS_REQUIRED} taps)
          </p>
        )}
      </div>

      {/* Gift Box Arena */}
      {!isOpened ? (
        <div className="relative my-auto z-20 flex flex-col items-center justify-center space-y-6">
          {/* Tap Progress Bar */}
          <div className="w-48 h-2 bg-slate-900 rounded-full border border-white/10 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${(tapCount / TAPS_REQUIRED) * 100}%` }}
            ></div>
          </div>

          {/* 3D Gift Box Button */}
          <div
            onClick={triggerShakeTap}
            className={`relative cursor-pointer transition-transform active:scale-90 ${
              isShaking ? 'animate-bounce scale-110' : 'hover:scale-105'
            }`}
          >
            {/* Ribbon Glow Aura */}
            <div className="absolute -inset-4 rounded-3xl bg-amber-500/20 blur-xl animate-pulse"></div>

            {/* Gift Box Container */}
            <div className="relative w-48 h-48 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 rounded-3xl p-4 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center">
              {/* Vertical Ribbon */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md"></div>
              {/* Horizontal Ribbon */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-md"></div>

              {/* Bow Center */}
              <div className="z-10 w-16 h-16 bg-amber-300 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-amber-900 font-bold">
                <Sparkles className="w-8 h-8 text-amber-800 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <span className="z-10 mt-2 text-[10px] font-bold tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded-full text-amber-200">
                TAP TO OPEN
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Revealed Coupons View */
        <div className="relative my-auto z-20 space-y-4 max-w-sm mx-auto w-full animate-scaleUp">
          <div className="p-4 glass-card rounded-2xl border border-amber-300/30 text-center space-y-2">
            <h3 className="text-sm font-serif-display text-amber-200 font-medium">
              {giftMessage}
            </h3>
          </div>

          <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
            {coupons.map((coupon) => {
              const isRedeemed = redeemedIds.has(coupon.id);
              return (
                <div
                  key={coupon.id}
                  onClick={() => toggleCouponRedeem(coupon.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isRedeemed
                      ? 'bg-rose-950/40 border-rose-500/50 opacity-60'
                      : 'bg-slate-900/90 border-amber-300/30 hover:border-amber-300/60 shadow-lg'
                  }`}
                >
                  <div className="text-2xl p-2 bg-amber-400/10 rounded-xl border border-amber-400/20">
                    {coupon.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-serif-display font-bold text-amber-200 truncate">
                        {coupon.title}
                      </h4>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium">
                        {coupon.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                      {coupon.description}
                    </p>
                  </div>
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      isRedeemed ? 'text-rose-400 fill-rose-500/20' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Next Button */}
      <div className="pb-6 pt-2 z-10 flex flex-col items-center gap-2">
        <button
          onClick={onNext}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Final Surprise Scene ❤️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
