'use client';

import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-32 pb-0 z-10">
      
      {/* 1. Deep Abyssal Midnight Blue Semicircular Dome (Center anchored on TOP EDGE, opacity reduced by 20% more) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] sm:w-[1400px] lg:w-[1700px] h-[1100px] sm:h-[1400px] lg:h-[1700px] rounded-full pointer-events-none -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(14, 32, 68, 0.65) 0%, rgba(10, 24, 52, 0.42) 35%, rgba(6, 16, 36, 0.18) 62%, transparent 85%)',
        }}
      />
      {/* Secondary Inner Core at Top Center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full pointer-events-none -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(18, 42, 88, 0.45) 0%, rgba(12, 28, 60, 0.22) 45%, transparent 75%)',
        }}
      />

      {/* 3. Volumetric Deep Indigo / Purple Ambient Lighting (Right & Behind Portrait) */}
      <div className="absolute top-[20%] -right-[10%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-radial from-purple-600/28 via-[#1E1B4B]/25 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[10%] w-[480px] h-[480px] rounded-full bg-gradient-radial from-violet-600/22 via-transparent to-transparent blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full flex items-end">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 lg:gap-10 w-full">
          
          {/* Left Side: Editorial Typography & Actions */}
          <div
            id="hero-title-area"
            className="w-full md:w-[54%] space-y-6 sm:space-y-7 text-left relative z-10 translate-y-0 md:-translate-y-6 lg:-translate-y-8 pb-4 md:pb-4"
          >
            
            {/* Eyebrow */}
            <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-purple-300 uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping inline-block" />
              <span>Digital Experiences That Inspire</span>
            </div>

            {/* Massive Condensed Headline */}
            <div className="space-y-0">
              <h1 className="font-display text-6xl sm:text-8xl lg:text-[115px] font-normal text-white uppercase tracking-tight leading-[0.88] select-none">
                DIGITAL <br />
                DESIGNER
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-lg font-sans">
              I design elegant, high-performing 3D spatial experiences, generative AI pipelines, and digital products that merge strategy, aesthetics, and technology.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-white/[0.07] hover:bg-white/[0.15] text-white text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all hover:scale-105 active:scale-95 group"
              >
                <span>Download Resume</span>
                <ArrowDown className="w-4 h-4 text-gray-300 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

          </div>

          {/* Right Side: Portrait with Editorial Celestial Astrolabe & Responsive Layout (46% width) */}
          <div className="w-full md:w-[46%] flex justify-center md:justify-end relative items-end pt-6 md:pt-0">
            
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[450px] flex flex-col items-center justify-end">
              
              {/* --- MULTI-LAYERED EDITORIAL GEOMETRY & BACKLIGHT HALO --- */}
              <div
                id="hero-portrait-circle"
                className="absolute top-[28%] left-[50%] md:left-[54%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
              >
                
                {/* 1. Outer Delicate Dashed Orbital Ring */}
                <div className="w-[340px] sm:w-[450px] md:w-[530px] lg:w-[570px] h-[340px] sm:h-[450px] md:h-[530px] lg:h-[570px] rounded-full border border-dashed border-white/15 animate-[spin_120s_linear_infinite]" />
                
                {/* 2. Inner Solid Architectural Orbit */}
                <div className="absolute inset-4 sm:inset-5 rounded-full border border-white/20" />
                
                {/* 3. Soft Glowing Core Aperture Disc */}
                <div className="absolute inset-12 sm:inset-16 rounded-full bg-gradient-radial from-white/[0.04] via-transparent to-transparent" />

                {/* 4. Fine Spatial Crosshairs & Micro Telemetry */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                  + 01 // SPATIAL
                </div>
                <div className="absolute top-1/2 -right-3 sm:-right-4 -translate-y-1/2 text-[8px] sm:text-[9px] font-mono text-purple-300/70 tracking-widest uppercase">
                  360°
                </div>
                <div className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 text-[8px] sm:text-[9px] font-mono text-cyan-300/70 tracking-widest uppercase">
                  DEPTH
                </div>

                {/* 5. Luminous Celestial Star Sparkle ✦ */}
                <div className="absolute top-[6%] right-[8%] text-white text-xl sm:text-2xl animate-pulse drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
                  ✦
                </div>
              </div>

              {/* Seamless Cutout Portrait with Split-Toned Deep Blue Atmospheric Wash */}
              <div className="relative z-10 w-full flex justify-center items-end">
                {(() => {
                  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
                  const portraitUrl = `${basePath}/images/gaurav_portrait.png`;
                  return (
                    <>
                      {/* 1. Base Portrait Image */}
                      <img
                        src={portraitUrl}
                        alt="Gaurav Roy — Digital Designer Portrait"
                        className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] h-auto object-contain block drop-shadow-[0_0_35px_rgba(14,165,233,0.18)] drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] translate-y-7 sm:translate-y-10 md:translate-y-14 transition-all duration-500 hover:brightness-105"
                        style={{
                          filter: 'grayscale(22%) contrast(114%) brightness(97%)',
                        }}
                      />

                      {/* 2. Delicate Deep Oceanic Blue Tint Wash Masked Directly to Portrait Silhouette */}
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-65 translate-y-7 sm:translate-y-10 md:translate-y-14"
                        style={{
                          background: 'linear-gradient(135deg, rgba(14,165,233,0.2) 0%, rgba(30,58,138,0.45) 50%, rgba(15,23,42,0.6) 100%)',
                          WebkitMaskImage: `url(${portraitUrl})`,
                          WebkitMaskSize: 'contain',
                          WebkitMaskPosition: 'bottom center',
                          WebkitMaskRepeat: 'no-repeat',
                          maskImage: `url(${portraitUrl})`,
                          maskSize: 'contain',
                          maskPosition: 'bottom center',
                          maskRepeat: 'no-repeat',
                        }}
                      />
                    </>
                  );
                })()}
              </div>

              {/* Floating Minimal Badge Beside Torso */}
              <div className="absolute bottom-10 right-1 sm:bottom-14 sm:right-2 md:bottom-18 md:-right-6 z-20 luxury-card rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl text-right border border-white/20 backdrop-blur-md">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-300 uppercase block font-semibold">
                  Available for
                </span>
                <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wider uppercase block">
                  Freelance
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-purple-300 uppercase flex items-center justify-end gap-1 mt-0.5 font-bold">
                  Projects <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-300" />
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
