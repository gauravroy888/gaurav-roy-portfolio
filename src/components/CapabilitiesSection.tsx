'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  PenTool,
  Monitor,
  Sparkles,
  MousePointer,
  Layers,
  Box,
  Award,
  Cpu,
  Video,
  GraduationCap
} from 'lucide-react';

interface ToolItem {
  name: string;
  brand: string;
  logoType: string;
  description: string;
}

export const CapabilitiesSection: React.FC = () => {
  // Tooltip state for tool descriptions near mouse pointer (2-3 sec display)
  const [activeTooltip, setActiveTooltip] = useState<{
    tool: ToolItem;
    categoryName: string;
    accentColor: string;
    x: number;
    y: number;
  } | null>(null);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleToolMouseEnter = (
    e: React.MouseEvent,
    tool: ToolItem,
    categoryName: string,
    accentColor: string
  ) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    const target = e.currentTarget as HTMLElement;
    const rect = target?.getBoundingClientRect?.();
    const fallbackX = rect ? rect.right + 14 : 300;
    const fallbackY = rect ? rect.top : 200;
    const x = (typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : fallbackX;
    const y = (typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : fallbackY;

    setActiveTooltip({
      tool,
      categoryName,
      accentColor,
      x,
      y,
    });

    // Automatically dismiss after 10 seconds (as requested)
    hideTimerRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 10000);
  };

  const handleToolMouseMove = (e: React.MouseEvent) => {
    setActiveTooltip((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        x: e.clientX,
        y: e.clientY,
      };
    });
  };

  const handleToolMouseLeave = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setActiveTooltip(null);
  };

  const calculateTooltipPosition = (x: number, y: number) => {
    if (typeof window === 'undefined') return { left: x, top: y };

    const width = 310;
    const height = 160;
    const offset = 14;

    let left = x + offset;
    let top = y + offset;

    // Flip to left if overflowing viewport right
    if (left + width > window.innerWidth - 14) {
      left = x - width - offset;
    }

    // Flip to top if overflowing viewport bottom
    if (top + height > window.innerHeight - 14) {
      top = y - height - offset;
    }

    // Keep within safe viewport boundaries
    if (left < 14) left = 14;
    if (top < 14) top = 14;

    return { left, top };
  };

  const capabilities = [
    {
      id: '3d-unreal',
      icon: Monitor,
      title: '3D/CGI & Unreal Engine',
      desc: 'Crafting photorealistic CGI renders, real-time virtual environments, and interactive experiences.',
      accent: 'text-cyan-400',
    },
    {
      id: 'gen-ai',
      icon: Sparkles,
      title: 'Generative AI & ComfyUI',
      desc: 'Architecting custom ComfyUI node workflows, LTX 2.5, Qwen models, Whisper, and automated generative pipelines.',
      accent: 'text-purple-400',
    },
    {
      id: 'spatial-ux',
      icon: MousePointer,
      title: 'Motion, Interaction & Spatial UX',
      desc: 'Designing intuitive spatial interfaces, WebXR navigation paradigms, and tactile interaction physics.',
      accent: 'text-indigo-400',
    },
    {
      id: 'creative-prototyping',
      icon: PenTool,
      title: 'Creative Prototyping',
      desc: 'Bridging artistic imagination with functional, rapid interactive prototypes and technical code execution.',
      accent: 'text-emerald-400',
    },
    {
      id: 'motion-editing',
      icon: Video,
      title: 'Motion Graphics & Video Editing',
      desc: 'Directing kinetic commercial product reels, product ads, and high-impact editorial post-production.',
      accent: 'text-amber-400',
    },
    {
      id: 'spatial-web',
      icon: Layers,
      title: 'Development and Full Stack Systems',
      desc: 'Engineering scalable platforms that ensure zero latency, performance, and reliability using latest workflows and stacks.',
      accent: 'text-blue-400',
    },
  ];

  const toolCategories: {
    categoryName: string;
    icon: any;
    accentColor: string;
    items: ToolItem[];
  }[] = [
    {
      categoryName: 'AI & Generative Workflows',
      icon: Cpu,
      accentColor: 'text-purple-300',
      items: [
        {
          name: 'ComfyUI',
          brand: 'Node Workflows',
          logoType: 'comfyui',
          description: 'Modular node-based interface for architecting custom generative AI pipelines, LoRA chains, ControlNet conditioning, and batch rendering.',
        },
        {
          name: 'Anti-Gravity',
          brand: 'Agentic Dev',
          logoType: 'antigravity',
          description: 'Autonomous agentic AI development environment for full-stack engineering, complex workspace tasks, and rapid interactive prototyping.',
        },
        {
          name: 'Stitch AI',
          brand: 'UI Generation',
          logoType: 'stitch',
          description: 'Generative UI intelligence system for rapidly designing, scaffolding, and converting design prompts into multi-screen frontend layouts.',
        },
        {
          name: 'OpenAI Codex',
          brand: 'OpenAI Code',
          logoType: 'openai',
          description: 'Specialized code generation engine for synthesizing complex algorithmic logic, API integrations, and full-stack software architectures.',
        },
        {
          name: 'Claude Code',
          brand: 'Agentic CLI',
          logoType: 'claude',
          description: 'Autonomous command-line agent for intelligent codebase navigation, terminal workflow automation, and multi-file architectural refactoring.',
        },
        {
          name: 'Remotion',
          brand: 'Code-To-Video',
          logoType: 'remotion',
          description: 'Programmatic video creation framework for producing pixel-perfect motion graphics, dynamic animations, and video reels using React.',
        },
      ],
    },
    {
      categoryName: '3D & Spatial Engines',
      icon: Box,
      accentColor: 'text-cyan-300',
      items: [
        {
          name: 'Unreal Engine',
          brand: 'Real-Time GI',
          logoType: 'unreal',
          description: 'High-end real-time 3D engine for photorealistic Lumen lighting, Nanite geometry, virtual production, and interactive spatial worlds.',
        },
        {
          name: 'Cinema 4D',
          brand: '3D Motion',
          logoType: 'c4d',
          description: 'Industry-standard 3D animation suite for procedural MoGraph simulations, commercial product visualizations, and kinetic broadcasts.',
        },
        {
          name: 'Blender',
          brand: 'Modeling',
          logoType: 'blender',
          description: 'Open-source 3D creation suite for detailed polygonal modeling, UV unwrapping, topology sculpting, and asset optimization for real-time engines.',
        },
        {
          name: 'Spline',
          brand: 'Spatial Web',
          logoType: 'spline',
          description: 'Web-native 3D design software for crafting interactive 3D web experiences, dynamic spatial layouts, and browser-embedded physics.',
        },
      ],
    },
    {
      categoryName: 'Adobe Creative Suite & Post',
      icon: Video,
      accentColor: 'text-pink-300',
      items: [
        {
          name: 'After Effects',
          brand: 'Motion & VFX',
          logoType: 'ae',
          description: 'Industry-standard motion graphics software for kinetic typography, visual effects compositing, HUD animations, and post-production.',
        },
        {
          name: 'Premiere Pro',
          brand: 'Video Editing',
          logoType: 'pr',
          description: 'Professional non-linear video editing platform for commercial cuts, color grading, audio mixing, and broadcast video post-production.',
        },
        {
          name: 'Photoshop',
          brand: 'PBR & Textures',
          logoType: 'ps',
          description: 'Essential raster editing tool for concept art matte painting, PBR texture mapping, image manipulation, and visual mockups.',
        },
        {
          name: 'Illustrator',
          brand: 'Vector Design',
          logoType: 'ai',
          description: 'Precision vector graphics platform for designing scalable typography marks, brand logos, custom vector iconography, and spatial UI assets.',
        },
      ],
    },
  ];

  const education = [
    {
      title: 'Diploma in 3D Design & Computer Graphics',
      subtitle: 'Arena Animation • Completed with Honors',
    },
    {
      title: 'Aeronautical & Computer Applications Foundation',
      subtitle: 'Kurukshetra University & IGNOU • Academic Foundation',
    },
  ];

  // Official Software & Platform PNG Logos
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const logoFiles: Record<string, { src: string; bg: string; border: string; alt: string; padding?: string }> = {
    comfyui: {
      src: `${basePath}/logos/comfyui.png`,
      bg: 'bg-lime-400/10',
      border: 'border-lime-400/30',
      alt: 'ComfyUI Logo',
      padding: 'p-1',
    },
    antigravity: {
      src: `${basePath}/logos/antigravity.png`,
      bg: 'bg-indigo-500/15',
      border: 'border-indigo-400/30',
      alt: 'Google Antigravity Logo',
      padding: 'p-1',
    },
    stitch: {
      src: `${basePath}/logos/stitch.png`,
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-400/30',
      alt: 'Google Stitch AI Logo',
      padding: 'p-0.5',
    },
    openai: {
      src: `${basePath}/logos/openai.png`,
      bg: 'bg-white/10',
      border: 'border-white/20',
      alt: 'OpenAI Codex Logo (White)',
      padding: 'p-1',
    },
    unreal: {
      src: `${basePath}/logos/unreal.png`,
      bg: 'bg-white/10',
      border: 'border-white/20',
      alt: 'Unreal Engine Logo (White)',
      padding: 'p-0.5',
    },
    c4d: {
      src: `${basePath}/logos/c4d.png`,
      bg: 'bg-blue-600/15',
      border: 'border-blue-400/30',
      alt: 'Cinema 4D Logo',
      padding: 'p-0.5',
    },
    blender: {
      src: `${basePath}/logos/blender.png`,
      bg: 'bg-orange-500/15',
      border: 'border-orange-400/30',
      alt: 'Blender 3D Logo',
      padding: 'p-0.5',
    },
    spline: {
      src: `${basePath}/logos/spline.png`,
      bg: 'bg-pink-500/15',
      border: 'border-pink-400/30',
      alt: 'Spline 3D Logo',
      padding: 'p-0.5',
    },
    threejs: {
      src: `${basePath}/logos/threejs.png`,
      bg: 'bg-purple-950/40',
      border: 'border-purple-400/30',
      alt: 'Three.js Logo',
      padding: 'p-1',
    },
    ae: {
      src: `${basePath}/logos/aftereffects.png`,
      bg: 'bg-[#9999FF]/15',
      border: 'border-[#9999FF]/30',
      alt: 'Adobe After Effects Logo',
      padding: 'p-0.5',
    },
    pr: {
      src: `${basePath}/logos/premiere.png`,
      bg: 'bg-[#EA77FF]/15',
      border: 'border-[#EA77FF]/30',
      alt: 'Adobe Premiere Pro Logo',
      padding: 'p-0.5',
    },
    ps: {
      src: `${basePath}/logos/photoshop.png`,
      bg: 'bg-[#31A8FF]/15',
      border: 'border-[#31A8FF]/30',
      alt: 'Adobe Photoshop Logo',
      padding: 'p-0.5',
    },
    ai: {
      src: `${basePath}/logos/illustrator.png`,
      bg: 'bg-[#FF9A00]/15',
      border: 'border-[#FF9A00]/30',
      alt: 'Adobe Illustrator Logo',
      padding: 'p-0.5',
    },
    claude: {
      src: `${basePath}/logos/claude.png`,
      bg: 'bg-[#D97757]/15',
      border: 'border-[#D97757]/30',
      alt: 'Claude Code Logo',
      padding: 'p-1',
    },
    remotion: {
      src: `${basePath}/logos/remotion.png`,
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-400/30',
      alt: 'Remotion Logo',
      padding: 'p-1',
    },
  };

  // Render Original Software & Platform Logo
  const renderLogo = (type: string, customSize?: string) => {
    const item = logoFiles[type];
    const size = customSize || 'w-8 h-8';
    if (item) {
      return (
        <div
          className={`${size} rounded-lg ${item.bg} border ${item.border} ${item.padding || 'p-1'} flex items-center justify-center shrink-0 shadow-sm overflow-hidden group-hover:scale-105 transition-transform`}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className={`${size} rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white`}>
        <Box className="w-4 h-4" />
      </div>
    );
  };

  return (
    <section id="capabilities" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Perfectly Balanced Side-by-Side 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (6 cols): Core Capabilities + Certifications & Education */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            
            {/* 1. Core Capabilities Section */}
            <div className="space-y-6">
              <div className="pb-3 border-b border-white/15 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-gray-200 font-bold">
                  Core Capabilities
                </span>
                <span className="text-xs font-mono text-purple-300 uppercase font-semibold">
                  6 Key Disciplines
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                {capabilities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="space-y-2 group">
                      <div className="flex items-start gap-3">
                        {/* Capability Discipline Icon */}
                        <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 shadow-sm mt-0.5 select-none">
                          <Icon className={`w-4 h-4 ${item.accent}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-mono uppercase tracking-wider text-white font-bold leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed pl-12 font-sans">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Certifications & Education Card */}
            <div className="luxury-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-200 font-bold border-b border-white/10 pb-3">
                <GraduationCap className="w-4 h-4 text-purple-300" />
                <span>Certifications & Education</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-[#141726]/90 border border-white/10 p-3.5 rounded-xl flex items-start gap-3 shadow-inner">
                    <div className="w-7 h-7 rounded-md bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {edu.title}
                      </h5>
                      <p className="text-xs font-mono text-gray-300 mt-1 font-medium">
                        {edu.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (6 cols): Categorized Tools & Technologies Card */}
          <div className="lg:col-span-6 flex flex-col">
            
            <div className="luxury-card rounded-2xl p-7 h-full flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-gray-200 font-bold">
                  Tools & Technologies
                </span>
                <span className="text-xs font-mono text-purple-300 uppercase font-semibold">
                  {toolCategories.reduce((acc, cat) => acc + cat.items.length, 0)} Enterprise Platforms
                </span>
              </div>

              <div className="space-y-5 flex-1 flex flex-col justify-around">
                {toolCategories.map((group, groupIdx) => {
                  const GroupIcon = group.icon;
                  return (
                    <div key={groupIdx} className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-200 font-bold">
                        <GroupIcon className={`w-3.5 h-3.5 ${group.accentColor}`} />
                        <span>{group.categoryName}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {group.items.map((t, idx) => (
                          <div
                            key={idx}
                            onMouseEnter={(e) => handleToolMouseEnter(e, t, group.categoryName, group.accentColor)}
                            onMouseMove={handleToolMouseMove}
                            onMouseLeave={handleToolMouseLeave}
                            onClick={(e) => handleToolMouseEnter(e, t, group.categoryName, group.accentColor)}
                            className="bg-[#141726]/95 border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-inner hover:border-white/30 hover:bg-[#181C2E] transition-all group cursor-pointer relative"
                          >
                            {/* Brand Logo Icon */}
                            {renderLogo(t.logoType)}

                            {/* Name and Tag (Large, Crisp, Legible) */}
                            <div className="overflow-hidden min-w-0">
                              <span className="text-sm font-bold text-white block truncate group-hover:text-cyan-300 transition-colors">
                                {t.name}
                              </span>
                              <span className="text-xs font-mono text-gray-300 uppercase block truncate font-medium">
                                {t.brand}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/10 text-xs font-mono text-gray-300 flex items-center justify-between font-medium">
                <span>Production Ready AI & 3D Pipelines</span>
                <span className="text-cyan-300">● 100% Active Stack</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Floating 2-3s Tooltip Popup Near Mouse Pointer */}
      {mounted && activeTooltip && createPortal(
        <div
          style={{
            left: `${calculateTooltipPosition(activeTooltip.x, activeTooltip.y).left}px`,
            top: `${calculateTooltipPosition(activeTooltip.x, activeTooltip.y).top}px`,
          }}
          className="fixed z-[99999] pointer-events-none w-[300px] sm:w-[325px] bg-[#0E111D]/95 border border-white/20 rounded-xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.2)] backdrop-blur-2xl ring-1 ring-white/15 animate-in fade-in zoom-in-95 duration-150 transition-[left,top] ease-out duration-75"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header with Logo, Name & Brand Tag */}
          <div className="flex items-center gap-2.5 mb-2.5 relative z-10">
            {renderLogo(activeTooltip.tool.logoType, 'w-8 h-8')}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-sm font-bold text-white tracking-wide truncate">
                  {activeTooltip.tool.name}
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.08] text-cyan-300 border border-cyan-500/30 font-semibold shrink-0">
                  {activeTooltip.tool.brand}
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 block truncate mt-0.5">
                {activeTooltip.categoryName}
              </span>
            </div>
          </div>

          {/* Purpose Label */}
          <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">
              Why It&apos;s Used
            </span>
          </div>

          {/* Clear Short Description */}
          <p className="text-xs text-gray-200 leading-relaxed font-sans relative z-10">
            {activeTooltip.tool.description}
          </p>

          {/* Bottom Countdown Indicator (10 sec progress bar) */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-gray-400 relative z-10">
            <span className="text-gray-400">Display timer</span>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-300 font-semibold">10s</span>
              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-shrink-timer" />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};
