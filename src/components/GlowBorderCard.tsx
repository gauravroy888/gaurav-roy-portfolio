'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GlowBorderCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  roundedClassName?: string;
  borderRadius?: number;
}

// Function to calculate exact (x, y) coordinates at arc-length distance `s` along a rounded rect
function getPointAtPerimeter(s: number, W: number, H: number, R: number): { x: number; y: number } {
  const L_top = W - 2 * R;
  const L_arc = (Math.PI / 2) * R;
  const L_side = H - 2 * R;
  const P = 2 * L_top + 2 * L_side + 4 * L_arc;

  // Wrap distance within [0, P)
  let d = ((s % P) + P) % P;

  // 1. Top Edge: (R, 0) -> (W - R, 0)
  if (d < L_top) {
    return { x: R + d, y: 0 };
  }
  d -= L_top;

  // 2. Top-Right Arc: Center (W - R, R), angle -PI/2 -> 0
  if (d < L_arc) {
    const angle = -Math.PI / 2 + (d / L_arc) * (Math.PI / 2);
    return { x: W - R + Math.cos(angle) * R, y: R + Math.sin(angle) * R };
  }
  d -= L_arc;

  // 3. Right Edge: (W, R) -> (W, H - R)
  if (d < L_side) {
    return { x: W, y: R + d };
  }
  d -= L_side;

  // 4. Bottom-Right Arc: Center (W - R, H - R), angle 0 -> PI/2
  if (d < L_arc) {
    const angle = 0 + (d / L_arc) * (Math.PI / 2);
    return { x: W - R + Math.cos(angle) * R, y: H - R + Math.sin(angle) * R };
  }
  d -= L_arc;

  // 5. Bottom Edge: (W - R, H) -> (R, H)
  if (d < L_top) {
    return { x: W - R - d, y: H };
  }
  d -= L_top;

  // 6. Bottom-Left Arc: Center (R, H - R), angle PI/2 -> PI
  if (d < L_arc) {
    const angle = Math.PI / 2 + (d / L_arc) * (Math.PI / 2);
    return { x: R + Math.cos(angle) * R, y: H - R + Math.sin(angle) * R };
  }
  d -= L_arc;

  // 7. Left Edge: (0, H - R) -> (0, R)
  if (d < L_side) {
    return { x: 0, y: H - R - d };
  }
  d -= L_side;

  // 8. Top-Left Arc: Center (R, R), angle PI -> 3*PI/2
  const angle = Math.PI + (d / L_arc) * (Math.PI / 2);
  return { x: R + Math.cos(angle) * R, y: R + Math.sin(angle) * R };
}

export const GlowBorderCard: React.FC<GlowBorderCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  roundedClassName = 'rounded-3xl',
  borderRadius = 24,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let currentDistance = 0;
    let hoverAlpha = 0;
    let lastTime = performance.now();

    // Constant Linear Velocity: exactly 220 pixels per second around the perimeter
    const PIXELS_PER_SECOND = 220;
    const LINE_LENGTH = 260; // Exact fixed line length in pixels
    const NUM_SEGMENTS = 36; // Granular resolution for smooth line rendering

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smoothly fade in on hover, fade out on leave
      if (isHovered) {
        hoverAlpha += (1 - hoverAlpha) * 0.1;
      } else {
        hoverAlpha += (0 - hoverAlpha) * 0.08;
      }

      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const R = Math.min(borderRadius, W / 2, H / 2);

      // Match canvas size to display size for sharp rendering
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, W, H);

      if (hoverAlpha > 0.01 && W > 0 && H > 0) {
        // Advance distance by exact physical pixel velocity
        currentDistance += PIXELS_PER_SECOND * dt;

        // Draw the 260px subtle purple line with symmetrical sine-wave tapering
        for (let i = 0; i < NUM_SEGMENTS; i++) {
          const t1 = i / NUM_SEGMENTS;
          const t2 = (i + 1) / NUM_SEGMENTS;

          const s1 = currentDistance + t1 * LINE_LENGTH;
          const s2 = currentDistance + t2 * LINE_LENGTH;

          const p1 = getPointAtPerimeter(s1, W, H, R);
          const p2 = getPointAtPerimeter(s2, W, H, R);

          // Symmetrical alpha curve: 0 at start, peak at 50% center, 0 at end
          const midT = (t1 + t2) / 2;
          const segmentAlpha = Math.sin(midT * Math.PI) * 0.85 * hoverAlpha;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(192, 132, 252, ${segmentAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isHovered, borderRadius]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative ${roundedClassName} ${className}`}
    >
      {/* 1. Main Card Surface */}
      <div
        className={`relative z-10 w-full h-full bg-[#0E111D]/60 backdrop-blur-2xl border border-white/[0.1] hover:border-white/[0.18] shadow-2xl transition-all duration-500 ${roundedClassName} ${innerClassName}`}
      >
        {children}
      </div>

      {/* 2. 100% Constant-Speed 1px Subtle Purple Perimeter Line */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-20"
        style={{ borderRadius: `${borderRadius}px` }}
      />
    </div>
  );
};
