'use client';

import React from 'react';
import { 
  Layers, 
  Tv, 
  Box, 
  Code2, 
  Film, 
  Sparkles,
  Globe 
} from 'lucide-react';
import { GlowBorderCard } from './GlowBorderCard';

export const SpecialtiesSection: React.FC = () => {
  const specialties = [
    {
      icon: Tv,
      title: '3D/CGI & Unreal Engine',
      desc: 'Crafting photorealistic 3D CGI assets, real-time Unreal Engine environments, and interactive experiences with Lumen GI simulations at 60+ FPS.',
      accent: 'from-cyan-500/25 to-blue-500/25 text-cyan-300 border-cyan-500/30',
    },
    {
      icon: Sparkles,
      title: 'Generative AI & ComfyUI Workflows',
      desc: 'Architecting custom ComfyUI node graphs, LTX 2.5, Qwen models, Whisper integration, and automated generative visual pipelines.',
      accent: 'from-pink-500/25 to-purple-500/25 text-pink-300 border-pink-500/30',
    },
    {
      icon: Layers,
      title: 'Motion, Interaction & Spatial UX',
      desc: 'Designing intuitive spatial user interfaces, WebXR navigation models, micro-interactions, and fluid physics-driven responsive spaces.',
      accent: 'from-purple-500/25 to-cyan-500/25 text-purple-300 border-purple-500/30',
    },
    {
      icon: Code2,
      title: 'Creative Prototyping & Implementation',
      desc: 'Bridging artistic visual concepts with robust technical execution — turning rapid multi-disciplinary prototypes into scalable code systems.',
      accent: 'from-emerald-500/25 to-teal-500/25 text-emerald-300 border-emerald-500/30',
    },
    {
      icon: Film,
      title: 'Motion Graphics & Video Editing',
      desc: 'Directing cinematic commercial product reels, product ads, kinetic typography, and editorial post-production in After Effects & Premiere.',
      accent: 'from-amber-500/25 to-orange-500/25 text-amber-300 border-amber-500/30',
    },
    {
      icon: Globe,
      title: 'Spatial Web & Three.js Systems',
      desc: 'Engineering scalable platforms that ensure zero latency, performance, and reliability using modern Three.js and full-stack stacks.',
      accent: 'from-blue-500/25 to-indigo-500/25 text-blue-300 border-blue-500/30',
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
              Services & Core Disciplines
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
              My Specialties
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
              Synthesizing 3D/CGI, real-time Unreal Engine, ComfyUI generative AI workflows, motion design, and spatial web engineering into cohesive digital experiences.
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
