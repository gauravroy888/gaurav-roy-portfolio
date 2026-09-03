'use client';

import React from 'react';
import { Search, Target, PenTool, Code2, Rocket } from 'lucide-react';

export const DesignProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      icon: Search,
      desc: 'Understanding core business goals, target audience, technical requirements, and project vision in depth.',
    },
    {
      number: '02',
      title: 'DEFINE',
      icon: Target,
      desc: 'Researching industry benchmarks, structuring creative direction, and turning briefs into clear execution roadmaps.',
    },
    {
      number: '03',
      title: 'DESIGN',
      icon: PenTool,
      desc: 'Crafting high-fidelity concepts, spatial visual systems, and refined UI aesthetics with pixel-perfect precision.',
    },
    {
      number: '04',
      title: 'DEVELOP',
      icon: Code2,
      desc: 'Building production-ready systems, integrating modern frameworks, AI workflows, and seamless interactive logic.',
    },
    {
      number: '05',
      title: 'DELIVER',
      icon: Rocket,
      desc: 'Rigorous quality testing, performance optimization, and launching polished, high-impact digital experiences.',
    },
  ];

  return (
    <section id="process" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="pb-4 mb-8 border-b border-white/15 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-gray-200 font-bold">
            My Design Process
          </span>
          <span className="text-xs font-mono text-purple-300 uppercase font-semibold">
            Universal 5-Stage Pipeline
          </span>
        </div>

        {/* 5-Step Process Container Card */}
        <div className="luxury-card rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col justify-between space-y-4 relative bg-[#141726]/80 p-5 rounded-2xl border border-white/[0.06] hover:border-white/20 transition-all">
                  
                  {/* Step Number & Title */}
                  <div>
                    <div className="text-xs font-mono text-gray-300 font-semibold mb-2 flex items-center gap-1.5">
                      <span className="text-purple-300 font-bold text-sm">{step.number}</span>
                      <span className="text-white font-bold tracking-wider">{step.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Icon & Dotted Connector */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Dotted line indicator if not last item */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block w-full border-t border-dashed border-white/25 mx-3" />
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
