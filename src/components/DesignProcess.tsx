'use client';

import React, { useState } from 'react';
import {
  Search,
  Target,
  PenTool,
  Code2,
  Rocket,
  Monitor,
  Sparkles,
  MousePointer,
  Video,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CapabilityWorkflowModal } from './CapabilityWorkflowModal';

interface DesignProcessProps {
  onOpenWorkflow?: (id: string) => void;
}

export const DesignProcess: React.FC<DesignProcessProps> = ({ onOpenWorkflow }) => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  const handleOpenWorkflow = (id: string) => {
    if (onOpenWorkflow) {
      onOpenWorkflow(id);
    } else {
      setSelectedWorkflowId(id);
      setIsWorkflowModalOpen(true);
    }
  };

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

  const capabilityProcesses = [
    {
      id: '3d-unreal',
      icon: Monitor,
      title: '3D/CGI & Unreal',
      subtitle: 'Real-time & CGI',
      accentColor: 'text-cyan-400',
      borderAccent: 'hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]',
      bgAccent: 'bg-cyan-500/10 border-cyan-500/30',
      dotColor: 'bg-cyan-400',
    },
    {
      id: 'gen-ai',
      icon: Sparkles,
      title: 'Generative AI',
      subtitle: 'ComfyUI & Models',
      accentColor: 'text-purple-400',
      borderAccent: 'hover:border-purple-400/80 hover:shadow-[0_0_20px_rgba(192,132,252,0.25)]',
      bgAccent: 'bg-purple-500/10 border-purple-500/30',
      dotColor: 'bg-purple-400',
    },
    {
      id: 'spatial-ux',
      icon: MousePointer,
      title: 'Spatial UX',
      subtitle: 'Interaction Physics',
      accentColor: 'text-indigo-400',
      borderAccent: 'hover:border-indigo-400/80 hover:shadow-[0_0_20px_rgba(129,140,248,0.25)]',
      bgAccent: 'bg-indigo-500/10 border-indigo-500/30',
      dotColor: 'bg-indigo-400',
    },
    {
      id: 'creative-prototyping',
      icon: PenTool,
      title: 'Prototyping',
      subtitle: 'Rapid Execution',
      accentColor: 'text-emerald-400',
      borderAccent: 'hover:border-emerald-400/80 hover:shadow-[0_0_20px_rgba(52,211,153,0.25)]',
      bgAccent: 'bg-emerald-500/10 border-emerald-500/30',
      dotColor: 'bg-emerald-400',
    },
    {
      id: 'motion-editing',
      icon: Video,
      title: 'Motion & Video',
      subtitle: 'Commercial Reels',
      accentColor: 'text-amber-400',
      borderAccent: 'hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)]',
      bgAccent: 'bg-amber-500/10 border-amber-500/30',
      dotColor: 'bg-amber-400',
    },
    {
      id: 'spatial-web',
      icon: Layers,
      title: 'Development',
      subtitle: 'Full Stack Systems',
      accentColor: 'text-blue-400',
      borderAccent: 'hover:border-blue-400/80 hover:shadow-[0_0_20px_rgba(96,165,250,0.25)]',
      bgAccent: 'bg-blue-500/10 border-blue-500/30',
      dotColor: 'bg-blue-400',
    },
  ];

  return (
    <section id="process" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="pb-4 mb-8 border-b border-white/15 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-gray-200 font-bold">
            Creative Engineering Process
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

        {/* Explore Processes with Capability Icons (Thin Rectangle Bar) */}
        <div className="mt-8 sm:mt-10 luxury-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Subtle glow backdrop */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Bar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-5 pb-4 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white font-bold">
                Explore Architecture Processes
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-cyan-300 font-semibold">
                6 Pipelines
              </span>
            </div>
            <p className="text-xs text-gray-400 font-sans">
              Click any capability icon to inspect its end-to-end technical node pipeline
            </p>
          </div>

          {/* 6 Interactive Capability Process Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 relative z-10">
            {capabilityProcesses.map((cap) => {
              const Icon = cap.icon;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => handleOpenWorkflow(cap.id)}
                  className={`group relative p-3 sm:p-3.5 rounded-xl bg-[#141726]/80 hover:bg-[#1A1F33] border border-white/[0.08] ${cap.borderAccent} transition-all duration-300 flex flex-col items-start text-left gap-2 shadow-md hover:-translate-y-0.5 cursor-pointer`}
                  title={`Explore ${cap.title} architecture process`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-8 h-8 rounded-lg ${cap.bgAccent} border flex items-center justify-center ${cap.accentColor} shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <span className={`w-1.5 h-1.5 rounded-full ${cap.dotColor}`} />
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="text-xs font-bold text-white tracking-wide group-hover:text-white transition-colors truncate">
                      {cap.title}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 group-hover:text-gray-300 transition-colors truncate mt-0.5">
                      {cap.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Interactive Capability Architecture Workflow Modal */}
      <CapabilityWorkflowModal
        initialCapabilityId={selectedWorkflowId}
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
      />
    </section>
  );
};
