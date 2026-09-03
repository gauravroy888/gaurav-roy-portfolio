'use client';

import React from 'react';
import { CLIENTS } from '../data/portfolioData';
import { Building2, Sparkles } from 'lucide-react';
import { GlowBorderCard } from './GlowBorderCard';

export const CompanyLogosSection: React.FC = () => {
  // Rich styling and typography for brand logos
  const logoStyles: Record<string, { font: string; tracking: string; style: string }> = {
    Kohler: { font: 'font-display font-black', tracking: 'tracking-[0.25em]', style: 'text-white' },
    Panasonic: { font: 'font-sans font-extrabold', tracking: 'tracking-tight', style: 'text-white' },
    TATA: { font: 'font-serif font-black', tracking: 'tracking-[0.3em]', style: 'text-cyan-300' },
    JBL: { font: 'font-display font-black', tracking: 'tracking-wider', style: 'text-white' },
    Hindware: { font: 'font-sans font-bold', tracking: 'tracking-tight lowercase', style: 'text-purple-300' },
    Biocon: { font: 'font-sans font-black', tracking: 'tracking-wide', style: 'text-white' },
    GITAM: { font: 'font-mono font-bold', tracking: 'tracking-[0.2em]', style: 'text-gray-200' },
    Pixel2Pixel: { font: 'font-display font-black', tracking: 'tracking-widest', style: 'text-white' },
  };

  return (
    <section className="py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Luxury Glassmorphic Outer Main Container Card with Subtle Slow Beam */}
        <GlowBorderCard
          roundedClassName="rounded-3xl"
          innerClassName="rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-2xl bg-white/[0.02]"
        >
          {/* Subtle Top Rim Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

          {/* Section Eyebrow */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-7 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-purple-300 font-bold">
              <Building2 className="w-4 h-4 text-purple-300" />
              <span>Companies & Enterprise Brands I&apos;ve Worked With</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Production CGI • 3D Design • Commercials</span>
            </div>
          </div>

          {/* Grid of Clean Company Logo Cards (No rotating beam on inner cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {CLIENTS.map((client, index) => {
              const styleMeta = logoStyles[client.name] || {
                font: 'font-sans font-bold',
                tracking: 'tracking-wider',
                style: 'text-white',
              };

              return (
                <div
                  key={index}
                  className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 shadow-md min-h-[90px] group"
                >
                  <span
                    className={`text-sm sm:text-base ${styleMeta.font} ${styleMeta.tracking} ${styleMeta.style} group-hover:text-cyan-300 transition-colors uppercase`}
                  >
                    {client.logoText || client.name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 mt-1 line-clamp-1 group-hover:text-gray-200 transition-colors">
                    {client.category.split('&')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </GlowBorderCard>

      </div>
    </section>
  );
};
