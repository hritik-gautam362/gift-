import React, { useState } from 'react';
import { SceneId, AppCustomization, MemoryPhoto } from './types';
import { defaultCustomization } from './data/defaultData';
import { DesktopGuard } from './components/DesktopGuard';
import { AudioPlayer } from './components/AudioPlayer';

// Scene Components
import { LockScreen } from './components/scenes/LockScreen';
import { Scene1Heart } from './components/scenes/Scene1Heart';
import { Scene2Memories } from './components/scenes/Scene2Memories';
import { Scene3Constellation } from './components/scenes/Scene3Constellation';
import { Scene4Lyrics } from './components/scenes/Scene4Lyrics';
import { Scene5Letter } from './components/scenes/Scene5Letter';
import { Scene6Gift } from './components/scenes/Scene6Gift';
import { SceneFinalMoon } from './components/scenes/SceneFinalMoon';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('lock');
  const [customization, setCustomization] = useState<AppCustomization>(() => {
    const saved = localStorage.getItem('girlfriend_day_customization');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCustomization,
          ...parsed,
          herName: parsed.herName?.includes('Bidisha') ? parsed.herName : defaultCustomization.herName,
          senderName: parsed.senderName?.includes('Hritik') ? parsed.senderName : defaultCustomization.senderName,
          letterText: parsed.letterText?.includes('Bidisha') ? parsed.letterText : defaultCustomization.letterText,
        };
      } catch {
        // fallback
      }
    }
    return defaultCustomization;
  });

  const updatePhotos = (newPhotos: MemoryPhoto[]) => {
    const updated = { ...customization, photos: newPhotos };
    setCustomization(updated);
    localStorage.setItem('girlfriend_day_customization', JSON.stringify(updated));
  };

  // Scene Progression Helper
  const goToScene = (scene: SceneId) => {
    setCurrentScene(scene);
  };

  return (
    <DesktopGuard>
      <div className="absolute inset-0 w-full h-[100dvh] bg-black overflow-hidden font-sans-clean select-none">
        {/* Audio Controller */}
        <AudioPlayer autoPlay={currentScene !== 'lock'} />

        {/* Scene Container with Smooth Cinematic Fade Transition */}
        <div key={currentScene} className="absolute inset-0 w-full h-[100dvh] animate-fadeIn overflow-hidden">
          {currentScene === 'lock' && (
            <LockScreen onUnlock={() => goToScene('scene1_heart')} />
          )}

          {currentScene === 'scene1_heart' && (
            <Scene1Heart onNext={() => goToScene('scene2_memory')} />
          )}

          {currentScene === 'scene2_memory' && (
            <Scene2Memories
              photos={customization.photos}
              onUpdatePhotos={updatePhotos}
              onNext={() => goToScene('scene3_stars')}
            />
          )}

          {currentScene === 'scene3_stars' && (
            <Scene3Constellation
              herName={customization.herName}
              onNext={() => goToScene('scene4_quotes')}
            />
          )}

          {currentScene === 'scene4_quotes' && (
            <Scene4Lyrics
              quotes={customization.quotes}
              onNext={() => goToScene('scene5_letter')}
            />
          )}

          {currentScene === 'scene5_letter' && (
            <Scene5Letter
              letterText={customization.letterText}
              senderName={customization.senderName}
              herName={customization.herName}
              onNext={() => goToScene('scene6_gift')}
            />
          )}

          {currentScene === 'scene6_gift' && (
            <Scene6Gift
              giftMessage={customization.giftBoxMessage}
              coupons={customization.giftCoupons}
              onNext={() => goToScene('scene_final')}
            />
          )}

          {currentScene === 'scene_final' && (
            <SceneFinalMoon
              herName={customization.herName}
              senderName={customization.senderName}
              onRestart={() => goToScene('lock')}
            />
          )}
        </div>
      </div>
    </DesktopGuard>
  );
}
