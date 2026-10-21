'use client';

import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { ThreeCanvas } from './ThreeCanvas';
import { ArrowUpRight, ArrowRight, Box } from 'lucide-react';

interface FeaturedWorkSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="work" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Header Row (Matching reference: FEATURED WORK & EXPLORE ALL PROJECTS →) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-300 font-semibold">
            Featured Work
          </span>

          <button
            onClick={() => onSelectProject(PROJECTS[0])}
            className="text-[11px] font-mono uppercase tracking-[0.15em] text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Column Card Grid (Matching reference layout with real-time 3D interactive sculpture in Card 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Finance / Luxury Hospitality Suite */}
          <div
            onClick={() => onSelectProject(PROJECTS[0])}
            className="group luxury-card rounded-2xl p-4 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black mb-5">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Hospitality Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            </div>

            <div className="flex items-end justify-between px-2 pb-2">
              <div className="space-y-1">
                <h3 className="font-display text-2xl text-white tracking-wide uppercase">
                  Hospitality Suite
                </h3>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  3D PBR ARCHITECTURE • SPATIAL CGI
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/[0.08] group-hover:bg-white text-gray-300 group-hover:text-black flex items-center justify-center shrink-0 transition-all shadow-inner">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Elevate Your Brand — Real-Time Interactive Three.js 3D Sculpture */}
          <div
            onClick={() => onSelectProject(PROJECTS[1])}
            className="group luxury-card rounded-2xl p-4 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#141724] via-[#0E1018] to-[#08090E] mb-5 border border-white/[0.06]">
              <ThreeCanvas className="w-full h-full" />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-mono text-cyan-300 border border-white/10 flex items-center gap-1 pointer-events-none">
                <Box className="w-3 h-3 text-cyan-400" />
                <span>Interactive 3D • Drag to Rotate</span>
              </div>
            </div>

            <div className="flex items-end justify-between px-2 pb-2">
              <div className="space-y-1">
                <h3 className="font-display text-2xl text-white tracking-wide uppercase">
                  Elevate Your Brand
                </h3>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  3D SPATIAL MOTION • BRANDING
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/[0.08] group-hover:bg-white text-gray-300 group-hover:text-black flex items-center justify-center shrink-0 transition-all shadow-inner">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Unreal Engine 5 Virtual Set */}
          <div
            onClick={() => onSelectProject(PROJECTS[3])}
            className="group luxury-card rounded-2xl p-4 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black mb-5">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                alt="Unreal Engine 5 Virtual Set"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            </div>

            <div className="flex items-end justify-between px-2 pb-2">
              <div className="space-y-1">
                <h3 className="font-display text-2xl text-white tracking-wide uppercase">
                  UE5 Virtual Set
                </h3>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  REAL-TIME 60FPS • LUMEN & NANITE
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/[0.08] group-hover:bg-white text-gray-300 group-hover:text-black flex items-center justify-center shrink-0 transition-all shadow-inner">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
