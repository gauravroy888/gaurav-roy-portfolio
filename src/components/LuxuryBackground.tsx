'use client';

import React, { useEffect, useRef } from 'react';
// import { SkeletalWorm } from './SkeletalWorm'; // Kept in backup for future use
import { DeepSeaAtmosphere } from './DeepSeaAtmosphere';

export const LuxuryBackground: React.FC = () => {
  const mouseGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (mouseGlowRef.current) {
          mouseGlowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060810]">
      
      {/* 1. Deep Abyssal Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081525] via-[#060A14] to-[#04060A] opacity-95" />

      {/* 2. Deep Abyssal Midnight Blue Semicircle Dome (Center anchored on TOP EDGE, reduced opacity) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] sm:w-[1600px] h-[1200px] sm:h-[1600px] rounded-full pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(14, 30, 64, 0.55) 0%, rgba(10, 22, 48, 0.35) 35%, rgba(6, 14, 32, 0.15) 62%, transparent 85%)',
        }}
      />

      {/* 3. Deep Ocean Ambient Spotlights (Optimized: native soft radial gradients with zero heavy blur convolution) */}
      <div
        className="hidden md:block absolute -top-10 right-[5%] w-[850px] h-[850px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(30, 74, 120, 0.30) 0%, rgba(14, 40, 74, 0.12) 45%, transparent 72%)',
        }}
      />
      <div
        className="hidden md:block absolute top-10 -left-20 w-[700px] h-[700px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(26, 38, 68, 0.30) 0%, rgba(13, 21, 42, 0.12) 45%, transparent 72%)',
        }}
      />
      <div
        className="hidden md:block absolute top-[38%] right-[15%] w-[800px] h-[800px] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(23, 37, 61, 0.25) 0%, rgba(11, 20, 36, 0.10) 45%, transparent 72%)',
        }}
      />
      <div
        className="hidden md:block absolute top-[65%] -left-24 w-[750px] h-[750px] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(30, 37, 72, 0.25) 0%, transparent 68%)',
        }}
      />

      {/* 3b. Ultra-lightweight static glow for mobile (zero blur filter cost) */}
      <div className="block md:hidden absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-[#142848]/20 via-transparent to-transparent pointer-events-none" />

      {/* 6. Geometric Spatial Coordinate Rings */}
      <div className="absolute top-20 right-[15%] w-[420px] h-[420px] rounded-full border border-cyan-400/[0.05] pointer-events-none" />
      <div className="absolute top-10 right-[10%] w-[580px] h-[580px] rounded-full border border-cyan-400/[0.03] pointer-events-none" />
      <div className="absolute top-0 right-[5%] w-[740px] h-[740px] rounded-full border border-cyan-400/[0.02] pointer-events-none" />

      {/* 7. Deep-Sea Atmosphere: Caustics, Bathymetric Depth Contours & Floating Marine Snow */}
      <DeepSeaAtmosphere />

      {/* 8. Interactive Bioluminescent Skeletal Worm (Archived in backup: src/components/SkeletalWorm.tsx) */}
      {/* <SkeletalWorm /> */}

      {/* 9. Smooth Mouse-Tracking Dynamic Aqua Spotlight Glow (Direct hardware transform, zero React re-renders) */}
      <div
        ref={mouseGlowRef}
        className="hidden md:block absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-50 will-change-transform"
        style={{
          top: 0,
          left: 0,
          transform: 'translate3d(50vw, 30vh, 0) translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)',
        }}
      />

      {/* 10. Fine Spatial Blueprint Texture */}
      <div className="absolute inset-0 bg-spatial-grid opacity-50 pointer-events-none" />

      {/* 11. Oceanic Vignette Falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060810]/20 to-[#060810]/80 pointer-events-none" />

    </div>
  );
};
