// Web Audio API Synthesizer for romantic ambient music, heartbeat sound, unlocks, and interactive audio feedback

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying = false;
  private timerId: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft chime when user interacts or taps
  playChime(freq = 523.25, type: OscillatorType = 'sine', duration = 0.8) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore audio errors
    }
  }

  // Realistic Dual-Beat Heartbeat (Lub-Dub)
  playHeartbeat() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // First beat (Lub)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Second beat (Dub) - slightly higher pitch, shorter interval
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(75, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 0.28);

      gain2.gain.setValueAtTime(0.25, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.32);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.32);
    } catch {
      // ignore
    }
  }

  // Unlock success chime sequence
  playUnlockSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 'sine', 1.2);
        }, idx * 120);
      });
    } catch {
      // ignore
    }
  }

  playMagicChime() {
    this.playUnlockSound();
  }

  // Sparkle / Star connect chime
  playSparkle(pitchOffset = 0) {
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6
      const chosen = freqs[Math.abs(pitchOffset) % freqs.length];
      this.playChime(chosen, 'triangle', 0.6);
    } catch {
      // ignore
    }
  }

  // Firework launch and burst sound
  playFirework() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Burst synth noise/chord
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25];
      chord.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f + (Math.random() * 20 - 10), now);
        gain.gain.setValueAtTime(0.08, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.03);
        osc.stop(now + 1.3);
      });
    } catch {
      // ignore
    }
  }

  // Gentle Ambient Romantic Piano Chords Loop Synthesizer
  startRomanticBgm() {
    if (this.isBgmPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    
    // Romantic chord progression in D Major / B Minor
    // Chords: Dmaj7 -> F#m7 -> Bm7 -> Gmaj7
    const chords = [
      [293.66, 370.00, 440.00, 554.37], // Dmaj7
      [370.00, 440.00, 554.37, 659.25], // F#m7
      [246.94, 293.66, 370.00, 440.00], // Bm7
      [196.00, 246.94, 293.66, 370.00], // Gmaj7
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx];

      currentChord.forEach((freq, noteIdx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.08);

        // Soft arpeggiated piano-like decay
        gain.gain.setValueAtTime(0.0001, now + noteIdx * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, now + noteIdx * 0.08 + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.08 + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + noteIdx * 0.08);
        osc.stop(now + noteIdx * 0.08 + 3.3);
      });

      chordIdx = (chordIdx + 1) % chords.length;
    };

    playChordStep();
    this.timerId = window.setInterval(playChordStep, 3600);
  }

  stopRomanticBgm() {
    this.isBgmPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopRomanticBgm();
      return false;
    } else {
      this.startRomanticBgm();
      return true;
    }
  }

  getBgmStatus() {
    return this.isBgmPlaying;
  }
}

export const soundEngine = new SoundEngine();
