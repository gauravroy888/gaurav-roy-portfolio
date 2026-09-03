'use client';

import React from 'react';
import { CLIENTS } from '../data/portfolioData';
import { ShieldCheck, Building2 } from 'lucide-react';

export const ClientMarquee: React.FC = () => {
  return (
    <section id="clients" className="py-16 relative overflow-hidden border-y border-white/[0.06] bg-[#090B10]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>Enterprise Production Track Record</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
          Trusted by Industry Leaders & Multinational Brands
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-1">
          Delivered commercial CGI, interactive spatial assets, and broadcast motion reels for major enterprise clients.
        </p>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden flex items-center py-4">
        
        {/* Left / Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090B10] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090B10] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 whitespace-nowrap will-change-transform">
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 bg-[#121624]/80 hover:bg-[#181D30] border border-white/[0.08] hover:border-purple-500/40 rounded-2xl px-6 py-3.5 transition-all shadow-sm shrink-0 group cursor-default"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-display font-extrabold text-white text-sm group-hover:text-purple-300 transition-colors">
                {client.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-wider text-gray-200 group-hover:text-white uppercase">
                  {client.logoText}
                </span>
                <span className="text-[10px] font-mono text-gray-500 block">
                  {client.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
