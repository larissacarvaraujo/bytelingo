// Web Audio API Synthesizer for gamified instant sound feedback

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted: boolean) {
  isMuted = muted;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('bytelingo_sound_muted', muted ? 'true' : 'false');
    } catch {
      // Ignore storage errors
    }
  }
}

export function getMuted(): boolean {
  if (typeof window === 'undefined') return isMuted;
  try {
    return localStorage.getItem('bytelingo_sound_muted') === 'true';
  } catch {
    return isMuted;
  }
}

export type SoundEffect =
  | 'correct'
  | 'wrong'
  | 'click'
  | 'streak'
  | 'levelup'
  | 'gem'
  | 'perfect_score'
  | 'streak_maintained';

export function playSound(type: SoundEffect) {
  if (isMuted || getMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'correct') {
    // Duolingo-style uplifting double chime (C5 -> E5 -> G5)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5

    osc2.frequency.setValueAtTime(1046.5, now + 0.2); // C6 sparkle

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.2);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } else if (type === 'wrong') {
    // Gentle downward low bonk
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.3); // C3

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'click') {
    // Subtle crisp woodblock tap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } else if (type === 'streak' || type === 'gem') {
    // Shimmering chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.1);
    osc.frequency.setValueAtTime(1760, now + 0.2);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } else if (type === 'levelup') {
    // Fanfare chord progression
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 0.6);
    });
  } else if (type === 'perfect_score') {
    // Triumphant, sparkling master arpeggio (C5 -> E5 -> G5 -> B5 -> C6 -> E6 chime)
    const notes = [
      { f: 523.25, t: 0.00, d: 0.5 },  // C5
      { f: 659.25, t: 0.07, d: 0.5 },  // E5
      { f: 783.99, t: 0.14, d: 0.5 },  // G5
      { f: 987.77, t: 0.21, d: 0.5 },  // B5
      { f: 1046.5, t: 0.28, d: 0.8 },  // C6 (bright peak)
      { f: 1318.5, t: 0.35, d: 0.9 },  // E6 (sparkle high finish)
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.14, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } else if (type === 'streak_maintained') {
    // Fiery, energetic rising cadence celebrating keeping the flame alive (F4 -> A4 -> C5 -> E5)
    const notes = [
      { f: 349.23, t: 0.00, d: 0.35 }, // F4
      { f: 440.00, t: 0.09, d: 0.40 }, // A4
      { f: 523.25, t: 0.18, d: 0.50 }, // C5
      { f: 659.25, t: 0.27, d: 0.65 }, // E5
    ];

    // Warm bass thump for streak impact
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(140, now);
    bass.frequency.exponentialRampToValueAtTime(70, now + 0.25);
    bassGain.gain.setValueAtTime(0.18, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 0.25);

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.15, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d);
    });
  }
}

