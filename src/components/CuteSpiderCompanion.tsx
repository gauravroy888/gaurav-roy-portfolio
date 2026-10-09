'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import {
  playSectionVoice,
  playSpiderCelebrateVoice,
  playWebPluckSound,
  playJoyfulChime,
  playWebShootSound,
  playElasticZipSound,
  stopAllSpiderVoices,
  isSoundEnabled,
  setSoundEnabled,
  unlockAudio,
  isAutoplayUnlocked,
} from '../utils/creatureVoice';

type SpiderState = 
  | 'INITIAL_DROP'
  | 'WALK_CREATIVE_TOP'
  | 'ROUND_CREATIVE_RIGHT'
  | 'STEP_TECHNOLOGIST_TOP'
  | 'ROUND_TECHNOLOGIST_RIGHT'
  | 'WALK_TECHNOLOGIST_BOTTOM'
  | 'RAPPEL_TO_BUTTON'
  | 'WALK_BTN_WORK'
  | 'HOP_BETWEEN_BUTTONS'
  | 'WALK_BTN_RESUME'
  | 'BUTTON_PAW_WAVE'
  | 'RAPPEL_UP_TO_LETTERS'
  | 'SHOOT_WEB_PREPARE'
  | 'SPIDERMAN_ZIP_UP'
  | 'OFFSCREEN_COOLDOWN'
  | 'OFFSCREEN_REST'
  | 'SPIDER_CLICK_CELEBRATE'
  | 'SPIDER_CLICK_PERCH'
  | 'SECTION_TOUR_RAPPEL'
  | 'MOUSE_CURIOUS';

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  isHeart?: boolean;
}

interface FloatingSilkHeart {
  x: number;
  y: number;
  scale: number;
  alpha: number;
  life: number;
}

interface WebSpoke {
  endX: number;
  endY: number;
  pluckOffset: number;
  pluckVelocity: number;
}

// Section commentary matrix for site-wide tour
const SECTION_COMMENTARY: Record<string, { title: string; text: string }> = {
  hero: {
    title: 'Gaurav Roy — Creative Technologist',
    text: "Hey! I'm Gaurav's spatial sidekick. Ready to explore 3D, Generative AI, and the Spatial Web?",
  },
  companies: {
    title: 'Trusted Enterprise Brands',
    text: "Trusted by global enterprise brands like Kohler, Panasonic, Tata, and JBL for cutting-edge CGI and 3D productions!",
  },
  specialties: {
    title: 'My Specialties',
    text: "3D CGI, Unreal Engine, and ComfyUI generative workflows — pure craft and technical implementation!",
  },
  work: {
    title: 'Featured Projects',
    text: "Ooh, my favorite part! Over 40 featured commercial projects spanning 12 countries!",
  },
  capabilities: {
    title: 'Capabilities Deck',
    text: "Interactive 3D shaders, WebGL pipelines, and spatial UX prototypes built for production!",
  },
  process: {
    title: 'Design Process',
    text: "From initial sketch to full spatial deployment across 6 battle-tested creative pipelines!",
  },
  contact: {
    title: "Let's Connect",
    text: "Ready to build something extraordinary? Drop Gaurav a message or let's talk!",
  },
};

// Distinct rappel positions & pendulum dynamics across non-hero sections
interface SectionRappelConfig {
  anchorXPercent: number; // 0.0 to 1.0 of viewport width
  hangingYPercent: number; // 0.0 to 1.0 of viewport height
  swingAmp: number;
  swingSpeed: number;
  bobAmp: number;
  bobSpeed: number;
}

const SECTION_RAPPEL_CONFIGS: Record<string, SectionRappelConfig> = {
  hero: {
    anchorXPercent: 0.18,
    hangingYPercent: 0.24,
    swingAmp: 0,
    swingSpeed: 1.0,
    bobAmp: 0,
    bobSpeed: 1.0,
  },
  companies: {
    // Far-Right side level with top brand card header (matching user screenshot media_1791444976469_05bc90bc.png)
    anchorXPercent: 0.94,
    hangingYPercent: 0.28,
    swingAmp: 8,
    swingSpeed: 1.1,
    bobAmp: 4,
    bobSpeed: 1.8,
  },
  specialties: {
    // Upper-Right side (matching user screenshot media_1791442627069_f6ea5cc9.png)
    anchorXPercent: 0.87,
    hangingYPercent: 0.22,
    swingAmp: 10,
    swingSpeed: 1.2,
    bobAmp: 5,
    bobSpeed: 1.8,
  },
  work: {
    // Left side (level with heading/category filters, matching user screenshot media_1791442650288_5cd4f415.png)
    anchorXPercent: 0.11,
    hangingYPercent: 0.24,
    swingAmp: 10,
    swingSpeed: 1.2,
    bobAmp: 5,
    bobSpeed: 1.8,
  },
  capabilities: {
    // Far-Right side level with heading
    anchorXPercent: 0.88,
    hangingYPercent: 0.22,
    swingAmp: 10,
    swingSpeed: 1.2,
    bobAmp: 5,
    bobSpeed: 1.8,
  },
  process: {
    // Left side level with heading
    anchorXPercent: 0.12,
    hangingYPercent: 0.22,
    swingAmp: 10,
    swingSpeed: 1.2,
    bobAmp: 5,
    bobSpeed: 1.8,
  },
  contact: {
    // Upper-Right side level with heading
    anchorXPercent: 0.84,
    hangingYPercent: 0.24,
    swingAmp: 10,
    swingSpeed: 1.2,
    bobAmp: 5,
    bobSpeed: 1.8,
  },
};

export const CuteSpiderCompanion: React.FC = () => {
  const canvasBackRef = useRef<HTMLCanvasElement | null>(null);
  const canvasFrontRef = useRef<HTMLCanvasElement | null>(null);
  const hitboxRef = useRef<HTMLDivElement | null>(null);
  const speechBubbleRef = useRef<HTMLDivElement | null>(null);
  const triggerSpiderCelebrateRef = useRef<() => void>(() => {});
  const dismissSpeechRef = useRef<() => void>(() => {});

  // Speech bubble UI state
  const [activeSpeech, setActiveSpeech] = useState<{
    section: string;
    text: string;
    visible: boolean;
    x: number;
    y: number;
  }>({
    section: 'hero',
    text: '',
    visible: false,
    x: 0,
    y: 0,
  });

  const [soundOn, setSoundOn] = useState(true);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  useEffect(() => {
    setIsAudioUnlocked(isAutoplayUnlocked());

    const handleGlobalActivation = () => {
      unlockAudio();
      setIsAudioUnlocked(true);
    };
    const handleUnlockedEvent = () => {
      setIsAudioUnlocked(true);
    };
    window.addEventListener('pointerdown', handleGlobalActivation, { capture: true, passive: true });
    window.addEventListener('click', handleGlobalActivation, { capture: true, passive: true });
    window.addEventListener('keydown', handleGlobalActivation, { capture: true, passive: true });
    window.addEventListener('creature-audio-unlocked', handleUnlockedEvent);

    const canvasBack = canvasBackRef.current;
    const canvasFront = canvasFrontRef.current;
    if (!canvasBack || !canvasFront) return;

    const ctxBack = canvasBack.getContext('2d');
    const ctxFront = canvasFront.getContext('2d');
    if (!ctxBack || !ctxFront) return;

    let animationFrameId: number;
    let width = (canvasBack.width = canvasFront.width = window.innerWidth);
    let height = (canvasBack.height = canvasFront.height = window.innerHeight);

    // Mouse tracking & Proximity
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      isNearSpider: false,
    };

    // Particles system
    const particles: SparkleParticle[] = [];
    const floatingHearts: FloatingSilkHeart[] = [];

    // State machine
    let spiderState: SpiderState = 'INITIAL_DROP';
    let previousState: SpiderState = 'WALK_CREATIVE_TOP';
    let stateTimer = 0;
    let pathProgress = 0.0;
    let hopPhase = 0;
    let zipVelocity = 0;
    let flipPhase = 0;
    let flipBaseX = 0;
    let flipBaseY = 0;
    let returnStateAfterCelebrate: SpiderState = 'WALK_CREATIVE_TOP';
    let returnAngleAfterCelebrate = 0;

    // Active page section & auto-dismissing speech bubble
    let currentActiveSection = 'hero';
    let previousSection = '';
    let sectionDwellTimer = 0;
    let hasScrolledAwayFromHeroTop = false;
    let lastSampledScrollY = 0;
    const spokenSections = new Set<string>();
    let speechTimer = 0;
    let isSpeechActive = false;
    let typewriterIndex = 0;
    let typewriterTargetText = '';

    // Spatial coordinates (starts on left side under top bar)
    let spiderX = Math.min(width * 0.18, 240);
    let spiderY = 0; // starts at main top bar (y = 0)
    let spiderAngle = 0; // heading angle in radians (0 = facing UP)
    let spiderScale = 1.0;

    // Web anchor coordinates (Anchored to main top bar: Y = 0)
    let webAnchorX = spiderX;
    let webAnchorY = 0;
    let webShotProgress = 0;

    // Silk string subtle wind sway physics (mouse left/right breeze response)
    let stringWindOffset = 0;       // Horizontal deflection (px) of the hanging silk string
    let stringWindVelocity = 0;     // Velocity of string swing
    let mouseMoveDeltaX = 0;        // Accumulated horizontal mouse movement between frames
    let spiderWindSwayX = 0;        // Subtle pendulum lateral displacement of spider
    let spiderWindTiltAngle = 0;    // Subtle pendulum tilt angle of spider

    // Physical pendulum simulation for hanging silk companion (ball on a thread)
    let pendulumAngle = 0;          // Angle theta (radians) from vertical
    let pendulumAngularVel = 0;     // Angular velocity omega
    let pendulumLength = 180;       // Effective string length L

    // Eye blinking & Look-at
    let blinkTimer = 0;
    let isBlinking = false;
    let isHeartEyes = false;
    let lookAtX = mouse.x;
    let lookAtY = mouse.y;
    let pawWaveCycle = 0;
    let isWavingPaws = false;

    // Downward guidance silk tracer (triggered on 'VIEW MY WORK' click)
    let guidanceTracer = { active: false, progress: 0, timer: 0 };
    // Golden scroll toss (triggered on 'DOWNLOAD RESUME' click)
    let scrollToss = { active: false, timer: 0, x: 0, y: 0 };

    // Gait progress for continuous organic walking
    let gaitPhase = 0;

    // 8 Legs Definitions (Alternating Tetrapod Gait)
    const LEG_CONFIGS = [
      // Left legs (side = -1)
      { id: 0, side: -1, group: 0, baseLocalX: -7.5, baseLocalY: -4.5, restLocalX: -22, restLocalY: -18 }, // L1 Front-Left
      { id: 1, side: -1, group: 1, baseLocalX: -9.5, baseLocalY: -1.0, restLocalX: -28, restLocalY: -5 },  // L2 Mid-Front-Left
      { id: 2, side: -1, group: 0, baseLocalX: -9.5, baseLocalY: +2.5, restLocalX: -28, restLocalY: +9 },  // L3 Mid-Back-Left
      { id: 3, side: -1, group: 1, baseLocalX: -7.5, baseLocalY: +6.0, restLocalX: -22, restLocalY: +20 }, // L4 Back-Left
      // Right legs (side = 1)
      { id: 4, side: 1, group: 1, baseLocalX: +7.5, baseLocalY: -4.5, restLocalX: +22, restLocalY: -18 }, // R1 Front-Right
      { id: 5, side: 1, group: 0, baseLocalX: +9.5, baseLocalY: -1.0, restLocalX: +28, restLocalY: -5 },  // R2 Mid-Front-Right
      { id: 6, side: 1, group: 1, baseLocalX: +9.5, baseLocalY: +2.5, restLocalX: +28, restLocalY: +9 },  // R3 Mid-Back-Right
      { id: 7, side: 1, group: 0, baseLocalX: +7.5, baseLocalY: +6.0, restLocalX: +22, restLocalY: +20 }, // R4 Back-Right
    ];

    // 8 Radial Spokes for the Authentic Corner Web (strictly up to 'C')
    const SPOKE_COUNT = 8;
    let currentWebRadius = 205;
    const webSpokes: WebSpoke[] = Array.from({ length: SPOKE_COUNT }, () => ({
      endX: 0,
      endY: 0,
      pluckOffset: 0,
      pluckVelocity: 0,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      if (mouse.x > -500) {
        mouseMoveDeltaX += e.clientX - mouse.x;
      }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Detect mouse pluck crossing web spokes strictly WITHIN the visible web radius
      const distFromHub = Math.hypot(e.clientX, e.clientY);
      if (distFromHub <= currentWebRadius && e.clientX >= 0 && e.clientY >= 0) {
        webSpokes.forEach((sp, idx) => {
          // Wall and ceiling anchor foundation threads stay pinned
          if (idx === 0 || idx === SPOKE_COUNT - 1) return;
          const spLen = Math.hypot(sp.endX, sp.endY);
          if (spLen < 15) return;

          // Projection along the spoke line segment (must be between hub 0 and outer tip 1.0)
          const proj = (e.clientX * sp.endX + e.clientY * sp.endY) / (spLen * spLen);
          if (proj < 0.08 || proj > 1.0) return;

          // Perpendicular distance to the spoke string
          const cross = Math.abs(sp.endX * e.clientY - sp.endY * e.clientX) / spLen;
          if (cross < 12 && Math.abs(sp.pluckOffset) < 3.5) {
            sp.pluckVelocity = (e.clientX - mouse.prevX > 0 ? 1 : -1) * 7.5;
            playWebPluckSound(sp.pluckVelocity);
          }
        });
      }
    };

    // Click handler: click on spider or hero buttons
    const handleClick = (e: MouseEvent) => {
      const currentSpiderX = spiderX + spiderWindSwayX;
      const dist = Math.hypot(e.clientX - currentSpiderX, e.clientY - spiderY);
      if (dist < 55) {
        // Direct click on spider!
        triggerSpiderClickCelebrate();
      }
    };

    // Direct spider click celebration (Romance, 360 backflip, heart eyes, stays on same spot)
    const triggerSpiderClickCelebrate = () => {
      // Guard against rapid duplicate clicks mid-flip
      if (spiderState === 'SPIDER_CLICK_CELEBRATE' && flipPhase < 0.65) return;

      flipBaseX = spiderX;
      flipBaseY = spiderY;
      returnAngleAfterCelebrate = spiderAngle;
      spiderState = 'SPIDER_CLICK_CELEBRATE';
      stateTimer = 0;
      sectionDwellTimer = 0;
      flipPhase = 0;
      isHeartEyes = true;
      playJoyfulChime();
      playSpiderCelebrateVoice();

      // Show sweet thought bubble with Zephyr voice line (auto-dismiss after 7s)
      speechTimer = 0;
      isSpeechActive = true;
      typewriterIndex = 0;
      typewriterTargetText = "Hehe! You found me! Sending you lots of love! ♡";

      // Spawn floating silk heart
      floatingHearts.push({
        x: spiderX,
        y: spiderY - 20,
        scale: 1.0,
        alpha: 1.0,
        life: 0,
      });

      // Spawn pastel heart confetti
      for (let i = 0; i < 9; i++) {
        particles.push({
          x: spiderX + (Math.random() - 0.5) * 20,
          y: spiderY - 12 + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 3.2,
          vy: -2.5 - Math.random() * 2.5,
          alpha: 1.0,
          size: 6.0 + Math.random() * 4.5,
          color: i % 2 === 0 ? '#F472B6' : '#C084FC',
          isHeart: true,
        });
      }
    };
    triggerSpiderCelebrateRef.current = triggerSpiderClickCelebrate;
    dismissSpeechRef.current = () => {
      isSpeechActive = false;
      stopAllSpiderVoices();
    };

    // External button event listeners
    const handleSpiderEvent = (e: Event) => {
      const custom = e as CustomEvent<{ action: string }>;
      if (custom.detail?.action === 'work') {
        // 'VIEW MY WORK' clicked: spider shoots guidance tracer line pointing down
        guidanceTracer = { active: true, progress: 0, timer: 0 };
        isWavingPaws = true;
        playJoyfulChime();
        for (let i = 0; i < 7; i++) {
          particles.push({
            x: spiderX + (Math.random() - 0.5) * 16,
            y: spiderY + 15,
            vx: (Math.random() - 0.5) * 2.0,
            vy: 2.5 + Math.random() * 2.0,
            alpha: 1.0,
            size: 3.5,
            color: '#38BDF8',
          });
        }
      } else if (custom.detail?.action === 'resume') {
        // 'DOWNLOAD RESUME' clicked: spider tosses glowing silk scroll
        scrollToss = { active: true, timer: 0, x: spiderX, y: spiderY - 10 };
        playJoyfulChime();
        for (let i = 0; i < 9; i++) {
          particles.push({
            x: spiderX + (Math.random() - 0.5) * 16,
            y: spiderY - 15,
            vx: (Math.random() - 0.5) * 2.4,
            vy: -2.0 - Math.random() * 2.2,
            alpha: 1.0,
            size: 4.0,
            color: '#FACC15',
          });
        }
      }
    };

    const handleResize = () => {
      if (!canvasBack || !canvasFront) return;
      width = canvasBack.width = canvasFront.width = window.innerWidth;
      height = canvasBack.height = canvasFront.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, true);
    window.addEventListener('resize', handleResize);
    window.addEventListener('spider-event', handleSpiderEvent);

    let lastTime = performance.now();

    // Cached element measurements to eliminate 60fps layout thrashing
    let creativeRect = {
      left: width * 0.12,
      top: height * 0.26,
      width: 270,
      height: 104,
      right: width * 0.12 + 270,
      bottom: height * 0.26 + 104,
    };
    let technologistRect = {
      left: width * 0.12,
      top: height * 0.26 + 104,
      width: 428,
      height: 104,
      right: width * 0.12 + 428,
      bottom: height * 0.26 + 208,
    };
    let btnWorkRect = {
      left: width * 0.12,
      top: height * 0.58,
      width: 220,
      height: 50,
      right: width * 0.12 + 220,
      bottom: height * 0.58 + 50,
    };
    let btnResumeRect = {
      left: width * 0.12 + 236,
      top: height * 0.58,
      width: 220,
      height: 50,
      right: width * 0.12 + 456,
      bottom: height * 0.58 + 50,
    };
    let cachedSectionTops: { id: string; top: number; bottom: number }[] = [];
    let lastLayoutMeasureTime = 0;

    const measureLayout = () => {
      const creativeEl = document.getElementById('hero-word-creative');
      const technologistEl = document.getElementById('hero-word-technologist');
      const btnWorkEl = document.getElementById('hero-btn-work');
      const btnResumeEl = document.getElementById('hero-btn-resume');

      if (creativeEl) {
        const r = creativeEl.getBoundingClientRect();
        creativeRect = { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
      }
      if (technologistEl) {
        const r = technologistEl.getBoundingClientRect();
        technologistRect = { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
      }
      if (btnWorkEl) {
        const r = btnWorkEl.getBoundingClientRect();
        btnWorkRect = { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
      }
      if (btnResumeEl) {
        const r = btnResumeEl.getBoundingClientRect();
        btnResumeRect = { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
      }

      // Cache document-relative coordinates of all content sections
      const sectionIds = ['contact', 'process', 'capabilities', 'work', 'specialties', 'companies'];
      cachedSectionTops = [];
      const curScroll = window.scrollY;
      for (const sId of sectionIds) {
        const el = document.getElementById(sId);
        if (el) {
          const r = el.getBoundingClientRect();
          const hEl = el.querySelector('#companies-heading') || el.querySelector('h2') || el.querySelector('span.uppercase') || el.querySelector('h3');
          const hTop = hEl ? hEl.getBoundingClientRect().top : r.top + 140;
          cachedSectionTops.push({
            id: sId,
            top: hTop + curScroll,
            bottom: r.bottom + curScroll,
          });
        }
      }
    };
    measureLayout();

    // =========================================================================
    // MAIN RENDER & TICK LOOP
    // =========================================================================
    const render = () => {
      const now = performance.now();
      const rawDelta = (now - lastTime) / 1000;
      lastTime = now;
      const delta = Math.min(Math.max(rawDelta, 0.001), 0.1);
      const dt = delta * 60; // 1.0 at 60fps

      stateTimer += delta;
      blinkTimer += delta;

      // Cute eye blinking
      if (blinkTimer > 4.2) {
        isBlinking = true;
        if (blinkTimer > 4.38) {
          isBlinking = false;
          blinkTimer = Math.random() * 1.2;
        }
      }

      const isMobile = width < 768;
      spiderScale = isMobile ? 0.78 : 0.98;

      const scrollY = window.scrollY;

      // Re-measure layout at low frequency (once every 400ms when in hero, or when cache is empty)
      if (now - lastLayoutMeasureTime > 400 && currentActiveSection === 'hero') {
        measureLayout();
        lastLayoutMeasureTime = now;
      }

      // Check distance to mouse
      const distToMouse = Math.hypot(mouse.x - spiderX, mouse.y - spiderY);
      mouse.isNearSpider = distToMouse < 85;

      // =========================================================================
      // SCROLL POSITION & MULTI-SECTION TOUR TRACKING (ZERO LAYOUT THRASHING)
      // =========================================================================
      let detectedSection = currentActiveSection;

      const isAtPageBottom =
        window.innerHeight + scrollY >= (document.documentElement.scrollHeight || document.body.scrollHeight) - 60;

      if (isAtPageBottom) {
        detectedSection = 'contact';
      } else if (scrollY < 200) {
        detectedSection = 'hero';
      } else {
        // Fast arithmetic check against cached document positions (0 DOM queries!)
        for (const s of cachedSectionTops) {
          const hTop = s.top - scrollY;
          const rBottom = s.bottom - scrollY;
          if (hTop <= 310 && rBottom >= 180) {
            detectedSection = s.id;
            break;
          }
        }
      }

      // User active scroll tracking: reset dwell timer when actively scrolling
      const scrollDelta = Math.abs(scrollY - lastSampledScrollY);
      if (scrollDelta > 8) {
        sectionDwellTimer = 0;
        lastSampledScrollY = scrollY;
      }

      // Track whether user scrolled down away from Hero top
      if (scrollY > 50) {
        hasScrolledAwayFromHeroTop = true;
      }

      // 1. If spider is resting offscreen on Hero, wake spider up when:
      // - User scrolled away and returned to top (scrollY < 40)
      // - OR spider rested quietly offscreen for cooldown period (stateTimer > 18.0)
      // - OR user interacts with the top corner web (mouse near web anchor)
      if (spiderState === 'OFFSCREEN_REST' && detectedSection === 'hero') {
        const mouseNearWeb = mouse.x > 0 && mouse.y > 0 && Math.hypot(mouse.x, mouse.y) <= currentWebRadius;
        if ((hasScrolledAwayFromHeroTop && scrollY < 40) || stateTimer > 18.0 || mouseNearWeb) {
          hasScrolledAwayFromHeroTop = false;
          spiderState = 'INITIAL_DROP';
          stateTimer = 0;
          webAnchorX = creativeRect.left + 22;
          webAnchorY = 0;
          spiderX = webAnchorX;
          spiderY = 0;
          if (hitboxRef.current) hitboxRef.current.style.display = 'block';
        }
      }

      // 1b. If spider is resting offscreen in content sections, wake it up if user scrolls noticeably
      if (spiderState === 'OFFSCREEN_REST' && detectedSection !== 'hero' && scrollDelta > 45) {
        spiderState = 'SECTION_TOUR_RAPPEL';
        stateTimer = 0;
        pendulumLength = 0;
        pendulumAngle = 0;
        pendulumAngularVel = (Math.random() - 0.5) * 0.003;
        const cfg = SECTION_RAPPEL_CONFIGS[detectedSection] || SECTION_RAPPEL_CONFIGS.specialties;
        webAnchorX = Math.round(width * cfg.anchorXPercent);
        webAnchorY = 0;
        spiderX = webAnchorX;
        spiderY = 0;
        if (hitboxRef.current) hitboxRef.current.style.display = 'block';
      }

      // 2. Trigger section change & smooth rappel into new section
      if (spiderState !== 'SPIDER_CLICK_CELEBRATE' && detectedSection !== previousSection) {
        previousSection = detectedSection;
        currentActiveSection = detectedSection;
        sectionDwellTimer = 0; // Reset dwell timer on entering a new section
        hasScrolledAwayFromHeroTop = false;

        // In content sections, spider transitions to SECTION_TOUR_RAPPEL mode at that section's unique location
        if (detectedSection !== 'hero') {
          spiderState = 'SECTION_TOUR_RAPPEL';
          stateTimer = 0;
          pendulumLength = 0;
          pendulumAngle = 0;
          pendulumAngularVel = (Math.random() - 0.5) * 0.003;
          const cfg = SECTION_RAPPEL_CONFIGS[detectedSection] || SECTION_RAPPEL_CONFIGS.specialties;
          webAnchorX = Math.round(width * cfg.anchorXPercent);
          webAnchorY = 0;
          // Smoothly descend from top ceiling anchor
          spiderX = webAnchorX;
          spiderY = 0;
          if (hitboxRef.current) hitboxRef.current.style.display = 'block';
        } else {
          spiderState = 'INITIAL_DROP';
          stateTimer = 0;
          webAnchorX = creativeRect.left + 22;
          webAnchorY = 0;
          spiderX = webAnchorX;
          spiderY = 0;
          if (hitboxRef.current) hitboxRef.current.style.display = 'block';
        }

        // Section dialogue appears STRICTLY ONCE per section during the session
        if (!spokenSections.has(detectedSection)) {
          spokenSections.add(detectedSection);
          speechTimer = 0;
          isSpeechActive = true;
          typewriterIndex = 0;

          const info = SECTION_COMMENTARY[detectedSection] || SECTION_COMMENTARY.hero;
          typewriterTargetText = info.text;

          // Play studio Gemini Zephyr voice
          playSectionVoice(detectedSection);
        } else {
          // Already appeared once: silence voice narration and hide speech bubble
          isSpeechActive = false;
          setActiveSpeech((prev) => ({ ...prev, visible: false }));
          stopAllSpiderVoices();
        }
      }

      // Track how long the user has stopped at this section/page
      sectionDwellTimer += delta;

      // If user stops at content sections for more than 20 seconds: exit out of page like Spiderman with elastic string!
      if (
        currentActiveSection !== 'hero' &&
        sectionDwellTimer >= 20.0 &&
        spiderState !== 'SHOOT_WEB_PREPARE' &&
        spiderState !== 'SPIDERMAN_ZIP_UP' &&
        spiderState !== 'OFFSCREEN_REST' &&
        spiderState !== 'SPIDER_CLICK_CELEBRATE' &&
        spiderState !== 'INITIAL_DROP'
      ) {
        spiderState = 'SHOOT_WEB_PREPARE';
        stateTimer = 0;
        webShotProgress = 0;
        webAnchorX = spiderX;
        webAnchorY = 0;
        playWebShootSound();
        isSpeechActive = false;
        setActiveSpeech((prev) => ({ ...prev, visible: false }));
      }

      // Clear both canvases for active frame render
      ctxBack.clearRect(0, 0, width, height);
      ctxFront.clearRect(0, 0, width, height);

      // Update typewriter text & speech bubble visibility (auto-dismiss after 10.0 seconds, or 25s if awaiting user gesture)
      if (isSpeechActive) {
        speechTimer += delta;
        const maxSpeechDuration = isAutoplayUnlocked() ? 10.0 : 25.0;
        if (speechTimer >= maxSpeechDuration) {
          isSpeechActive = false;
          setActiveSpeech((prev) => ({ ...prev, visible: false }));
        } else if (typewriterTargetText.length > 0) {
          typewriterIndex = Math.min(typewriterTargetText.length, typewriterIndex + 0.45 * dt);
          const currentSlice = typewriterTargetText.slice(0, Math.max(1, Math.floor(typewriterIndex)));
          setActiveSpeech((prev) => {
            if (
              prev.visible &&
              prev.text === currentSlice &&
              Math.abs(prev.x - spiderX) < 1 &&
              Math.abs(prev.y - spiderY) < 1
            ) {
              return prev;
            }
            return {
              section: currentActiveSection,
              text: currentSlice,
              visible: true,
              x: spiderX,
              y: spiderY,
            };
          });
        }
      }

      // Direct synchronous DOM positioning for 100% lockstep tracking (ZERO LAG, ZERO WANDERING)
      if (speechBubbleRef.current && isSpeechActive) {
        const isRightSide = spiderX > width * 0.5;
        const clampedTop = Math.max(76, Math.min(height - 180, spiderY - 35));
        speechBubbleRef.current.style.top = `${clampedTop}px`;
        if (isRightSide) {
          // Spider is on right side: stick bubble firmly to the LEFT of the spider!
          speechBubbleRef.current.style.left = 'auto';
          speechBubbleRef.current.style.right = `${Math.max(16, width - spiderX + 22)}px`;
        } else {
          // Spider is on left side: stick bubble firmly to the RIGHT of the spider!
          speechBubbleRef.current.style.right = 'auto';
          speechBubbleRef.current.style.left = `${Math.max(16, spiderX + 22)}px`;
        }
      }

      // =========================================================================
      // 1. AUTHENTIC ORB-WEAVER WEB (PROPORTIONAL SCALING & TAB EDGE CONNECTED)
      // =========================================================================
      // Proportional scale factor based on browser viewport size (both width and height)
      // Reference standard viewport: 1440 x 860
      const viewportScale = Math.max(0.55, Math.min(1.30, Math.min(width / 1440, height / 860)));
      let targetRadius = Math.round(205 * viewportScale);

      // On desktop layouts where 'CREATIVE' is spaced out, strictly bound radius before letter 'C'
      if (creativeRect.left > 160) {
        targetRadius = Math.min(targetRadius, Math.max(100, Math.round(creativeRect.left - 8)));
      }

      // Proportional 1:1 circular web radius (Rx = Ry = webRadius ensures ZERO horizontal squeezing!)
      const webRadius = targetRadius;
      currentWebRadius = webRadius;

      // 8 spokes evenly distributed across the entire 90° quadrant:
      // Spoke 0: Exactly on the top ceiling edge (Y = 0)
      // Spoke 7: Exactly on the left browser edge (X = 0)
      // Intermediate spokes: Evenly fanned at angles theta_s = s * (PI / 2) / 7
      for (let s = 0; s < SPOKE_COUNT; s++) {
        const ang = (s * (Math.PI * 0.5)) / (SPOKE_COUNT - 1);
        const cosAng = Math.cos(ang);
        const sinAng = Math.sin(ang);
        webSpokes[s].endX = s === SPOKE_COUNT - 1 ? 0 : cosAng * webRadius;
        webSpokes[s].endY = s === 0 ? 0 : sinAng * webRadius;
      }

      // The corner web is kept permanently visible in the top-left corner
      ctxBack.save();

      // Plucking spring physics update (interior spokes vibrate upon mouse pass)
      webSpokes.forEach((sp, idx) => {
        // Wall and ceiling anchor foundation threads stay pinned
        if (idx === 0 || idx === SPOKE_COUNT - 1) {
          sp.pluckOffset = 0;
          sp.pluckVelocity = 0;
          return;
        }
        const springK = 0.20;
        const damping = 0.86;
        sp.pluckVelocity += -springK * sp.pluckOffset;
        sp.pluckVelocity *= Math.pow(damping, dt);
        sp.pluckOffset += sp.pluckVelocity * dt;
      });

      // 1a. Radial Spokes (Fine, glowing silk frame connected flush to tab edges)
      for (let s = 0; s < SPOKE_COUNT; s++) {
        const sp = webSpokes[s];
        ctxBack.beginPath();

        if (s === 0) {
          // Ceiling foundation anchor thread (flush against top browser border Y = 0.5)
          ctxBack.moveTo(0, 0.5);
          ctxBack.lineTo(sp.endX, 0.5);
          ctxBack.strokeStyle = 'rgba(216, 180, 254, 0.36)';
          ctxBack.lineWidth = 1.15;
          ctxBack.stroke();
        } else if (s === SPOKE_COUNT - 1) {
          // Left wall foundation anchor thread (flush against left browser border X = 0.5)
          ctxBack.moveTo(0.5, 0);
          ctxBack.lineTo(0.5, sp.endY);
          ctxBack.strokeStyle = 'rgba(216, 180, 254, 0.36)';
          ctxBack.lineWidth = 1.15;
          ctxBack.stroke();
        } else {
          // Interior suspended radial spokes
          ctxBack.moveTo(0, 0);
          const len = Math.hypot(sp.endX, sp.endY) || 1;
          const normalX = -sp.endY / len;
          const normalY = sp.endX / len;
          const midX = sp.endX * 0.5 + normalX * sp.pluckOffset;
          const midY = sp.endY * 0.5 + normalY * sp.pluckOffset;
          ctxBack.quadraticCurveTo(midX, midY, sp.endX, sp.endY);
          ctxBack.strokeStyle = 'rgba(216, 180, 254, 0.26)';
          ctxBack.lineWidth = 0.95;
          ctxBack.stroke();
        }
      }

      // 1b. Concentric Viscid Spiral Tiers (7 authentic scalloped catenary arcs)
      const ringFractions = [0.14, 0.27, 0.40, 0.54, 0.69, 0.84, 1.0];
      for (let rIdx = 0; rIdx < ringFractions.length; rIdx++) {
        const rf = ringFractions[rIdx];
        ctxBack.beginPath();

        for (let s = 0; s < SPOKE_COUNT; s++) {
          const sp = webSpokes[s];
          let px = 0;
          let py = 0;

          if (s === 0) {
            // Anchor point directly on ceiling edge
            px = sp.endX * rf;
            py = 0.5;
            ctxBack.moveTo(px, py);
          } else if (s === SPOKE_COUNT - 1) {
            // Anchor point directly on left browser edge
            px = 0.5;
            py = sp.endY * rf;
          } else {
            // Interior spoke intersection with pluck deflection
            const len = Math.hypot(sp.endX, sp.endY) || 1;
            const normalX = -sp.endY / len;
            const normalY = sp.endX / len;
            px = sp.endX * rf + normalX * sp.pluckOffset * rf * 0.5;
            py = sp.endY * rf + normalY * sp.pluckOffset * rf * 0.5;
          }

          if (s > 0) {
            const prevSp = webSpokes[s - 1];
            let prevPx = 0;
            let prevPy = 0;

            if (s - 1 === 0) {
              prevPx = prevSp.endX * rf;
              prevPy = 0.5;
            } else {
              const prevLen = Math.hypot(prevSp.endX, prevSp.endY) || 1;
              const prevNormX = -prevSp.endY / prevLen;
              const prevNormY = prevSp.endX / prevLen;
              prevPx = prevSp.endX * rf + prevNormX * prevSp.pluckOffset * rf * 0.5;
              prevPy = prevSp.endY * rf + prevNormY * prevSp.pluckOffset * rf * 0.5;
            }

            // Inward catenary sag: dips gently INWARD toward the corner hub (0, 0)
            const chordMidX = (prevPx + px) / 2;
            const chordMidY = (prevPy + py) / 2;
            const distFromHub = Math.hypot(chordMidX, chordMidY) || 1;
            const chordLength = Math.hypot(px - prevPx, py - prevPy);
            const inwardSagAmount = chordLength * 0.16; // 16% inward curve toward center

            // Inward vector toward (0, 0)
            const inwardDirX = -chordMidX / distFromHub;
            const inwardDirY = -chordMidY / distFromHub;

            const ctrlX = chordMidX + inwardDirX * inwardSagAmount;
            const ctrlY = chordMidY + inwardDirY * inwardSagAmount;

            ctxBack.quadraticCurveTo(ctrlX, ctrlY, px, py);
          }
        }

        ctxBack.strokeStyle = rIdx === ringFractions.length - 1 ? 'rgba(235, 215, 255, 0.38)' : 'rgba(216, 180, 254, 0.24)';
        ctxBack.lineWidth = 0.85;
        ctxBack.stroke();

        // 1c. Delicate Bioluminescent Dewdrops at spoke intersections
        for (let s = 0; s < SPOKE_COUNT; s++) {
          const sp = webSpokes[s];
          let px = 0;
          let py = 0;

          if (s === 0) {
            px = sp.endX * rf;
            py = 1.0;
          } else if (s === SPOKE_COUNT - 1) {
            px = 1.0;
            py = sp.endY * rf;
          } else {
            const len = Math.hypot(sp.endX, sp.endY) || 1;
            const normalX = -sp.endY / len;
            const normalY = sp.endX / len;
            px = sp.endX * rf + normalX * sp.pluckOffset * rf * 0.5;
            py = sp.endY * rf + normalY * sp.pluckOffset * rf * 0.5;
          }

          const dewRadius = 1.1 + Math.sin(stateTimer * 2.5 + s * 0.7 + rIdx) * 0.3;
          // Outer soft glow (zero blur convolution cost)
          ctxBack.beginPath();
          ctxBack.arc(px, py, dewRadius * 2.0, 0, Math.PI * 2);
          ctxBack.fillStyle = 'rgba(192, 132, 252, 0.28)';
          ctxBack.fill();

          // Core bright dewdrop
          ctxBack.beginPath();
          ctxBack.arc(px, py, dewRadius, 0, Math.PI * 2);
          ctxBack.fillStyle = 'rgba(240, 230, 255, 0.85)';
          ctxBack.fill();
        }
      }
      ctxBack.restore();

      // =========================================================================
      // 2. STATE MACHINE: TYPOGRAPHIC BORDER HUGGING & DYNAMIC SCROLL
      // =========================================================================
      let velocityX = 0;
      let velocityY = 0;
      let targetX = spiderX;
      let targetY = spiderY;
      let targetDesiredAngle = spiderAngle;

      if (spiderState === 'INITIAL_DROP') {
        // Drops down smoothly from MAIN TOP BAR directly to the top edge of 'CREATIVE'
        webAnchorX = creativeRect.left + 22;
        webAnchorY = 0;
        const landingY = creativeRect.top - 6;

        spiderX = webAnchorX;
        spiderY += (landingY - spiderY) * Math.min(1, 0.065 * dt);
        spiderAngle = 0;

        if (Math.abs(spiderY - landingY) < 3.5 || stateTimer > 2.6) {
          spiderY = landingY;
          spiderState = 'WALK_CREATIVE_TOP';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'WALK_CREATIVE_TOP') {
        // Step 1: Walks along the TOP BORDER of "CREATIVE"
        const startX = creativeRect.left + 20;
        const endX = creativeRect.right - 10;
        const walkY = creativeRect.top - 6;

        pathProgress += 0.0055 * dt;
        targetX = startX + (endX - startX) * Math.min(1, pathProgress);
        targetY = walkY;
        targetDesiredAngle = Math.PI / 2;

        if (pathProgress >= 1.0 || stateTimer > 4.5) {
          spiderState = 'ROUND_CREATIVE_RIGHT';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'ROUND_CREATIVE_RIGHT') {
        // Step 2: Rounds right edge of 'E'
        const downX = creativeRect.right - 8;
        const startY = creativeRect.top - 6;
        const endY = technologistRect.top - 6;

        pathProgress += 0.010 * dt;
        targetX = downX;
        targetY = startY + (endY - startY) * Math.min(1, pathProgress);
        targetDesiredAngle = Math.PI;

        if (pathProgress >= 1.0 || stateTimer > 2.2) {
          spiderState = 'STEP_TECHNOLOGIST_TOP';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'STEP_TECHNOLOGIST_TOP') {
        // Step 3: Walks along the top border of "-GIST" in "TECHNOLOGIST"
        const startX = creativeRect.right - 8;
        const endX = technologistRect.right - 10;
        const walkY = technologistRect.top - 6;

        pathProgress += 0.007 * dt;
        targetX = startX + (endX - startX) * Math.min(1, pathProgress);
        targetY = walkY;
        targetDesiredAngle = Math.PI / 2;

        if (pathProgress >= 1.0 || stateTimer > 3.5) {
          spiderState = 'ROUND_TECHNOLOGIST_RIGHT';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'ROUND_TECHNOLOGIST_RIGHT') {
        // Step 4: Rounds right edge of final 'T'
        const downX = technologistRect.right - 8;
        const startY = technologistRect.top - 6;
        const endY = technologistRect.bottom + 6;

        pathProgress += 0.010 * dt;
        targetX = downX;
        targetY = startY + (endY - startY) * Math.min(1, pathProgress);
        targetDesiredAngle = Math.PI;

        if (pathProgress >= 1.0 || stateTimer > 2.2) {
          spiderState = 'WALK_TECHNOLOGIST_BOTTOM';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'WALK_TECHNOLOGIST_BOTTOM') {
        // Step 5: Walks along the BOTTOM BASELINE of "TECHNOLOGIST"
        const startX = technologistRect.right - 8;
        const endX = technologistRect.left + 35;
        const walkY = technologistRect.bottom + 6;

        pathProgress += 0.0055 * dt;
        targetX = startX + (endX - startX) * Math.min(1, pathProgress);
        targetY = walkY;
        targetDesiredAngle = -Math.PI / 2;

        if (pathProgress >= 1.0 || stateTimer > 5.0) {
          spiderState = 'RAPPEL_TO_BUTTON';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'RAPPEL_TO_BUTTON') {
        // Step 6: Silk Rappel directly to "VIEW MY WORK" button
        webAnchorX = technologistRect.left + 35;
        webAnchorY = technologistRect.bottom + 6;
        const landingY = btnWorkRect.top - 5;

        pathProgress += 0.0085 * dt;
        targetX = btnWorkRect.left + 45;
        targetY = webAnchorY + (landingY - webAnchorY) * Math.min(1, pathProgress);
        targetDesiredAngle = Math.PI;

        if (pathProgress >= 1.0 || stateTimer > 2.5) {
          spiderState = 'WALK_BTN_WORK';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'WALK_BTN_WORK') {
        // Step 7: Walks along top rim of "VIEW MY WORK"
        const startX = btnWorkRect.left + 45;
        const endX = btnWorkRect.right - 16;
        const walkY = btnWorkRect.top - 5;

        pathProgress += 0.005 * dt;
        targetX = startX + (endX - startX) * Math.min(1, pathProgress);
        targetY = walkY;
        targetDesiredAngle = Math.PI / 2;

        if (pathProgress >= 1.0 || stateTimer > 4.5) {
          spiderState = 'HOP_BETWEEN_BUTTONS';
          stateTimer = 0;
          hopPhase = 0;
        }
      } else if (spiderState === 'HOP_BETWEEN_BUTTONS') {
        // Step 8: Playful parabolic hop across button gap
        hopPhase += 0.05 * dt;
        const startX = btnWorkRect.right - 16;
        const endX = btnResumeRect.left + 22;
        const baseHopY = btnWorkRect.top - 5;

        targetX = startX + (endX - startX) * Math.min(1, hopPhase);
        const hopLift = Math.sin(Math.min(1, hopPhase) * Math.PI) * 20;
        targetY = baseHopY - hopLift;
        targetDesiredAngle = Math.PI / 2;

        if (hopPhase >= 1.0 || stateTimer > 1.8) {
          spiderState = 'WALK_BTN_RESUME';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'WALK_BTN_RESUME') {
        // Step 9: Walks on "DOWNLOAD RESUME" button
        const startX = btnResumeRect.left + 22;
        const endX = btnResumeRect.left + btnResumeRect.width * 0.52;
        const walkY = btnResumeRect.top - 5;

        pathProgress += 0.005 * dt;
        targetX = startX + (endX - startX) * Math.min(1, pathProgress);
        targetY = walkY;
        targetDesiredAngle = Math.PI / 2;

        if (pathProgress >= 1.0 || stateTimer > 3.8) {
          spiderState = 'BUTTON_PAW_WAVE';
          stateTimer = 0;
        }
      } else if (spiderState === 'BUTTON_PAW_WAVE') {
        // Step 10: Perches on button, faces user, moves both hands waving hello!
        targetX = btnResumeRect.left + btnResumeRect.width * 0.52;
        targetY = btnResumeRect.top - 5;
        targetDesiredAngle = 0;
        isWavingPaws = true;
        pawWaveCycle += 0.16 * dt;

        // Playful sparkles while moving both hands
        if (Math.random() < 0.22) {
          particles.push({
            x: spiderX + (Math.random() - 0.5) * 28,
            y: spiderY - 20 + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.6,
            vy: -1.6 - Math.random() * 1.6,
            alpha: 1.0,
            size: 3.5,
            color: Math.random() > 0.5 ? '#F472B6' : '#C084FC',
          });
        }

        if (stateTimer > 3.2) {
          // After both hands wave animation ends: go back with elastic Spiderman zip out of page!
          spiderState = 'SHOOT_WEB_PREPARE';
          stateTimer = 0;
          isWavingPaws = false;
          webShotProgress = 0;
          webAnchorX = spiderX;
          webAnchorY = 0;
          playWebShootSound();
          isSpeechActive = false;
          setActiveSpeech((prev) => ({ ...prev, visible: false }));
        }
      } else if (spiderState === 'RAPPEL_UP_TO_LETTERS') {
        // Step 11: Seamlessly climbs glowing thread back up to typography
        targetDesiredAngle = 0;
        spiderX += (webAnchorX - spiderX) * 0.10;
        spiderY -= 2.2 * dt;

        if (spiderY <= webAnchorY + 4 || stateTimer > 4.2) {
          spiderY = webAnchorY;
          spiderState = 'WALK_CREATIVE_TOP';
          stateTimer = 0;
          pathProgress = 0;
        }
      } else if (spiderState === 'SHOOT_WEB_PREPARE') {
        // Step A: Shoots elastic silk line to ceiling & crouches in anticipation (~0.35s)
        targetDesiredAngle = 0;
        spiderAngle = 0;
        webShotProgress = Math.min(1.0, stateTimer / 0.16);

        // Elastic crouch compression (anticipation before launch)
        if (webShotProgress >= 1.0) {
          const crouchPhase = Math.min(1.0, (stateTimer - 0.16) / 0.19);
          spiderY += Math.sin(crouchPhase * Math.PI) * 1.6 * dt;
        }

        if (stateTimer >= 0.35) {
          // Step B: Elastic Snap & High-acceleration Spiderman rocket zip
          spiderState = 'SPIDERMAN_ZIP_UP';
          stateTimer = 0;
          zipVelocity = 22.0;
          playElasticZipSound();

          // Spawn burst of downward trailing silk sparkles from launch point
          for (let i = 0; i < 9; i++) {
            particles.push({
              x: spiderX + (Math.random() - 0.5) * 18,
              y: spiderY + 12 + Math.random() * 8,
              vx: (Math.random() - 0.5) * 3.5,
              vy: 3.0 + Math.random() * 4.5,
              alpha: 1.0,
              size: 4.0,
              color: i % 2 === 0 ? '#C084FC' : '#E0E7FF',
            });
          }
        }
      } else if (spiderState === 'SPIDERMAN_ZIP_UP') {
        // Step B: Rocket acceleration upward along elastic thread
        zipVelocity += 5.2 * dt;
        spiderY -= zipVelocity * dt;
        targetDesiredAngle = 0;
        spiderAngle = 0;

        // Continuous trail of speed particles while zipping
        if (Math.random() < 0.45) {
          particles.push({
            x: spiderX + (Math.random() - 0.5) * 12,
            y: spiderY + 16,
            vx: (Math.random() - 0.5) * 2.0,
            vy: 4.0 + Math.random() * 3.0,
            alpha: 0.9,
            size: 3.2,
            color: '#E0E7FF',
          });
        }

        if (spiderY < -120) {
          // Successfully zipped out of the page!
          spiderState = 'OFFSCREEN_REST';
          stateTimer = 0;
          spiderY = -250;
          if (hitboxRef.current) {
            hitboxRef.current.style.display = 'none';
          }
        }
      } else if (spiderState === 'OFFSCREEN_REST') {
        // Spider rests quietly offscreen above viewport until user scrolls to a new section!
        spiderY = -250;
        if (hitboxRef.current) {
          hitboxRef.current.style.display = 'none';
        }
      } else if (spiderState === 'OFFSCREEN_COOLDOWN') {
        spiderState = 'OFFSCREEN_REST';
        stateTimer = 0;
      } else if (spiderState === 'SPIDER_CLICK_CELEBRATE') {
        // Romance celebration: 360 parabolic backflip on this EXACT spot
        flipPhase += 0.045 * dt;
        const flipProgress = Math.min(1.0, flipPhase);
        const flipHeight = Math.sin(flipProgress * Math.PI) * 34;
        spiderX = flipBaseX;
        spiderY = flipBaseY - flipHeight;
        spiderAngle = returnAngleAfterCelebrate + flipProgress * Math.PI * 2;

        if (flipProgress >= 1.0 || stateTimer > 1.8) {
          // Stays on this spot! Transitions to SPIDER_CLICK_PERCH (never jumps to start or exits!)
          spiderState = 'SPIDER_CLICK_PERCH';
          spiderX = flipBaseX;
          spiderY = flipBaseY;
          spiderAngle = returnAngleAfterCelebrate;
          stateTimer = 0;
          isHeartEyes = false;
        }
      } else if (spiderState === 'SPIDER_CLICK_PERCH') {
        // STAYS ON THIS SPOT! Interacts with mouse, waves paws, never resets or exits
        spiderX = flipBaseX;
        spiderY = flipBaseY;
        isWavingPaws = true;
        pawWaveCycle += 0.12 * dt;

        // When perched on hero, turns to look at cursor; when hanging on thread, stays aligned with thread
        if (mouse.x > 0 && currentActiveSection === 'hero') {
          targetDesiredAngle = Math.atan2(mouse.x - spiderX, -(mouse.y - spiderY));
        } else {
          spiderAngle = returnAngleAfterCelebrate;
          targetDesiredAngle = returnAngleAfterCelebrate;
        }

        // Only after 10s of being left alone, gently resume without teleporting
        if (stateTimer > 10.0 && !mouse.isNearSpider) {
          isWavingPaws = false;
          stateTimer = 0;
          if (currentActiveSection !== 'hero') {
            spiderState = 'SECTION_TOUR_RAPPEL';
            pendulumLength = Math.max(60, Math.hypot(spiderX - webAnchorX, spiderY - webAnchorY));
            pendulumAngle = Math.atan2(spiderX - webAnchorX, Math.max(1, spiderY - webAnchorY));
            pendulumAngularVel = 0;
          } else {
            spiderState = 'WALK_CREATIVE_TOP';
            pathProgress = 0;
          }
        }
      } else if (spiderState === 'SECTION_TOUR_RAPPEL') {
        // Multi-section rappel: authentic physical pendulum simulation ("ball hanging around on a thread")
        const cfg = SECTION_RAPPEL_CONFIGS[currentActiveSection] || SECTION_RAPPEL_CONFIGS.specialties;
        webAnchorX = Math.round(width * cfg.anchorXPercent);
        webAnchorY = 0; // ceiling anchor

        let targetBaseY = Math.round(height * cfg.hangingYPercent);

        // Dynamically align hanging Y level with the section heading (matching user reference)
        const secEl = document.getElementById(currentActiveSection);
        if (secEl) {
          const hEl = secEl.querySelector('#companies-heading') || secEl.querySelector('h2') || secEl.querySelector('span.uppercase') || secEl.querySelector('h3');
          if (hEl) {
            const hRect = hEl.getBoundingClientRect();
            if (hRect.top >= 40 && hRect.top <= height * 0.70) {
              targetBaseY = Math.round(hRect.top + 10);
            }
          }
          if (currentActiveSection === 'companies') {
            const containerEl = secEl.querySelector('.max-w-7xl');
            if (containerEl) {
              const cRect = containerEl.getBoundingClientRect();
              webAnchorX = Math.min(width - 45, Math.round(cRect.right + 20));
            }
          }
        }

        // Smooth extension of string length as spider descends from ceiling
        if (pendulumLength < 10) {
          pendulumLength = 10;
        }
        pendulumLength += (targetBaseY - pendulumLength) * Math.min(1, 0.065 * dt);

        // Subtle elastic bob along string length on descent
        const elasticBob = Math.sin(stateTimer * 2.8) * 3.5 * Math.exp(-Math.min(6, stateTimer) * 0.35);
        const currentL = pendulumLength + elasticBob;

        // True physical pendulum integration:
        // Gravity restoring torque: tau = -omega_0^2 * sin(theta)
        const gravityTorque = -0.0034 * Math.sin(pendulumAngle);
        // Organic ambient breeze (subtle gentle sway so it never feels mechanically frozen)
        const ambientBreeze = Math.sin(stateTimer * 1.2) * 0.00012 + Math.sin(stateTimer * 1.85) * 0.00006;

        // Air drag damping & angular acceleration
        pendulumAngularVel += (gravityTorque + ambientBreeze) * dt;
        pendulumAngularVel *= Math.pow(0.988, dt);
        pendulumAngle += pendulumAngularVel * dt;
        // Subtle physical clamp within gentle swing bounds (+/- 0.12 radians ≈ 6.9 degrees)
        pendulumAngle = Math.max(-0.12, Math.min(0.12, pendulumAngle));

        // Exact circular arc kinematics: rising at the swing peaks (cos theta < 1)
        spiderX = webAnchorX + currentL * Math.sin(pendulumAngle);
        spiderY = webAnchorY + currentL * Math.cos(pendulumAngle);

        // Body naturally hangs aligned with the thread (NO body pull towards cursor; eye pupils track cursor)
        spiderAngle = pendulumAngle;
        targetDesiredAngle = spiderAngle;

        // Calm resting companion posture in content sections (no frantic hand loops)
        isWavingPaws = false;

        // If user scrolls back up to hero, return to hero cycle
        if (currentActiveSection === 'hero') {
          spiderState = 'INITIAL_DROP';
          stateTimer = 0;
          isWavingPaws = false;
        }
      } else if (spiderState === 'MOUSE_CURIOUS') {
        isWavingPaws = true;
        pawWaveCycle += 0.16 * dt;
        targetDesiredAngle = Math.atan2(mouse.x - spiderX, -(mouse.y - spiderY));

        if (!mouse.isNearSpider && stateTimer > 2.2) {
          spiderState = previousState;
          stateTimer = 0;
          isWavingPaws = false;
        }
      }

      // Smooth position and heading easing
      if (
        spiderState !== 'INITIAL_DROP' &&
        spiderState !== 'SPIDERMAN_ZIP_UP' &&
        spiderState !== 'SPIDER_CLICK_CELEBRATE' &&
        spiderState !== 'SPIDER_CLICK_PERCH' &&
        spiderState !== 'SECTION_TOUR_RAPPEL' &&
        spiderState !== 'RAPPEL_UP_TO_LETTERS'
      ) {
        const moveSpeed = Math.min(1, 0.18 * dt);
        velocityX = (targetX - spiderX) * moveSpeed;
        velocityY = (targetY - spiderY) * moveSpeed;

        spiderX += velocityX;
        spiderY += velocityY;

        const diff = Math.atan2(Math.sin(targetDesiredAngle - spiderAngle), Math.cos(targetDesiredAngle - spiderAngle));
        spiderAngle += diff * Math.min(1, 0.18 * dt);
        spiderAngle = Math.atan2(Math.sin(spiderAngle), Math.cos(spiderAngle));

        const travelDist = Math.hypot(velocityX, velocityY);
        gaitPhase = (gaitPhase + travelDist * 0.14) % (Math.PI * 2);
      }

      // Look-at coordinates
      const targetLookX = mouse.x > 0 ? mouse.x : spiderX + Math.sin(spiderAngle) * 60;
      const targetLookY = mouse.y > 0 ? mouse.y : spiderY - Math.cos(spiderAngle) * 60;
      lookAtX += (targetLookX - lookAtX) * Math.min(1, 0.14 * dt);
      lookAtY += (targetLookY - lookAtY) * Math.min(1, 0.14 * dt);

      // =========================================================================
      // 3. SUBTLE SILK STRING WIND PHYSICS (MOUSE LEFT/RIGHT PROXIMITY SWAY)
      // =========================================================================
      const isHangingThreadActive =
        spiderState === 'INITIAL_DROP' ||
        spiderState === 'RAPPEL_TO_BUTTON' ||
        spiderState === 'RAPPEL_UP_TO_LETTERS' ||
        spiderState === 'SHOOT_WEB_PREPARE' ||
        spiderState === 'SECTION_TOUR_RAPPEL' ||
        (spiderState === 'SPIDER_CLICK_PERCH' && currentActiveSection !== 'hero');

      const horizontalMove = mouseMoveDeltaX;
      mouseMoveDeltaX = 0; // reset accumulated movement for the frame

      if (isHangingThreadActive && spiderY > -50) {
        // Distance directly to the spider bob itself
        const distToSpider = Math.hypot(mouse.x - spiderX, mouse.y - spiderY);

        // ONLY trigger nudge when the mouse is physically near the spider (within 90px radius)
        if (spiderState === 'SECTION_TOUR_RAPPEL' && distToSpider < 90 && Math.abs(horizontalMove) > 0.08) {
          const proximity = Math.cos((distToSpider / 90) * (Math.PI * 0.5));
          // Very subtle nudge torque: gentle push only, strictly capped to avoid any large swinging
          const subtleTorque = Math.max(-0.0012, Math.min(0.0012, (horizontalMove / Math.max(120, pendulumLength)) * 0.006 * proximity));
          pendulumAngularVel += subtleTorque;

          // Subtle string micro-breeze
          const windImpulse = Math.max(-2.0, Math.min(2.0, horizontalMove * 0.15)) * proximity;
          stringWindVelocity += windImpulse * 0.20;
        } else if (spiderState !== 'SECTION_TOUR_RAPPEL') {
          // For other dropping states, subtle thread breeze when near thread
          const anchorY = (spiderState === 'RAPPEL_TO_BUTTON' || spiderState === 'RAPPEL_UP_TO_LETTERS') ? webAnchorY : 0;
          const threadTopY = spiderState === 'SHOOT_WEB_PREPARE' ? spiderY - (spiderY - 0) * webShotProgress : anchorY;
          const isNearThreadY = mouse.y >= threadTopY - 20 && mouse.y <= spiderY + 70;
          const dx = mouse.x - spiderX;
          if (isNearThreadY && Math.abs(dx) < 100 && Math.abs(horizontalMove) > 0.08) {
            const proximity = Math.cos((Math.abs(dx) / 100) * (Math.PI * 0.5));
            const windImpulse = Math.max(-3.0, Math.min(3.0, horizontalMove * 0.20)) * proximity;
            stringWindVelocity += windImpulse * 0.25;
          }
        }
      }

      // Damped harmonic spring physics (restoring force + air damping)
      const stringSpringK = 0.085;
      const stringDamping = 0.88;
      stringWindVelocity += -stringSpringK * stringWindOffset;
      stringWindVelocity *= Math.pow(stringDamping, dt);
      stringWindOffset += stringWindVelocity * dt;

      // Subtle clamp: thread deflects at most +/- 3px (never bows excessively)
      stringWindOffset = Math.max(-3.0, Math.min(3.0, stringWindOffset));

      if (!isHangingThreadActive) {
        stringWindOffset *= 0.82;
      }

      if (Math.abs(stringWindOffset) < 0.015 && Math.abs(stringWindVelocity) < 0.015) {
        stringWindOffset = 0;
        stringWindVelocity = 0;
      }

      // Spider body subtle pendulum sway at the bottom of the thread
      spiderWindSwayX = isHangingThreadActive && spiderState !== 'SECTION_TOUR_RAPPEL' ? stringWindOffset * 0.38 : 0;
      // Spider body subtle angular tilt with the breeze (max ~4.3 degrees)
      spiderWindTiltAngle = isHangingThreadActive && spiderState !== 'SECTION_TOUR_RAPPEL' ? (stringWindOffset / 12) * 0.075 : 0;

      const renderSpiderX = spiderX + spiderWindSwayX;
      const renderSpiderY = spiderY;
      const renderSpiderAngle = spiderAngle + spiderWindTiltAngle;

      // =========================================================================
      // 3b. DRAW GLOWING SILK THREAD & GUIDANCE TRACER
      // =========================================================================
      if (
        spiderState === 'INITIAL_DROP' ||
        spiderState === 'RAPPEL_TO_BUTTON' ||
        spiderState === 'RAPPEL_UP_TO_LETTERS' ||
        spiderState === 'SHOOT_WEB_PREPARE' ||
        spiderState === 'SPIDERMAN_ZIP_UP' ||
        spiderState === 'SECTION_TOUR_RAPPEL' ||
        (spiderState === 'SPIDER_CLICK_PERCH' && currentActiveSection !== 'hero')
      ) {
        ctxFront.save();
        const anchorY = (spiderState === 'RAPPEL_TO_BUTTON' || spiderState === 'RAPPEL_UP_TO_LETTERS') ? webAnchorY : 0;
        const threadTopY = spiderState === 'SHOOT_WEB_PREPARE' ? spiderY - (spiderY - 0) * webShotProgress : anchorY;

        // Anchor node at top
        ctxFront.beginPath();
        ctxFront.arc(webAnchorX, threadTopY + 2, 4.0, 0, Math.PI * 2);
        ctxFront.fillStyle = 'rgba(235, 230, 255, 0.95)';
        ctxFront.shadowBlur = 8;
        ctxFront.shadowColor = '#C084FC';
        ctxFront.fill();

        // Hanging silk thread with subtle organic wind curve & pendulum swing flex
        ctxFront.beginPath();
        ctxFront.moveTo(webAnchorX, threadTopY);

        // Inertial flex of the silk string trailing the pendulum swing (subtle 0.10)
        const swingFlexX = spiderState === 'SECTION_TOUR_RAPPEL'
          ? -pendulumAngularVel * pendulumLength * 0.10
          : 0;
        const totalThreadBend = stringWindOffset + swingFlexX;

        if (Math.abs(totalThreadBend) > 0.05) {
          const midX = (webAnchorX + renderSpiderX) * 0.5;
          const midY = (threadTopY + renderSpiderY) * 0.5;
          const ctrlX = midX + totalThreadBend;
          const ctrlY = midY;
          ctxFront.quadraticCurveTo(ctrlX, ctrlY, renderSpiderX, renderSpiderY);
        } else {
          ctxFront.lineTo(renderSpiderX, renderSpiderY);
        }

        ctxFront.strokeStyle = 'rgba(240, 235, 255, 0.88)';
        ctxFront.lineWidth = (spiderState === 'SPIDERMAN_ZIP_UP' ? 1.6 : 1.3) * spiderScale;
        ctxFront.shadowBlur = 8;
        ctxFront.shadowColor = '#C084FC';
        ctxFront.stroke();
        ctxFront.restore();
      }

      // Guidance Tracer Line (When 'VIEW MY WORK' is clicked)
      if (guidanceTracer.active) {
        guidanceTracer.timer += delta;
        guidanceTracer.progress = Math.min(1.0, guidanceTracer.progress + 0.08 * dt);

        ctxFront.save();
        ctxFront.beginPath();
        ctxFront.moveTo(renderSpiderX, renderSpiderY + 10);
        ctxFront.lineTo(renderSpiderX, renderSpiderY + 10 + guidanceTracer.progress * (height * 0.6));
        ctxFront.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctxFront.lineWidth = 2.0;
        ctxFront.shadowBlur = 12;
        ctxFront.shadowColor = '#38BDF8';
        ctxFront.stroke();
        ctxFront.restore();

        if (guidanceTracer.timer > 2.0) {
          guidanceTracer.active = false;
        }
      }

      // Golden Scroll Toss Animation (When 'DOWNLOAD RESUME' is clicked)
      if (scrollToss.active) {
        scrollToss.timer += delta;
        scrollToss.y -= 2.5 * dt;

        ctxFront.save();
        ctxFront.translate(scrollToss.x, scrollToss.y);
        ctxFront.rotate(scrollToss.timer * 4.0);
        // Miniature glowing scroll
        ctxFront.beginPath();
        ctxFront.roundRect(-8, -12, 16, 24, 3);
        ctxFront.fillStyle = '#FEF08A';
        ctxFront.shadowBlur = 10;
        ctxFront.shadowColor = '#FACC15';
        ctxFront.fill();
        ctxFront.strokeStyle = '#CA8A04';
        ctxFront.lineWidth = 1.0;
        ctxFront.stroke();
        ctxFront.restore();

        if (scrollToss.timer > 1.8) {
          scrollToss.active = false;
        }
      }

      // =========================================================================
      // 4. FLOATING SILK HEARTS (ROMANCE FEATURE)
      // =========================================================================
      for (let i = floatingHearts.length - 1; i >= 0; i--) {
        const fh = floatingHearts[i];
        fh.life += delta;
        fh.alpha = Math.max(0, 1.0 - fh.life / 3.5);
        fh.y -= 0.6 * dt;

        ctxFront.save();
        ctxFront.globalAlpha = fh.alpha;
        ctxFront.translate(fh.x, fh.y);
        ctxFront.scale(fh.scale * (1 + Math.sin(fh.life * 3.5) * 0.08), fh.scale * (1 + Math.sin(fh.life * 3.5) * 0.08));

        // Parametric glowing silk heart
        ctxFront.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
          const hx = 14 * Math.pow(Math.sin(t), 3);
          const hy = -(12 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          if (t === 0) ctxFront.moveTo(hx, hy);
          else ctxFront.lineTo(hx, hy);
        }
        ctxFront.closePath();
        ctxFront.strokeStyle = '#F472B6';
        ctxFront.lineWidth = 1.6;
        ctxFront.shadowBlur = 10;
        ctxFront.shadowColor = '#F472B6';
        ctxFront.stroke();

        ctxFront.restore();

        if (fh.life > 3.5) {
          floatingHearts.splice(i, 1);
        }
      }

      // =========================================================================
      // 5. UPDATE & DRAW PARTICLES
      // =========================================================================
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.alpha -= 0.02 * dt;

        if (pt.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctxFront.save();
        ctxFront.globalAlpha = Math.max(0, pt.alpha);
        if (pt.isHeart) {
          ctxFront.fillStyle = pt.color;
          ctxFront.beginPath();
          const hSize = pt.size;
          ctxFront.moveTo(pt.x, pt.y);
          ctxFront.bezierCurveTo(pt.x - hSize / 2, pt.y - hSize / 2, pt.x - hSize, pt.y + hSize / 3, pt.x, pt.y + hSize);
          ctxFront.bezierCurveTo(pt.x + hSize, pt.y + hSize / 3, pt.x + hSize / 2, pt.y - hSize / 2, pt.x, pt.y);
          ctxFront.fill();
        } else {
          ctxFront.beginPath();
          ctxFront.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctxFront.fillStyle = pt.color;
          ctxFront.shadowBlur = 6;
          ctxFront.shadowColor = pt.color;
          ctxFront.fill();
        }
        ctxFront.restore();
      }

      // =========================================================================
      // 6. DRAW CUTE SPIDER COMPANION
      // =========================================================================
      if (renderSpiderY > -60) {
        ctxFront.save();

        const cosA = Math.cos(renderSpiderAngle);
        const sinA = Math.sin(renderSpiderAngle);

        // Legs (100% rotation-invariant local body kinematics)
        for (let i = 0; i < 8; i++) {
          const cfg = LEG_CONFIGS[i];

          let footLocalX = cfg.restLocalX;
          let footLocalY = cfg.restLocalY;
          let liftZ = 0;

          if (spiderState === 'SPIDERMAN_ZIP_UP') {
            footLocalX = cfg.side * 10;
            footLocalY = cfg.restLocalY + 16;
          } else if (spiderState === 'SHOOT_WEB_PREPARE') {
            footLocalX = cfg.side * 18;
            footLocalY = cfg.restLocalY + 5;
          } else if (spiderState === 'SPIDER_CLICK_CELEBRATE') {
            // Acrobatic tuck during 360 flip: all 8 legs curl in cleanly & symmetrically
            const flipTuck = Math.sin(Math.min(1, flipPhase) * Math.PI) * 0.28;
            footLocalX = cfg.restLocalX * (1 - flipTuck * 0.35);
            footLocalY = cfg.restLocalY * (1 - flipTuck * 0.40);
            liftZ = flipTuck * 3.5;
          } else if (spiderState === 'SPIDER_CLICK_PERCH') {
            if (i === 0 || i === 4) {
              // Cute cheerful front paw celebration: gently raised, neatly proportioned
              const cheerPhase = stateTimer * 3.0 + (cfg.side === -1 ? 0 : 0.85);
              const waveY = Math.sin(cheerPhase) * 2.0;
              footLocalX = cfg.side * 20;
              footLocalY = -21 + waveY;
              liftZ = 3.5;
            } else {
              // Side and rear legs (1, 2, 3, 5, 6, 7): cleanly and symmetrically spread in rest pose
              const idleBreath = Math.sin(stateTimer * 1.5 + i * 0.5) * 0.6;
              footLocalX = cfg.restLocalX + cfg.side * idleBreath;
              footLocalY = cfg.restLocalY + idleBreath * 0.3;
            }
          } else if (isWavingPaws) {
            if (i === 0 || i === 4) {
              // Expressive front paws waving
              const wavePhase = pawWaveCycle * 2.2 + (cfg.side === -1 ? 0 : 0.85);
              const waveX = Math.sin(wavePhase) * 4.5 * cfg.side;
              const waveY = Math.abs(Math.sin(wavePhase)) * -5.0;
              footLocalX = cfg.side * 20 + waveX;
              footLocalY = -22 + waveY;
              liftZ = 4.0;
            } else {
              // Side and rear legs stay cleanly planted in rest pose (ZERO walking gait bunching!)
              const breath = Math.sin(stateTimer * 1.5 + i * 0.5) * 0.5;
              footLocalX = cfg.restLocalX + cfg.side * breath;
              footLocalY = cfg.restLocalY + breath * 0.3;
            }
          } else if (spiderState === 'INITIAL_DROP' || spiderState === 'RAPPEL_TO_BUTTON') {
            // Gentle air-drift wiggle while actively dropping on a line
            const airWiggle = Math.sin(stateTimer * 2.5 + i * 0.8) * 1.5;
            footLocalX = cfg.restLocalX + cfg.side * airWiggle;
            footLocalY = cfg.restLocalY + airWiggle * 0.4;
          } else if (spiderState === 'SECTION_TOUR_RAPPEL') {
            // Cute, calm idle breathing animation while hanging in content sections (NO weird rapid hand movements)
            const idleBreath = Math.sin(stateTimer * 1.2 + i * 0.5) * 0.75;
            // Natural subtle inertial leg dangle reacting to the pendulum swing
            const swingInertia = -pendulumAngularVel * 12.0 * (i >= 2 ? 0.7 : 0.25);
            footLocalX = cfg.restLocalX + cfg.side * idleBreath + swingInertia;
            footLocalY = cfg.restLocalY + idleBreath * 0.4;
            // Cute folded front paws (i=0, 4) in calm resting companion pose
            if (i === 0 || i === 4) {
              footLocalY = cfg.restLocalY - 3.5 + Math.sin(stateTimer * 1.0) * 0.5;
            }
          } else if (
            spiderState === 'WALK_CREATIVE_TOP' ||
            spiderState === 'ROUND_CREATIVE_RIGHT' ||
            spiderState === 'STEP_TECHNOLOGIST_TOP' ||
            spiderState === 'ROUND_TECHNOLOGIST_RIGHT' ||
            spiderState === 'WALK_TECHNOLOGIST_BOTTOM' ||
            spiderState === 'WALK_BTN_WORK' ||
            spiderState === 'HOP_BETWEEN_BUTTONS' ||
            spiderState === 'WALK_BTN_RESUME'
          ) {
            const legPhase = cfg.group === 0 ? gaitPhase : (gaitPhase + Math.PI) % (Math.PI * 2);

            if (legPhase < Math.PI) {
              const u = legPhase / Math.PI;
              liftZ = Math.sin(u * Math.PI) * 5.5;
              const stepReach = (u - 0.5) * 14.0;
              footLocalX = cfg.restLocalX;
              footLocalY = cfg.restLocalY - stepReach;
            } else {
              const u = (legPhase - Math.PI) / Math.PI;
              const pushBack = (u - 0.5) * 14.0;
              footLocalX = cfg.restLocalX;
              footLocalY = cfg.restLocalY + pushBack;
            }
          } else {
            // Clean default rest pose for any other stationary state
            const breath = Math.sin(stateTimer * 1.2 + i * 0.4) * 0.5;
            footLocalX = cfg.restLocalX + cfg.side * breath;
            footLocalY = cfg.restLocalY + breath * 0.3;
          }

          // Local knee position (organic outwards arch & forward/backward bend)
          const midLocalX = (cfg.baseLocalX + footLocalX) / 2;
          const midLocalY = (cfg.baseLocalY + footLocalY) / 2;
          const outwardBow = cfg.side * (8.5 + liftZ * 0.35);
          const kneeOffsetY = i === 0 || i === 4 ? -4.5 : i === 1 || i === 5 ? -2.0 : i === 2 || i === 6 ? +2.0 : +4.5;
          const kneeLocalX = midLocalX + outwardBow;
          const kneeLocalY = midLocalY + kneeOffsetY;

          // Transform joints to screen coordinates via body rotation & position
          const toWorldX = (lx: number, ly: number) => renderSpiderX + (cosA * lx - sinA * ly) * spiderScale;
          const toWorldY = (lx: number, ly: number) => renderSpiderY + (sinA * lx + cosA * ly) * spiderScale;

          const baseX = toWorldX(cfg.baseLocalX, cfg.baseLocalY);
          const baseY = toWorldY(cfg.baseLocalX, cfg.baseLocalY);

          const kneeX = toWorldX(kneeLocalX, kneeLocalY);
          const kneeY = toWorldY(kneeLocalX, kneeLocalY);

          const footX = toWorldX(footLocalX, footLocalY);
          const footY = toWorldY(footLocalX, footLocalY);

          ctxFront.beginPath();
          ctxFront.moveTo(baseX, baseY);
          ctxFront.lineTo(kneeX, kneeY);
          ctxFront.lineTo(footX, footY);
          ctxFront.strokeStyle = '#2E1065';
          ctxFront.lineWidth = 2.6 * spiderScale;
          ctxFront.lineCap = 'round';
          ctxFront.stroke();

          ctxFront.strokeStyle = '#A855F7';
          ctxFront.lineWidth = 1.1 * spiderScale;
          ctxFront.stroke();

          ctxFront.beginPath();
          ctxFront.arc(kneeX, kneeY, 1.4 * spiderScale, 0, Math.PI * 2);
          ctxFront.fillStyle = '#C084FC';
          ctxFront.fill();

          // Outer soft pink glow (zero shadowBlur cost)
          ctxFront.beginPath();
          ctxFront.arc(footX, footY, 3.8 * spiderScale, 0, Math.PI * 2);
          ctxFront.fillStyle = 'rgba(244, 114, 182, 0.32)';
          ctxFront.fill();

          // Core glowing foot
          ctxFront.beginPath();
          ctxFront.arc(footX, footY, 2.3 * spiderScale, 0, Math.PI * 2);
          ctxFront.fillStyle = '#F472B6';
          ctxFront.fill();
        }

        // Contact Shadow (Fast radial gradient with zero GPU raster blur filter cost)
        if (spiderState !== 'SPIDERMAN_ZIP_UP' && spiderState !== 'SECTION_TOUR_RAPPEL') {
          ctxFront.save();
          ctxFront.translate(renderSpiderX + 2 * spiderScale, renderSpiderY + 6 * spiderScale);
          ctxFront.rotate(renderSpiderAngle);
          ctxFront.scale(1.5, 1.0);
          const shadowGrad = ctxFront.createRadialGradient(0, 0, 2 * spiderScale, 0, 0, 10 * spiderScale);
          shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
          shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.15)');
          shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctxFront.beginPath();
          ctxFront.arc(0, 0, 10 * spiderScale, 0, Math.PI * 2);
          ctxFront.fillStyle = shadowGrad;
          ctxFront.fill();
          ctxFront.restore();
        }

        // Body & Kawaii Face
        ctxFront.save();
        ctxFront.translate(renderSpiderX, renderSpiderY);
        ctxFront.rotate(renderSpiderAngle);
        ctxFront.scale(spiderScale, spiderScale);

        // Abdomen
        const abdoGrad = ctxFront.createRadialGradient(-2, 7, 2, 0, 7, 18);
        abdoGrad.addColorStop(0, '#581C87');
        abdoGrad.addColorStop(0.65, '#2E1065');
        abdoGrad.addColorStop(1, '#1A0B2E');

        ctxFront.beginPath();
        ctxFront.ellipse(0, 7, 16, 14.5, 0, 0, Math.PI * 2);
        ctxFront.fillStyle = abdoGrad;
        ctxFront.shadowBlur = 8;
        ctxFront.shadowColor = 'rgba(168, 85, 247, 0.45)';
        ctxFront.fill();

        // Chevron Stripe
        ctxFront.beginPath();
        ctxFront.arc(0, 10, 6.5, Math.PI * 1.2, Math.PI * 1.8);
        ctxFront.strokeStyle = 'rgba(192, 132, 252, 0.65)';
        ctxFront.lineWidth = 1.4;
        ctxFront.stroke();

        // Head
        const headGrad = ctxFront.createRadialGradient(0, -6, 2, 0, -6, 14);
        headGrad.addColorStop(0, '#6B21A8');
        headGrad.addColorStop(0.7, '#3B0764');
        headGrad.addColorStop(1, '#1E0734');

        ctxFront.beginPath();
        ctxFront.ellipse(0, -6, 13.5, 11.5, 0, 0, Math.PI * 2);
        ctxFront.fillStyle = headGrad;
        ctxFront.fill();

        ctxFront.strokeStyle = 'rgba(192, 132, 252, 0.58)';
        ctxFront.lineWidth = 1.0;
        ctxFront.stroke();

        // Blush Cheeks
        const blushAlpha = isWavingPaws || isHeartEyes ? 0.95 : 0.75;
        ctxFront.beginPath();
        ctxFront.ellipse(-8, -6, 3.0, 1.9, 0.15, 0, Math.PI * 2);
        ctxFront.ellipse(8, -6, 3.0, 1.9, -0.15, 0, Math.PI * 2);
        ctxFront.fillStyle = `rgba(244, 114, 182, ${blushAlpha})`;
        ctxFront.fill();

        // Smiling Mouth
        ctxFront.beginPath();
        ctxFront.arc(0, -5, 2.7, 0.15 * Math.PI, 0.85 * Math.PI);
        ctxFront.strokeStyle = '#FFFFFF';
        ctxFront.lineWidth = 1.2;
        ctxFront.lineCap = 'round';
        ctxFront.stroke();

        // Big Expressive Cartoon Eyes
        const leftEyeX = -4.6;
        const rightEyeX = 4.6;
        const eyeY = -8.5;
        const eyeRadius = isWavingPaws || isHeartEyes ? 4.1 : 3.7;

        if (isHeartEyes) {
          // Romantic Heart Eyes ♡ ♡
          [-4.6, 4.6].forEach((ex) => {
            ctxFront.save();
            ctxFront.translate(ex, eyeY);
            ctxFront.beginPath();
            for (let t = 0; t <= Math.PI * 2; t += 0.2) {
              const hx = 2.4 * Math.pow(Math.sin(t), 3);
              const hy = -(2.2 * Math.cos(t) - 0.9 * Math.cos(2 * t) - 0.4 * Math.cos(3 * t) - 0.2 * Math.cos(4 * t));
              if (t === 0) ctxFront.moveTo(hx, hy);
              else ctxFront.lineTo(hx, hy);
            }
            ctxFront.fillStyle = '#F472B6';
            ctxFront.shadowBlur = 6;
            ctxFront.shadowColor = '#F472B6';
            ctxFront.fill();
            ctxFront.restore();
          });
        } else if (isBlinking) {
          ctxFront.beginPath();
          ctxFront.arc(leftEyeX, eyeY + 0.5, 3.3, Math.PI * 1.15, Math.PI * 1.85);
          ctxFront.arc(rightEyeX, eyeY + 0.5, 3.3, Math.PI * 1.15, Math.PI * 1.85);
          ctxFront.strokeStyle = '#FFFFFF';
          ctxFront.lineWidth = 1.35;
          ctxFront.stroke();
        } else {
          const localLookX = cosA * (lookAtX - spiderX) + sinA * (lookAtY - spiderY);
          const localLookY = -sinA * (lookAtX - spiderX) + cosA * (lookAtY - spiderY);
          const eyeLookAngle = Math.atan2(localLookY - eyeY, localLookX - leftEyeX);
          const pupilOffsetDist = 1.2;
          const pupilDx = Math.cos(eyeLookAngle) * pupilOffsetDist;
          const pupilDy = Math.sin(eyeLookAngle) * pupilOffsetDist;

          // Left Eye
          ctxFront.beginPath();
          ctxFront.arc(leftEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
          ctxFront.fillStyle = '#0F0D15';
          ctxFront.fill();
          ctxFront.strokeStyle = '#FFFFFF';
          ctxFront.lineWidth = 0.85;
          ctxFront.stroke();

          ctxFront.beginPath();
          ctxFront.arc(leftEyeX + pupilDx * 0.45, eyeY + pupilDy * 0.45, eyeRadius * 0.74, 0, Math.PI * 2);
          ctxFront.fillStyle = '#181024';
          ctxFront.fill();

          ctxFront.beginPath();
          ctxFront.arc(leftEyeX - 1.2 + pupilDx * 0.2, eyeY - 1.2 + pupilDy * 0.2, 1.45, 0, Math.PI * 2);
          ctxFront.fillStyle = '#FFFFFF';
          ctxFront.fill();

          // Right Eye
          ctxFront.beginPath();
          ctxFront.arc(rightEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
          ctxFront.fillStyle = '#0F0D15';
          ctxFront.fill();
          ctxFront.strokeStyle = '#FFFFFF';
          ctxFront.lineWidth = 0.85;
          ctxFront.stroke();

          ctxFront.beginPath();
          ctxFront.arc(rightEyeX + pupilDx * 0.45, eyeY + pupilDy * 0.45, eyeRadius * 0.74, 0, Math.PI * 2);
          ctxFront.fillStyle = '#181024';
          ctxFront.fill();

          ctxFront.beginPath();
          ctxFront.arc(rightEyeX - 1.2 + pupilDx * 0.2, eyeY - 1.2 + pupilDy * 0.2, 1.45, 0, Math.PI * 2);
          ctxFront.fillStyle = '#FFFFFF';
          ctxFront.fill();
        }

        ctxFront.restore();
        ctxFront.restore();
      }

      // Update interactive spider hitbox
      if (hitboxRef.current) {
        if (renderSpiderY < -50 || spiderState === 'SPIDERMAN_ZIP_UP' || spiderState === 'OFFSCREEN_REST' || spiderState === 'SHOOT_WEB_PREPARE') {
          hitboxRef.current.style.display = 'none';
        } else {
          hitboxRef.current.style.display = 'block';
          hitboxRef.current.style.left = `${renderSpiderX}px`;
          hitboxRef.current.style.top = `${renderSpiderY}px`;
        }
      }

      // Telemetry debug
      (window as any).__SPIDER_DEBUG = {
        state: spiderState,
        time: stateTimer,
        x: renderSpiderX,
        y: renderSpiderY,
        angle: renderSpiderAngle,
        pendulumAngle,
        pendulumAngularVel,
        pendulumLength,
        stringWindOffset,
        activeSection: currentActiveSection,
        webRadius: currentWebRadius,
        soundEnabled: isSoundEnabled(),
        triggerClick: triggerSpiderClickCelebrate,
        creativeRect,
        technologistRect,
        btnWorkRect,
        btnResumeRect,
      };

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('pointerdown', handleGlobalActivation, true);
      window.removeEventListener('click', handleGlobalActivation, true);
      window.removeEventListener('keydown', handleGlobalActivation, true);
      window.removeEventListener('creature-audio-unlocked', handleUnlockedEvent);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('spider-event', handleSpiderEvent);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      unlockAudio();
      if (activeSpeech.section) {
        playSectionVoice(activeSpeech.section);
      }
    } else {
      stopAllSpiderVoices();
    }
  };

  const handleDismissSpeech = () => {
    setActiveSpeech((prev) => ({ ...prev, visible: false }));
    dismissSpeechRef.current();
  };

  return (
    <>
      {/* Back Layer: Authentic Orb-Weaver Web strictly up to letter 'C' (z-[1]) */}
      <canvas
        ref={canvasBackRef}
        className="fixed inset-0 pointer-events-none z-[1]"
      />

      {/* Front Layer: Cute Spider Companion, silk threads, hearts, guidance tracer (z-[35]) */}
      <canvas
        ref={canvasFrontRef}
        className="fixed inset-0 pointer-events-none z-[35]"
      />

      {/* Interactive Spider Hitbox with Cute Pointer Cursor */}
      <div
        ref={hitboxRef}
        className="fixed pointer-events-auto cursor-pointer z-[38] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '68px',
          height: '68px',
          left: '0px',
          top: '0px',
          display: 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
          unlockAudio();
          triggerSpiderCelebrateRef.current?.();
        }}
        title="Click Gaurav's spatial spider! ♡"
      />

      {/* Glassmorphic Thought / Speech Bubble Component (z-[40]) */}
      {activeSpeech.visible && activeSpeech.text && (
        <div
          ref={speechBubbleRef}
          onClick={() => {
            if (!isAudioUnlocked) {
              unlockAudio();
              setIsAudioUnlocked(true);
            }
          }}
          className="fixed pointer-events-auto z-[40] select-none cursor-pointer"
          style={{
            right: activeSpeech.x > (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500)
              ? `${Math.max(16, (typeof window !== 'undefined' ? window.innerWidth : 1200) - activeSpeech.x + 22)}px`
              : 'auto',
            left: activeSpeech.x <= (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500)
              ? `${Math.max(16, activeSpeech.x + 22)}px`
              : 'auto',
            top: `${Math.max(76, Math.min((typeof window !== 'undefined' ? window.innerHeight : 800) - 180, activeSpeech.y - 35))}px`,
          }}
        >
          <div className="relative max-w-[270px] sm:max-w-[310px] bg-[#0E111E]/95 border border-purple-400/40 rounded-2xl px-3.5 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.85)] shadow-purple-500/10 backdrop-blur-xl animate-in zoom-in-95 duration-150">
            {/* Header tag with Sound Toggle and Dismiss (✕) Button */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-purple-300">
                  Spider Guide
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {!isAudioUnlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      unlockAudio();
                      setIsAudioUnlocked(true);
                      if (activeSpeech.section) {
                        playSectionVoice(activeSpeech.section);
                      }
                    }}
                    className="text-[10px] font-mono font-bold text-purple-200 hover:text-white transition-all flex items-center gap-1.5 bg-gradient-to-r from-purple-600/35 via-fuchsia-600/25 to-purple-600/35 hover:from-purple-600/50 hover:via-fuchsia-600/40 hover:to-purple-600/50 border border-purple-400/50 hover:border-purple-300 px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.35)] hover:shadow-[0_0_18px_rgba(192,132,252,0.55)] animate-pulse"
                    title="Tap to listen to spider companion voice"
                  >
                    <Volume2 className="w-3 h-3 text-purple-300 flex-shrink-0" />
                    <span>Tap to Listen</span>
                  </button>
                )}
                <button
                  onClick={handleToggleSound}
                  className="text-[10px] text-gray-400 hover:text-white transition-colors flex items-center gap-1 bg-white/[0.06] hover:bg-white/[0.12] px-1.5 py-0.5 rounded-md"
                  title={soundOn ? 'Mute Creature Voice' : 'Unmute Creature Voice'}
                >
                  <span>{soundOn ? '🔊 Sound' : '🔇 Mute'}</span>
                </button>
                <button
                  onClick={handleDismissSpeech}
                  className="text-[11px] text-gray-400 hover:text-white transition-colors flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] w-5 h-5 rounded-md leading-none"
                  title="Dismiss message"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Creature Dialogue Typewriter */}
            <p className="text-xs text-gray-200 font-sans leading-relaxed min-h-[36px]">
              {activeSpeech.text}
            </p>

            {/* Comic speech bubble tail pointing to spider */}
            {activeSpeech.x > (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500) ? (
              // Right-pointing tail towards spider (since bubble sits to the left of spider)
              <>
                <div className="absolute top-8 -right-2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-purple-400/40" />
                <div className="absolute top-8 -right-1.5 w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-[#0E111E]" />
              </>
            ) : (
              // Left-pointing tail towards spider (since bubble sits to the right of spider)
              <>
                <div className="absolute top-8 -left-2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-purple-400/40" />
                <div className="absolute top-8 -left-1.5 w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-[#0E111E]" />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
