'use client';

import React, { useEffect, useRef } from 'react';

export const DeepSeaAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    // Floating Bioluminescent Marine Snow / Plankton (Stratified across screen grid, optimized for mobile)
    const COLS = isMobile ? 4 : 7;
    const ROWS = isMobile ? 3 : 6;
    const NUM_PLANKTON = COLS * ROWS;
    
    interface Plankton {
      percentX: number;
      percentY: number;
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      colorType: 'cyan' | 'magenta';
    }

    const planktonList: Plankton[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const px = (c + 0.15 + Math.random() * 0.7) / COLS;
        const py = (r + 0.15 + Math.random() * 0.7) / ROWS;
        planktonList.push({
          percentX: px,
          percentY: py,
          x: px * width,
          y: py * height,
          radius: (Math.random() * 1.6 + 0.6) * (isMobile ? 0.85 : 1.0),
          speedY: -(Math.random() * 0.35 + 0.15),
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulsePhase: Math.random() * Math.PI * 2,
          colorType: Math.random() > 0.35 ? 'cyan' : 'magenta',
        });
      }
    }

    const handleResize = () => {
      if (!canvas) return;
      const oldW = width || window.innerWidth;
      const oldH = height || window.innerHeight;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      for (const p of planktonList) {
        p.x = (p.x / oldW) * width;
        p.y = (p.y / oldH) * height;
      }
    };

    let isTabHidden = false;
    let lastTime = performance.now();

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      if (!isTabHidden) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let time = 0;

    const render = () => {
      if (isTabHidden) return;
      const now = performance.now();
      const rawDelta = (now - lastTime) / 1000;
      lastTime = now;

      // Framerate-independent normalized delta time factor (dt = 1.0 at standard 60 FPS)
      const delta = Math.min(Math.max(rawDelta, 0.001), 0.1);
      const dt = delta * 60;

      time += 0.02 * dt;
      ctx.clearRect(0, 0, width, height);

      // Render Floating Marine Snow & Micro-Plankton
      for (const p of planktonList) {
        p.y += p.speedY * dt;
        p.x += (p.speedX + Math.sin(time + p.pulsePhase) * 0.25) * dt;

        // Wrap around viewport edges
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentPulse = (Math.sin(time * 2 + p.pulsePhase) + 1) / 2;
        const alpha = p.opacity * (0.6 + currentPulse * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + currentPulse * 0.5, 0, Math.PI * 2);

        if (p.colorType === 'cyan') {
          ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
          if (!isMobile) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 245, 255, 0.6)';
          }
        } else {
          ctx.fillStyle = `rgba(192, 132, 252, ${alpha})`;
          if (!isMobile) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(192, 132, 252, 0.6)';
          }
        }

        ctx.fill();
        if (!isMobile) {
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 1. Subtle Underwater Caustic Light Rays (God Rays filtering through abyssal depths) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div
          className="absolute -top-[20%] left-[10%] w-[500px] h-[140%] bg-gradient-to-b from-cyan-400/[0.08] via-blue-500/[0.03] to-transparent blur-[80px] -rotate-[24deg] transform-gpu"
        />
        <div
          className="absolute -top-[30%] right-[20%] w-[450px] h-[150%] bg-gradient-to-b from-indigo-400/[0.06] via-cyan-500/[0.02] to-transparent blur-[90px] -rotate-[18deg] transform-gpu"
        />
      </div>

      {/* 2. Deep-Sea Bathymetric Depth Topography Contours & Oceanic Telemetry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {/* Top-Right Bathymetric Trench Contours */}
        <svg
          className="absolute top-12 right-0 w-[600px] h-[600px] text-cyan-400/[0.08]"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100,0 C250,120 400,80 600,200"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M50,100 C220,240 380,190 600,340"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M0,220 C180,360 340,310 600,480"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <path
            d="M0,360 C150,500 320,440 600,600"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>

        {/* Bottom-Left Abyssal Trench Contours */}
        <svg
          className="absolute bottom-10 -left-10 w-[700px] h-[700px] text-purple-400/[0.06]"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 C200,200 400,350 700,150"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0,450 C220,360 450,520 700,320"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="5 7"
          />
          <path
            d="M0,600 C250,520 500,680 700,500"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>

        {/* Minimal Deep-Sea HUD Telemetry Tags (Clean, luxury glassmorphic style) */}
        <div className="absolute top-28 right-8 font-mono text-[10px] tracking-[0.25em] text-cyan-300/75 uppercase space-y-1 select-none hidden lg:block">
          <div>// DEPTH: 4,820M • ABYSSAL ZONE</div>
          <div>// SALINITY: 34.8 PSU • WATERFLOW: 0.12 M/S</div>
          <div>// BIOLUMINESCENCE SENSORS: ACTIVE</div>
        </div>

        <div className="absolute bottom-24 left-8 font-mono text-[10px] tracking-[0.25em] text-purple-300/75 uppercase space-y-1 select-none hidden lg:block">
          <div>// SECTOR: MARIANA HADAL TRENCH</div>
          <div>// BATHYMETRY MAPPING: 100% CALIBRATED</div>
        </div>
      </div>

      {/* 3. Floating Bioluminescent Plankton & Marine Snow Particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
      />
    </>
  );
};
