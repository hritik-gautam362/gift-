import React, { useState } from 'react';
import { Settings, X, Heart, Edit3, Image as ImageIcon, Gift, Sparkles, Navigation } from 'lucide-react';
import { AppCustomization, SceneId } from '../types';

interface CustomizationModalProps {
  customization: AppCustomization;
  onUpdate: (newCustomization: AppCustomization) => void;
  currentScene: SceneId;
  onJumpToScene: (scene: SceneId) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  customization,
  onUpdate,
  currentScene,
  onJumpToScene,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'photos' | 'scenes'>('general');
  const [formState, setFormState] = useState<AppCustomization>(customization);

  const handleSave = () => {
    onUpdate(formState);
    setIsOpen(false);
  };

  const scenesList: { id: SceneId; label: string; icon: string }[] = [
    { id: 'lock', label: '0. Lock Screen Scanner', icon: '🔒' },
    { id: 'scene1_heart', label: '1. Glowing Beating Heart', icon: '❤️' },
    { id: 'scene2_memory', label: '2. Falling Memory Cards', icon: '📸' },
    { id: 'scene3_stars', label: '3. "I Love You" Stars', icon: '✨' },
    { id: 'scene4_quotes', label: '4. Kinetic Lyrics & Quotes', icon: '🎵' },
    { id: 'scene5_letter', label: '5. Unfolding Love Letter', icon: '💌' },
    { id: 'scene6_gift', label: '6. Wrapped Gift Surprise', icon: '🎁' },
    { id: 'scene_final', label: '7. Final Moon & Hand Hold', icon: '🌕' },
  ];

  return (
    <>
      {/* Floating Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2.5 rounded-full bg-black/40 text-rose-300/80 border border-white/10 hover:border-pink-500/40 hover:text-rose-200 transition-all backdrop-blur-md active:scale-95 shadow-lg"
        title="Personalize Experience & Jump Scenes"
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-fadeIn font-sans-clean">
          <div className="w-full max-w-md h-[90vh] sm:h-auto max-h-[85vh] bg-slate-900 border border-pink-500/30 rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2 text-rose-300 font-serif-display font-medium">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>Customize Experience</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-slate-950/40 text-xs">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex-1 py-2.5 text-center font-medium transition-colors ${
                  activeTab === 'general'
                    ? 'text-pink-300 border-b-2 border-pink-500 bg-pink-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Names & Info
              </button>
              <button
                onClick={() => setActiveTab('letter')}
                className={`flex-1 py-2.5 text-center font-medium transition-colors ${
                  activeTab === 'letter'
                    ? 'text-pink-300 border-b-2 border-pink-500 bg-pink-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Love Letter
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex-1 py-2.5 text-center font-medium transition-colors ${
                  activeTab === 'photos'
                    ? 'text-pink-300 border-b-2 border-pink-500 bg-pink-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab('scenes')}
                className={`flex-1 py-2.5 text-center font-medium transition-colors ${
                  activeTab === 'scenes'
                    ? 'text-pink-300 border-b-2 border-pink-500 bg-pink-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Scenes
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-slate-200">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-pink-300 mb-1">
                      Her Name / Nickname
                    </label>
                    <input
                      type="text"
                      value={formState.herName}
                      onChange={(e) =>
                        setFormState({ ...formState, herName: e.target.value })
                      }
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                      placeholder="e.g. Sophia, My Love"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      This name will appear in constellation stars and final fireworks!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-pink-300 mb-1">
                      Your Name / Signature
                    </label>
                    <input
                      type="text"
                      value={formState.senderName}
                      onChange={(e) =>
                        setFormState({ ...formState, senderName: e.target.value })
                      }
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                      placeholder="e.g. Alex"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-pink-300 mb-1">
                      Special Gift Box Message
                    </label>
                    <textarea
                      value={formState.giftBoxMessage}
                      onChange={(e) =>
                        setFormState({ ...formState, giftBoxMessage: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'letter' && (
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-pink-300">
                    Handwritten Love Letter
                  </label>
                  <textarea
                    value={formState.letterText}
                    onChange={(e) =>
                      setFormState({ ...formState, letterText: e.target.value })
                    }
                    rows={10}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500 text-xs font-handwriting leading-relaxed text-base"
                    placeholder="Write your love letter here..."
                  />
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Upload or customize your memory photos:
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const newPhoto = {
                          id: `photo-${Date.now()}`,
                          url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
                          title: 'New Memory',
                          date: 'Today',
                          caption: 'Another beautiful moment together.',
                          location: 'Our Special Spot'
                        };
                        setFormState({ ...formState, photos: [...formState.photos, newPhoto] });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-medium hover:bg-pink-500/30 transition-colors flex items-center gap-1"
                    >
                      + Add Photo
                    </button>
                  </div>

                  {formState.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="p-3 bg-slate-950/60 rounded-xl border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-pink-300">
                        <span>Photo #{index + 1}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={photo.title}
                            onChange={(e) => {
                              const updated = [...formState.photos];
                              updated[index].title = e.target.value;
                              setFormState({ ...formState, photos: updated });
                            }}
                            className="bg-transparent border-b border-white/20 text-right text-white focus:outline-none text-xs"
                            placeholder="Title"
                          />
                          {formState.photos.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = formState.photos.filter((_, i) => i !== index);
                                setFormState({ ...formState, photos: updated });
                              }}
                              className="text-slate-500 hover:text-rose-400 text-xs p-0.5"
                              title="Delete photo"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-14 h-14 object-cover rounded-lg border border-white/10 flex-shrink-0"
                        />
                        <div className="flex-1 space-y-1.5">
                          <input
                            type="text"
                            value={photo.url}
                            onChange={(e) => {
                              const updated = [...formState.photos];
                              updated[index].url = e.target.value;
                              setFormState({ ...formState, photos: updated });
                            }}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-1.5 text-[11px] text-slate-300 focus:outline-none"
                            placeholder="Image URL or upload file below"
                          />

                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs text-slate-200 cursor-pointer border border-white/10 transition-colors">
                            <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                            <span>Upload from Phone/Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (uploadEvent) => {
                                    if (uploadEvent.target?.result) {
                                      const updated = [...formState.photos];
                                      updated[index].url = uploadEvent.target.result as string;
                                      setFormState({ ...formState, photos: updated });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={photo.date || ''}
                          onChange={(e) => {
                            const updated = [...formState.photos];
                            updated[index].date = e.target.value;
                            setFormState({ ...formState, photos: updated });
                          }}
                          className="bg-slate-900 border border-white/10 rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none"
                          placeholder="Date / Time..."
                        />
                        <input
                          type="text"
                          value={photo.location || ''}
                          onChange={(e) => {
                            const updated = [...formState.photos];
                            updated[index].location = e.target.value;
                            setFormState({ ...formState, photos: updated });
                          }}
                          className="bg-slate-900 border border-white/10 rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none"
                          placeholder="Location..."
                        />
                      </div>

                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => {
                          const updated = [...formState.photos];
                          updated[index].caption = e.target.value;
                          setFormState({ ...formState, photos: updated });
                        }}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none"
                        placeholder="Memory caption..."
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'scenes' && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400 mb-2">
                    Jump directly to any scene to test or preview:
                  </p>
                  {scenesList.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        onJumpToScene(sc.id);
                        setIsOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-medium transition-all ${
                        currentScene === sc.id
                          ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md'
                          : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{sc.icon}</span>
                        <span>{sc.label}</span>
                      </span>
                      <Navigation className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-medium shadow-md shadow-pink-500/20"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
