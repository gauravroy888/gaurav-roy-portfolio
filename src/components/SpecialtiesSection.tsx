'use client';

import React from 'react';
import { 
  Layers, 
  Tv, 
  Building2, 
  Code2, 
  Lightbulb, 
  Search 
} from 'lucide-react';
import { GlowBorderCard } from './GlowBorderCard';

export const SpecialtiesSection: React.FC = () => {
  const specialties = [
    {
      icon: Layers,
      title: 'UI/UX & Spatial Design',
      desc: 'Creating clean, intuitive 3D spaces, interactive interfaces, and digital experiences that enhance user engagement and brand clarity.',
      accent: 'from-purple-500/25 to-cyan-500/25 text-purple-300 border-purple-500/30',
    },
    {
      icon: Tv,
      title: 'Real-Time Unreal Engine',
      desc: 'Designing seamless, responsive 3D environments, virtual production sets, and real-time Lumen GI simulations at 60+ FPS.',
      accent: 'from-cyan-500/25 to-blue-500/25 text-cyan-300 border-cyan-500/30',
    },
    {
      icon: Building2,
      title: '3D Architecture & CGI',
      desc: 'Crafting ultra-photorealistic luxury hospitality suites, PBR calibrated materials, and broadcast 8K master stills for enterprise clients.',
      accent: 'from-blue-500/25 to-indigo-500/25 text-blue-300 border-blue-500/30',
    },
    {
      icon: Code2,
      title: 'Generative AI Pipelines',
      desc: 'Architecting custom ComfyUI node workflows, Flux/SDXL LoRA fine-tuning, and automated asset generation systems that scale 10x.',
      accent: 'from-pink-500/25 to-purple-500/25 text-pink-300 border-pink-500/30',
    },
    {
      icon: Lightbulb,
      title: 'Brand Motion & Reels',
      desc: 'Directing cinematic commercial launch reels, fluid particle simulations, and dynamic product animations for global brand campaigns.',
      accent: 'from-amber-500/25 to-orange-500/25 text-amber-300 border-amber-500/30',
    },
    {
      icon: Search,
      title: 'Spatial Web & Three.js',
      desc: 'Engineering interactive WebGL/Three.js web applications, 3D configurators, and modern full-stack platforms with zero load lag.',
      accent: 'from-emerald-500/25 to-teal-500/25 text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <section id="specialties" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Encased Container with Subtle Slow Border Beam */}
        <GlowBorderCard
          roundedClassName="rounded-3xl"
          innerClassName="rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl bg-white/[0.02]"
        >
          {/* Subtle Top Inner Rim Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

          {/* Section Header */}
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-purple-300 font-bold block">
              Services
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
              My Specialties
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
              Mastering the intersection of high-fidelity 3D CGI, interactive spatial computation, and generative AI pipelines.
            </p>
          </div>

          {/* 3 Columns × 2 Rows Grid (Clean cards, no rotating beam on inner cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {specialties.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/25 rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Icon Badge */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-300 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlowBorderCard>

      </div>
    </section>
  );
};
