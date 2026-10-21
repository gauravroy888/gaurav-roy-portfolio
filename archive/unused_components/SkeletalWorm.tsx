'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Segment {
  x: number;
  y: number;
  angle: number;
}

interface GlowingOrb {
  id: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  phase: number;
  isCollected: boolean;
  respawnTimer: number;
  scaleAnim: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface FloatingScore {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

// Helper: Calculate shortest distance between two angles in radians
function getShortestAngle(from: number, to: number): number {
  let diff = (to - from) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return diff;
}

export const SkeletalWorm: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: width * 0.7,
      y: height * 0.35,
    };

    let lastMouseMoveTime = performance.now();
    let isIdle = false;
    let orbitAngle = 0;

    // Autonomous random wander waypoint for other sections
    const wanderTarget = {
      x: width * 0.3,
      y: height * 0.6,
      changeTimer: 0,
    };

    const pickNewWanderTarget = () => {
      wanderTarget.x = 100 + Math.random() * Math.max(100, width - 200);
      wanderTarget.y = 100 + Math.random() * Math.max(100, height - 200);
    };

    // Maximum pool of segments (42 for desktop)
    const MAX_SEGMENTS = 42;
    const segments: Segment[] = [];

    // Initialize segments in a line
    for (let i = 0; i < MAX_SEGMENTS; i++) {
      segments.push({
        x: mouse.x - i * 12.5,
        y: mouse.y,
        angle: 0,
      });
    }

    let headX = mouse.x;
    let headY = mouse.y;
    let headAngle = 0;
    let speed = 0;
    let time = 0;
    let wagIntensity = 0;
    let energySurge = 0; // Triggered when eating a glowing orb
    let rainbowIntensity = 0; // Triggered when worm touches mouse pointer

    // --- INTERACTIVE GLOWING ORBS GAME STATE (4 small balls distributed across 4 screen quadrants) ---
    const ORB_ZONES = [
      // 1. Top-Left Sector (Left of Hero Heading)
      { id: 0, minX: 0.08, maxX: 0.35, minY: 0.15, maxY: 0.42, color: '#00F5FF', glowColor: '#00F5FF' }, // Cyan
      // 2. Top-Right Sector (Right of Portrait / Upper Right)
      { id: 1, minX: 0.65, maxX: 0.92, minY: 0.15, maxY: 0.45, color: '#34D399', glowColor: '#10B981' }, // Emerald
      // 3. Bottom-Left Sector (Lower Left / Stats Bar Left)
      { id: 2, minX: 0.08, maxX: 0.38, minY: 0.55, maxY: 0.88, color: '#FBBF24', glowColor: '#F59E0B' }, // Amber Gold
      // 4. Bottom-Right Sector (Lower Right / Below Portrait)
      { id: 3, minX: 0.62, maxX: 0.92, minY: 0.55, maxY: 0.88, color: '#C084FC', glowColor: '#A855F7' }, // Purple
    ];

    interface GlowingOrbWithZone extends GlowingOrb {
      percentX: number;
      percentY: number;
      zoneIdx: number;
    }

    const orbs: GlowingOrbWithZone[] = ORB_ZONES.map((zone, idx) => {
      const px = zone.minX + Math.random() * (zone.maxX - zone.minX);
      const py = zone.minY + Math.random() * (zone.maxY - zone.minY);
      return {
        id: idx,
        zoneIdx: idx,
        percentX: px,
        percentY: py,
        baseX: width * px,
        baseY: height * py,
        x: width * px,
        y: height * py,
        radius: 4.0,
        color: zone.color,
        glowColor: zone.glowColor,
        phase: idx * 1.5,
        isCollected: false,
        respawnTimer: 0,
        scaleAnim: 1.0,
      };
    });

    const particles: Particle[] = [];
    const floatingScores: FloatingScore[] = [];

    let isTabHidden = false;
    let isMouseInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouseMoveTime = performance.now();
      isIdle = false;
      // Must be safely inside the browser viewport, not at browser edges/tabs
      isMouseInside = e.clientX > 15 && e.clientX < width - 15 && e.clientY > 15 && e.clientY < height - 15;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        lastMouseMoveTime = performance.now();
        isIdle = false;
        isMouseInside = touch.clientX > 15 && touch.clientX < width - 15 && touch.clientY > 15 && touch.clientY < height - 15;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        lastMouseMoveTime = performance.now();
        isIdle = false;
        isMouseInside = touch.clientX > 15 && touch.clientX < width - 15 && touch.clientY > 15 && touch.clientY < height - 15;
      }
    };

    const handleTouchEnd = () => {
      isMouseInside = false;
      isIdle = true;
    };

    const handleMouseLeave = () => {
      // Smoothly transition creature to idle orbit if cursor exits browser window
      isMouseInside = false;
      isIdle = true;
    };

    let lastTime = performance.now();

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      if (!isTabHidden) {
        lastMouseMoveTime = performance.now();
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      for (const orb of orbs) {
        orb.baseX = width * orb.percentX;
        orb.baseY = height * orb.percentY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (isTabHidden) return;
      const now = performance.now();
      const rawDelta = (now - lastTime) / 1000;
      lastTime = now;

      // Framerate-independent normalized delta time factor (dt = 1.0 at standard 60 FPS)
      const delta = Math.min(Math.max(rawDelta, 0.001), 0.1);
      const dt = delta * 60;

      time += 0.035 * dt;

      // Responsive device scaling (Mobile: 0.6x scale, 18 segments; Desktop: 1.0x scale, 42 segments)
      const isMobile = width < 768;
      const scale = isMobile ? 0.6 : 1.0;
      const activeNumSegments = isMobile ? 18 : 42;
      const activeSegmentLength = isMobile ? 9.5 : 12.5;

      // Decay energy surge ripple
      if (energySurge > 0) {
        energySurge = Math.max(0, energySurge - 0.02 * dt);
      }

      // 1. Check for 5-second inactivity
      if (now - lastMouseMoveTime > 5000) {
        if (!isIdle) {
          isIdle = true;
          pickNewWanderTarget();
        }
      }

      // Check if user is currently viewing the top Hero / Front Page section
      const isFrontHeroPage = typeof window !== 'undefined' && window.scrollY < 400;

      // Determine active target coordinates
      let currentTargetX = mouse.x;
      let currentTargetY = mouse.y;

      if (isIdle) {
        if (isFrontHeroPage) {
          // CONDITION A: ON FRONT HERO PAGE -> ENCIRCLE THE CELESTIAL CIRCLE AROUND GAURAV
          orbitAngle += 0.016 * dt;

          const circleBox = document.getElementById('hero-portrait-circle');
          if (circleBox) {
            const rect = circleBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const radius = rect.width / 2 + (isMobile ? 6 : 10) + Math.sin(time * 0.5) * (isMobile ? 8 : 15);

            currentTargetX = centerX + Math.cos(orbitAngle) * radius;
            currentTargetY = centerY + Math.sin(orbitAngle) * radius;
          } else {
            const centerX = width > 1024 ? width * 0.72 : width * 0.5;
            const centerY = height * 0.38;
            const radius = (isMobile ? 160 : 260) + Math.sin(time * 0.5) * 15;

            currentTargetX = centerX + Math.cos(orbitAngle) * radius;
            currentTargetY = centerY + Math.sin(orbitAngle) * radius;
          }
        } else {
          // CONDITION B: ON OTHER SECTIONS -> RANDOMLY ROAM ACROSS WHOLE PAGE
          const distToWander = Math.hypot(wanderTarget.x - headX, wanderTarget.y - headY);
          wanderTarget.changeTimer += delta;

          if (distToWander < 80 || wanderTarget.changeTimer > 5.5) {
            pickNewWanderTarget();
            wanderTarget.changeTimer = 0;
          }

          currentTargetX = wanderTarget.x;
          currentTargetY = wanderTarget.y;
        }
      }

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // --- 2. UPDATE & RENDER SMALL GLOWING ORBS ---
      for (const orb of orbs) {
        if (orb.isCollected) {
          orb.respawnTimer -= delta;
          if (orb.respawnTimer <= 0) {
            orb.isCollected = false;
            const zone = ORB_ZONES[orb.zoneIdx];
            orb.percentX = zone.minX + Math.random() * (zone.maxX - zone.minX);
            orb.percentY = zone.minY + Math.random() * (zone.maxY - zone.minY);
            orb.baseX = width * orb.percentX;
            orb.baseY = height * orb.percentY;
            orb.scaleAnim = 0;
          }
        } else {
          // Animate appearance scale
          if (orb.scaleAnim < 1.0) {
            orb.scaleAnim = Math.min(1.0, orb.scaleAnim + 0.05 * dt);
          }

          // Gentle ambient floating oscillation
          orb.x = orb.baseX + Math.cos(time * 0.9 + orb.phase) * 14;
          orb.y = orb.baseY + Math.sin(time * 0.9 + orb.phase) * 14;

          const currentRadius = (orb.radius + Math.sin(time * 3.5 + orb.phase) * 0.75) * scale * orb.scaleAnim;

          // Check Collision with Worm Head
          const distToHead = Math.hypot(headX - orb.x, headY - orb.y);
          if (distToHead < (22 * scale)) {
            orb.isCollected = true;
            orb.respawnTimer = 3.0 + Math.random() * 2.0;
            energySurge = 1.0;

            // Spawn Sparkle Burst Particles (Optimized count for mobile)
            const burstCount = isMobile ? 6 : 14;
            for (let p = 0; p < burstCount; p++) {
              const pAngle = Math.random() * Math.PI * 2;
              const pSpeed = Math.random() * 3.2 + 1.2;
              particles.push({
                x: orb.x,
                y: orb.y,
                vx: Math.cos(pAngle) * pSpeed,
                vy: Math.sin(pAngle) * pSpeed,
                color: orb.color,
                size: (Math.random() * 2.2 + 1.2) * scale,
                alpha: 1.0,
                life: 0,
                maxLife: 25 + Math.random() * 15,
              });
            }

            // Spawn floating "+1" text
            floatingScores.push({
              x: orb.x,
              y: orb.y - 10,
              text: '+1',
              color: orb.color,
              alpha: 1.0,
              vy: -1.2,
            });
          }

          // Draw Glowing Orb
          if (!orb.isCollected && orb.scaleAnim > 0.05) {
            ctx.save();

            // Outer Soft Aura Halo
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, currentRadius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = orb.color;
            ctx.globalAlpha = 0.25 * orb.scaleAnim;
            if (!isMobile) {
              ctx.shadowBlur = 14 * scale;
              ctx.shadowColor = orb.glowColor;
            }
            ctx.fill();

            // Delicate Outer Dashed Orbit Ring
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, currentRadius * 3.0, 0, Math.PI * 2);
            ctx.strokeStyle = orb.color;
            ctx.lineWidth = 0.75 * scale;
            ctx.globalAlpha = 0.4 * orb.scaleAnim;
            ctx.stroke();

            // Inner Hot Solid Core
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = 0.95 * orb.scaleAnim;
            if (!isMobile) {
              ctx.shadowBlur = 8 * scale;
              ctx.shadowColor = orb.glowColor;
            }
            ctx.fill();

            ctx.restore();
          }
        }
      }

      // --- 3. RENDER PARTICLES & FLOATING SCORES ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= Math.pow(0.94, dt);
        p.vy *= Math.pow(0.94, dt);
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        if (!isMobile) {
          ctx.shadowBlur = 6 * scale;
          ctx.shadowColor = p.color;
        }
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      for (let i = floatingScores.length - 1; i >= 0; i--) {
        const fs = floatingScores[i];
        fs.y += fs.vy * dt;
        fs.alpha -= 0.025 * dt;

        ctx.save();
        ctx.font = `bold ${Math.round(11 * scale)}px monospace`;
        ctx.fillStyle = fs.color;
        ctx.globalAlpha = Math.max(0, fs.alpha);
        if (!isMobile) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = fs.color;
        }
        ctx.fillText(fs.text, fs.x - 6, fs.y);
        ctx.restore();

        if (fs.alpha <= 0) {
          floatingScores.splice(i, 1);
        }
      }

      // --- 4. KINEMATICS & WORM UPDATE ---
      const dx = currentTargetX - headX;
      const dy = currentTargetY - headY;
      const dist = Math.hypot(dx, dy);

      const ARRIVAL_DEADZONE = isMobile ? 18 : 24;
      const isArrived = !isIdle && dist <= ARRIVAL_DEADZONE;

      // Check if worm reaches near the mouse pointer — Invisible trigger halo centered on HEAD only
      const distHeadToMouse = Math.hypot(headX - mouse.x, headY - mouse.y);
      const HEAD_TOUCH_RADIUS = isMobile ? 26 : 38;
      const isTouchingMouse = isMouseInside && !isIdle && distHeadToMouse <= HEAD_TOUCH_RADIUS;

      // Smoothly surge or fade the rainbow light effect
      if (isTouchingMouse) {
        rainbowIntensity += (1 - rainbowIntensity) * Math.min(1, 0.15 * dt); // Fast rainbow ignition
        
        // Spawn chromatic rainbow sparkle stardust on mouse contact (capped on mobile)
        if (Math.random() < (isMobile ? 0.12 : 0.32) * dt && particles.length < (isMobile ? 12 : 45)) {
          const pAngle = Math.random() * Math.PI * 2;
          const pSpeed = Math.random() * 2.2 + 0.8;
          const pHue = (time * 180 + Math.random() * 60) % 360;
          particles.push({
            x: headX + (Math.random() - 0.5) * 16,
            y: headY + (Math.random() - 0.5) * 16,
            vx: Math.cos(pAngle) * pSpeed,
            vy: Math.sin(pAngle) * pSpeed - 0.5,
            color: `hsl(${pHue}, 100%, 72%)`,
            size: (Math.random() * 2.2 + 1.0) * scale,
            alpha: 0.95,
            life: 0,
            maxLife: 22 + Math.random() * 12,
          });
        }
      } else {
        rainbowIntensity += (0 - rainbowIntensity) * Math.min(1, 0.035 * dt); // Gentle trailing dissipation
      }

      if (isArrived) {
        wagIntensity += (1 - wagIntensity) * Math.min(1, 0.06 * dt);
      } else {
        wagIntensity += (0 - wagIntensity) * Math.min(1, 0.12 * dt);
      }

      if (isIdle) {
        const targetAngle = Math.atan2(dy, dx);
        const angleDiff = getShortestAngle(headAngle, targetAngle);
        headAngle += angleDiff * Math.min(1, 0.07 * dt);

        const targetSpeed = Math.min(dist * 0.05, isMobile ? 3.0 : 4.4);
        speed += (targetSpeed - speed) * Math.min(1, 0.1 * dt);

        const wave = Math.sin(time * 2.8) * (isMobile ? 1.6 : 2.5);
        headX += (Math.cos(headAngle) * speed + Math.cos(headAngle + Math.PI / 2) * wave) * dt;
        headY += (Math.sin(headAngle) * speed + Math.sin(headAngle + Math.PI / 2) * wave) * dt;
      } else {
        if (!isArrived) {
          const targetAngle = Math.atan2(dy, dx);
          const angleDiff = getShortestAngle(headAngle, targetAngle);
          headAngle += angleDiff * Math.min(1, 0.08 * dt);

          const targetSpeed = Math.min((dist - ARRIVAL_DEADZONE) * 0.065, isMobile ? 3.8 : 5.2);
          speed += (targetSpeed - speed) * Math.min(1, 0.12 * dt);

          const waveDamping = Math.min(1, Math.max(0, (dist - ARRIVAL_DEADZONE) / 35));
          const wave = Math.sin(time * 3.4) * ((isMobile ? 1.8 : 2.8) * waveDamping);

          headX += (Math.cos(headAngle) * speed + Math.cos(headAngle + Math.PI / 2) * wave) * dt;
          headY += (Math.sin(headAngle) * speed + Math.sin(headAngle + Math.PI / 2) * wave) * dt;
        } else {
          speed = 0;
        }
      }

      segments[0].x = headX;
      segments[0].y = headY;
      segments[0].angle = headAngle;

      // Inverse Kinematics with Responsive Tail Wagging
      const STABLE_UPPER_SEGMENTS = isMobile ? 8 : 12;

      for (let i = 1; i < activeNumSegments; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const segDx = prev.x - curr.x;
        const segDy = prev.y - curr.y;
        let segAngle = Math.atan2(segDy, segDx);

        if (wagIntensity > 0.01 && i > STABLE_UPPER_SEGMENTS) {
          const tailProgress = (i - STABLE_UPPER_SEGMENTS) / (activeNumSegments - STABLE_UPPER_SEGMENTS);
          const wagWave = Math.sin(time * 3.8 - i * 0.25);
          const wagAmplitude = Math.pow(tailProgress, 1.6) * 0.38 * wagIntensity;
          segAngle += wagWave * wagAmplitude;
        }

        curr.angle = segAngle;
        curr.x = prev.x - Math.cos(segAngle) * activeSegmentLength;
        curr.y = prev.y - Math.sin(segAngle) * activeSegmentLength;
      }

      // --- 5. RENDER CYBERNETIC BIOLUMINESCENT CREATURE ---
      ctx.save();
      ctx.globalAlpha = 0.95;

      const baseTheme = isIdle ? 'magenta' : 'cyan';

      // --- STAGE 1: DYNAMIC PER-SEGMENT SPINAL CORD ---
      for (let i = 1; i < activeNumSegments; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        // Wave phase + Energy Surge Ripple
        const wavePhase = (time * 1.4 - i * 0.18) % (Math.PI * 2);
        let pulse = Math.pow((Math.sin(wavePhase) + 1) / 2, 3.5);
        if (energySurge > 0) {
          pulse = Math.min(1.0, pulse + energySurge * 0.6);
        }

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);

        if (rainbowIntensity > 0.02) {
          const rainbowHue = (time * 160 - i * 9) % 360;
          const alpha = 0.4 + pulse * 0.6;
          ctx.strokeStyle = `hsla(${rainbowHue}, 100%, ${55 + pulse * 35}%, ${alpha})`;
          ctx.lineWidth = (1.6 + pulse * 2.2) * scale;
          if (!isMobile) {
            ctx.shadowBlur = (4 + pulse * 18) * scale;
            ctx.shadowColor = `hsl(${rainbowHue}, 100%, 65%)`;
          }
        } else if (baseTheme === 'cyan') {
          const r = Math.round(10 + pulse * 245);
          const g = Math.round(110 + pulse * 145);
          const b = Math.round(160 + pulse * 95);
          const alpha = 0.35 + pulse * 0.65;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = (1.4 + pulse * 1.8) * scale;
          if (!isMobile) {
            ctx.shadowBlur = (2 + pulse * 14) * scale;
            ctx.shadowColor = '#00F5FF';
          }
        } else {
          const r = Math.round(120 + pulse * 135);
          const g = Math.round(60 + pulse * 120);
          const b = Math.round(200 + pulse * 55);
          const alpha = 0.35 + pulse * 0.65;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = (1.4 + pulse * 1.8) * scale;
          if (!isMobile) {
            ctx.shadowBlur = (2 + pulse * 14) * scale;
            ctx.shadowColor = '#C084FC';
          }
        }

        ctx.stroke();
      }

      // --- STAGE 2: VERTEBRAE RIBS & GLOWING PHOTOPHORES ---
      for (let i = activeNumSegments - 1; i >= 0; i--) {
        const seg = segments[i];
        const progress = i / activeNumSegments;

        const wavePhase = (time * 1.4 - i * 0.18) % (Math.PI * 2);
        let pulse = Math.pow((Math.sin(wavePhase) + 1) / 2, 3.5);
        if (energySurge > 0) {
          pulse = Math.min(1.0, pulse + energySurge * 0.6);
        }

        const ribSpan = (Math.sin(progress * Math.PI) * 18.4 + 2.0) * scale;
        const ribThickness = (Math.max(0.8, (1 - progress) * 1.6) + pulse * 0.65) * scale;

        const perpAngle = seg.angle + Math.PI / 2;
        const ribCos = Math.cos(perpAngle);
        const ribSin = Math.sin(perpAngle);

        const leftX = seg.x + ribCos * ribSpan;
        const leftY = seg.y + ribSin * ribSpan;
        const rightX = seg.x - ribCos * ribSpan;
        const rightY = seg.y - ribSin * ribSpan;

        // Draw Rib Bone
        ctx.beginPath();
        ctx.moveTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);

        if (rainbowIntensity > 0.02) {
          const ribHue = (time * 160 - i * 9) % 360;
          ctx.strokeStyle = `hsla(${ribHue}, 100%, ${60 + pulse * 30}%, ${0.35 + pulse * 0.65})`;
          if (!isMobile) {
            ctx.shadowBlur = (3 + pulse * 12) * scale;
            ctx.shadowColor = `hsl(${ribHue}, 100%, 65%)`;
          }
        } else if (baseTheme === 'cyan') {
          ctx.strokeStyle = `rgba(${Math.round(100 + pulse * 155)}, ${Math.round(160 + pulse * 95)}, 255, ${0.25 + pulse * 0.75})`;
          if (!isMobile) {
            ctx.shadowBlur = pulse * 9 * scale;
            ctx.shadowColor = '#00F5FF';
          }
        } else {
          ctx.strokeStyle = `rgba(${Math.round(180 + pulse * 75)}, ${Math.round(120 + pulse * 135)}, 255, ${0.25 + pulse * 0.75})`;
          if (!isMobile) {
            ctx.shadowBlur = pulse * 9 * scale;
            ctx.shadowColor = '#C084FC';
          }
        }

        ctx.lineWidth = ribThickness;
        ctx.stroke();

        // Bioluminescent Photophore Pods on Rib Tips
        if (i % 2 === 0 && i < activeNumSegments - 2) {
          const dotRadius = (1.1 + pulse * 1.4) * (1 - progress * 0.4) * scale;
          const tipHue = (time * 160 - i * 9 + 40) % 360;

          // Left Dot
          ctx.beginPath();
          ctx.arc(leftX, leftY, dotRadius, 0, Math.PI * 2);
          if (rainbowIntensity > 0.02) {
            ctx.fillStyle = pulse > 0.6 ? '#FFFFFF' : `hsla(${tipHue}, 100%, 70%, ${0.6 + pulse * 0.4})`;
            if (!isMobile) {
              ctx.shadowBlur = (4 + pulse * 14) * scale;
              ctx.shadowColor = `hsl(${tipHue}, 100%, 65%)`;
            }
          } else {
            ctx.fillStyle = pulse > 0.6
              ? '#FFFFFF'
              : baseTheme === 'cyan'
              ? `rgba(6, 182, 212, ${0.3 + pulse * 0.7})`
              : `rgba(217, 70, 239, ${0.3 + pulse * 0.7})`;
            if (!isMobile) {
              ctx.shadowBlur = pulse * 10 * scale;
              ctx.shadowColor = baseTheme === 'cyan' ? '#00F5FF' : '#F472B6';
            }
          }
          ctx.fill();

          // Right Dot
          ctx.beginPath();
          ctx.arc(rightX, rightY, dotRadius, 0, Math.PI * 2);
          if (rainbowIntensity > 0.02) {
            ctx.fillStyle = pulse > 0.6 ? '#FFFFFF' : `hsla(${tipHue}, 100%, 70%, ${0.6 + pulse * 0.4})`;
            if (!isMobile) {
              ctx.shadowBlur = (4 + pulse * 14) * scale;
              ctx.shadowColor = `hsl(${tipHue}, 100%, 65%)`;
            }
          } else {
            ctx.fillStyle = pulse > 0.6
              ? '#FFFFFF'
              : baseTheme === 'cyan'
              ? `rgba(6, 182, 212, ${0.3 + pulse * 0.7})`
              : `rgba(217, 70, 239, ${0.3 + pulse * 0.7})`;
            if (!isMobile) {
              ctx.shadowBlur = pulse * 10 * scale;
              ctx.shadowColor = baseTheme === 'cyan' ? '#00F5FF' : '#F472B6';
            }
          }
          ctx.fill();
        }

        // Central Vertebra Joint Nodule
        const jointRadius = (Math.max(1.4, (1 - progress) * 3.0) + pulse * 0.95) * scale;
        const jointHue = (time * 160 - i * 9) % 360;
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, jointRadius, 0, Math.PI * 2);
        if (rainbowIntensity > 0.02) {
          ctx.fillStyle = i === 0
            ? '#FFFFFF'
            : pulse > 0.65
            ? '#FFFFFF'
            : `hsla(${jointHue}, 100%, 80%, ${0.6 + pulse * 0.4})`;
          if (!isMobile) {
            ctx.shadowBlur = (4 + pulse * 14) * scale;
            ctx.shadowColor = `hsl(${jointHue}, 100%, 65%)`;
          }
        } else {
          ctx.fillStyle = i === 0
            ? '#FFFFFF'
            : pulse > 0.65
            ? '#FFFFFF'
            : baseTheme === 'cyan'
            ? `rgba(186, 230, 253, ${0.4 + pulse * 0.6})`
            : `rgba(245, 208, 254, ${0.4 + pulse * 0.6})`;
          if (!isMobile) {
            ctx.shadowBlur = pulse * 10 * scale;
            ctx.shadowColor = baseTheme === 'cyan' ? '#00F5FF' : '#C084FC';
          }
        }
        ctx.fill();
      }

      // --- STAGE 3: SLEEK GEOMETRIC SKULL HEAD ---
      const head = segments[0];

      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);
      ctx.scale(scale, scale);

      const headPulse = (Math.sin(time * 1.4) + 1) / 2;
      const headHue = (time * 160) % 360;
      const skullGlow = rainbowIntensity > 0.02
        ? `hsl(${headHue}, 100%, 65%)`
        : (baseTheme === 'cyan' ? '#00F5FF' : '#C084FC');

      // Skull Outer Shell
      ctx.beginPath();
      ctx.moveTo(10.4, 0);
      ctx.lineTo(2.4, 6.4);
      ctx.lineTo(-4, 4.8);
      ctx.lineTo(-4, -4.8);
      ctx.lineTo(2.4, -6.4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = skullGlow;
      ctx.lineWidth = 1.6;
      if (!isMobile) {
        ctx.shadowBlur = 8 + headPulse * 5;
        ctx.shadowColor = skullGlow;
      }
      ctx.fill();
      ctx.stroke();

      // Glowing Dual Eyes
      ctx.beginPath();
      ctx.arc(2.0, -2.5, 1.6, 0, Math.PI * 2);
      ctx.arc(2.0, 2.5, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      if (!isMobile) {
        ctx.shadowBlur = 8 + headPulse * 5;
        ctx.shadowColor = skullGlow;
      }
      ctx.fill();

      // Sleek Fixed Front Mandibles
      ctx.beginPath();
      ctx.moveTo(6.4, -2.8);
      ctx.lineTo(12.8, -5.2);
      ctx.moveTo(6.4, 2.8);
      ctx.lineTo(12.8, 5.2);
      ctx.strokeStyle = skullGlow;
      ctx.lineWidth = 1.3;
      if (!isMobile) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = skullGlow;
      }
      ctx.stroke();

      ctx.restore();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-90 mix-blend-screen"
    />
  );
};
