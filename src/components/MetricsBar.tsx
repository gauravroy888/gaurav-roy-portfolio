'use client';

import React from 'react';
import { Users, Trophy, Globe, Sparkles } from 'lucide-react';
import { GlowBorderCard } from './GlowBorderCard';

export const MetricsBar: React.FC = () => {
  const metrics = [
    {
      icon: Sparkles,
      value: '6+',
      label: 'Years Experience',
    },
    {
      icon: Users,
      value: '40+',
      label: 'Projects Completed',
    },
    {
      icon: Trophy,
      value: '18+',
      label: 'Happy Clients',
    },
    {
      icon: Globe,
      value: '12',
      label: 'Countries Worked With',
    },
  ];

  return (
    <section className="pt-0 pb-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* Luminous Purple Top Rim Gradient Highlight (Exact match to Option 3 reference) */}
        <div className="absolute -top-[1px] left-8 right-8 sm:left-16 sm:right-16 lg:left-32 lg:right-32 h-[2px] bg-gradient-to-r from-transparent via-purple-400/95 to-transparent shadow-[0_-4px_24px_rgba(192,132,252,0.85)] pointer-events-none z-20" />
        <div className="absolute -top-[10px] left-12 right-12 sm:left-24 sm:right-24 lg:left-48 lg:right-48 h-[20px] bg-gradient-to-r from-transparent via-purple-500/35 to-transparent blur-md pointer-events-none z-10" />

        <GlowBorderCard
          roundedClassName="rounded-2xl sm:rounded-3xl"
          innerClassName="p-6 sm:p-10 shadow-2xl bg-white/[0.02] border-t border-purple-400/35"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center text-center py-2 ${
                    index < 3 ? 'lg:border-r lg:border-white/15' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 text-purple-300 mb-2.5" />
                  
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-1">
                    {item.value}
                  </div>

                  <div className="text-[11px] sm:text-xs font-mono tracking-[0.12em] text-gray-300 uppercase font-semibold">
                    {item.label}
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
