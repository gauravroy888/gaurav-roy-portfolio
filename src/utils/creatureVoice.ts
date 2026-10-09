// Studio Creature Voice Engine powered by Google Gemini 3.8 Flash TTS (Zephyr Voice)
// High-fidelity natural voice acting with synchronized spatial companion audio

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let pendingSectionVoice: string | null = null;
let autoplayUnlocked = false;

// Resolve base path for GitHub Pages or root hosting
export const getBasePath = (): string => {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/gaurav-roy-portfolio')) {
      return '/gaurav-roy-portfolio';
    }
    // Also support any repo subpath when hosted on github.io
    if (window.location.hostname.endsWith('github.io')) {
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        return `/${parts[0]}`;
      }
    }
  }
  return '';
};

export const getAudioSrc = (trackKey: string): string => {
  const base = getBasePath();
  return `${base}/audio/spider/${trackKey}.wav`;
};

const AUDIO_TRACK_KEYS = [
  'hero',
  'companies',
  'specialties',
  'work',
  'capabilities',
  'process',
  'contact',
  'celebrate',
] as const;

const audioInstances: Record<string, HTMLAudioElement> = {};
let currentlyPlaying: HTMLAudioElement | null = null;

const getAudioInstance = (key: string): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  const targetSrc = getAudioSrc(key);

  let audio = audioInstances[key];
  if (!audio) {
    audio = new Audio(targetSrc);
    audio.preload = 'auto';
    audio.volume = 0.95;
    audio.addEventListener('error', (e) => {
      console.warn(`[CreatureVoice] Error loading audio track "${key}" from "${targetSrc}":`, e);
    });
    audioInstances[key] = audio;
  } else if (!audio.src || !audio.src.includes(targetSrc)) {
    audio.src = targetSrc;
  }
  return audio;
};

// Preload all tracks on client
if (typeof window !== 'undefined') {
  AUDIO_TRACK_KEYS.forEach((k) => {
    try {
      getAudioInstance(k);
    } catch (_) {}
  });
}

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

// Global Autoplay Unlocker: satisfies browser audio autoplay policy on user interaction
export const isAutoplayUnlocked = (): boolean => {
  if (typeof window === 'undefined') return false;
  return autoplayUnlocked || Boolean(navigator.userActivation?.hasBeenActive);
};

export const getPendingVoice = (): string | null => pendingSectionVoice;
export const setPendingVoice = (key: string | null) => { pendingSectionVoice = key; };

export const unlockAudio = () => {
  autoplayUnlocked = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('creature-audio-unlocked'));
  }
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  if (pendingSectionVoice && soundEnabled) {
    const key = pendingSectionVoice;
    pendingSectionVoice = null;
    playSectionVoice(key);
  }
};

if (typeof window !== 'undefined') {
  const handleFirstGesture = () => {
    autoplayUnlocked = true;
    unlockAudio();
  };
  ['pointerdown', 'click', 'keydown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, handleFirstGesture, { capture: true, passive: true });
    if (typeof document !== 'undefined') {
      document.addEventListener(evt, handleFirstGesture, { capture: true, passive: true });
    }
  });
}

// Play studio Zephyr section voice narration
export const playSectionVoice = (sectionKey: string): HTMLAudioElement | null => {
  if (!soundEnabled || typeof window === 'undefined') return null;

  // Stop previous voice track to avoid overlap
  stopAllSpiderVoices();

  const audio = getAudioInstance(sectionKey);
  if (!audio) return null;

  try {
    audio.currentTime = 0;
    audio.volume = 0.95;
    currentlyPlaying = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback succeeded!
          autoplayUnlocked = true;
          pendingSectionVoice = null;
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('creature-audio-unlocked'));
          }
        })
        .catch((err) => {
          // Browser Autoplay Policy blocked audio before user interacted: queue track to play on first user gesture!
          currentlyPlaying = null;
          if (err && err.name === 'NotAllowedError') {
            pendingSectionVoice = sectionKey;
          }
        });
    }
  } catch (_) {
    currentlyPlaying = null;
    pendingSectionVoice = sectionKey;
  }

  return audio;
};

// Play celebration voice clip when spider is clicked
export const playSpiderCelebrateVoice = (): HTMLAudioElement | null => {
  return playSectionVoice('celebrate');
};

// Stop any currently playing spider voice narration
export const stopAllSpiderVoices = () => {
  if (currentlyPlaying) {
    currentlyPlaying.pause();
    currentlyPlaying.currentTime = 0;
    currentlyPlaying = null;
  }
  Object.values(audioInstances).forEach((audio) => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
};

// Gentle organic string pluck sound when cursor plucks web spokes
export const playWebPluckSound = (offsetMultiplier: number = 1.0) => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const baseFreq = 520 + Math.abs(offsetMultiplier) * 80;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.08);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (_) {}
};

// Soft syllable click for web physics feedback (only when plucking, not in speech)
export const playCreatureChirp = (_char: string = 'a') => {
  // Kept for backward compatibility; replaced by studio Zephyr voice
};

// Play celebratory joyful chime (accompanies backflips, silk hearts, and button reactions)
export const playJoyfulChime = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6 (radiant major chord)
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.045;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    });
  } catch (_) {}
};

// Play web shoot 'THWIP' sound effect
export const playWebShootSound = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (_) {}
};

// Play Spiderman elastic web zip sound effect (elastic snap + high-speed upward whoosh)
export const playElasticZipSound = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Elastic string twang/snap
    const oscSnap = ctx.createOscillator();
    const gainSnap = ctx.createGain();
    oscSnap.type = 'sawtooth';
    oscSnap.frequency.setValueAtTime(820, now);
    oscSnap.frequency.exponentialRampToValueAtTime(140, now + 0.09);

    gainSnap.gain.setValueAtTime(0.001, now);
    gainSnap.gain.linearRampToValueAtTime(0.08, now + 0.005);
    gainSnap.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    oscSnap.connect(gainSnap);
    gainSnap.connect(ctx.destination);
    oscSnap.start(now);
    oscSnap.stop(now + 0.10);

    // 2. High-speed upward whoosh
    const oscZip = ctx.createOscillator();
    const gainZip = ctx.createGain();
    oscZip.type = 'sine';
    oscZip.frequency.setValueAtTime(260, now + 0.02);
    oscZip.frequency.exponentialRampToValueAtTime(2100, now + 0.16);

    gainZip.gain.setValueAtTime(0.001, now + 0.02);
    gainZip.gain.linearRampToValueAtTime(0.07, now + 0.06);
    gainZip.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    oscZip.connect(gainZip);
    gainZip.connect(ctx.destination);
    oscZip.start(now + 0.02);
    oscZip.stop(now + 0.19);
  } catch (_) {}
};

// Deprecated fallback: speaks using browser speech only if audio files fail
export const speakCreatureVoice = (_text: string) => {
  // No-op: replaced by studio Gemini 3.8 Flash TTS Zephyr audio files
};

export const isSoundEnabled = () => soundEnabled;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  if (!enabled) {
    stopAllSpiderVoices();
  }
};
