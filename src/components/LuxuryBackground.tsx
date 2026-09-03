'use client';

import React, { useEffect, useState } from 'react';
import { SkeletalWorm } from './SkeletalWorm';
import { DeepSeaAtmosphere } from './DeepSeaAtmosphere';

export const LuxuryBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

      {/* 3. Top-Right Deep Ocean Hydrothermal Spotlight */}
      <div className="absolute -top-10 right-[5%] w-[850px] h-[850px] rounded-full bg-gradient-radial from-[#1E4A78]/35 via-[#0E284A]/15 to-transparent blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* 3. Top-Left Bioluminescent Ambient Atmosphere */}
      <div className="absolute top-10 -left-20 w-[700px] h-[700px] rounded-full bg-gradient-radial from-[#1A2644]/35 via-[#0D152A]/15 to-transparent blur-[130px] pointer-events-none" />

      {/* 4. Center Work Section Ambient Abyssal Depth */}
      <div className="absolute top-[38%] right-[15%] w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#17253D]/30 via-[#0B1424]/10 to-transparent blur-[140px] pointer-events-none" />

      {/* 5. Lower Capabilities Cyan-Ultraviolet Ambient Glow */}
      <div className="absolute top-[65%] -left-24 w-[750px] h-[750px] rounded-full bg-gradient-radial from-[#1E2548]/30 via-transparent to-transparent blur-[150px] pointer-events-none" />

      {/* 6. Geometric Spatial Coordinate Rings */}
      <div className="absolute top-20 right-[15%] w-[420px] h-[420px] rounded-full border border-cyan-400/[0.05] pointer-events-none" />
      <div className="absolute top-10 right-[10%] w-[580px] h-[580px] rounded-full border border-cyan-400/[0.03] pointer-events-none" />
      <div className="absolute top-0 right-[5%] w-[740px] h-[740px] rounded-full border border-cyan-400/[0.02] pointer-events-none" />

      {/* 7. Deep-Sea Atmosphere: Caustics, Bathymetric Depth Contours & Floating Marine Snow */}
      <DeepSeaAtmosphere />

      {/* 8. Interactive Bioluminescent Skeletal Worm */}
      <SkeletalWorm />

      {/* 9. Smooth Mouse-Tracking Dynamic Aqua Spotlight Glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-gradient-radial from-cyan-400/[0.04] via-indigo-500/[0.02] to-transparent blur-[90px] transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePos.x}vw, ${mousePos.y}vh) translate(-50%, -50%)`,
        }}
      />

      {/* 10. Fine Spatial Blueprint Texture */}
      <div className="absolute inset-0 bg-spatial-grid opacity-50 pointer-events-none" />

      {/* 11. Oceanic Vignette Falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060810]/20 to-[#060810]/80 pointer-events-none" />

    </div>
  );
};
