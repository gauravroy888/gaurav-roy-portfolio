'use client';

import React from 'react';
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

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: PenTool,
      title: 'UI/UX & 3D Design',
      desc: 'Crafting intuitive, user-centered 3D spaces and interfaces that drive engagement and brand delight.',
    },
    {
      icon: Monitor,
      title: 'Real-Time Unreal Engine',
      desc: 'Building responsive, modern 3D environments that communicate brand and spatial purpose.',
    },
    {
      icon: Sparkles,
      title: 'Generative AI Pipelines',
      desc: 'Architecting custom ComfyUI node workflows and LoRAs that accelerate production 10x.',
    },
    {
      icon: MousePointer,
      title: 'Interaction & WebXR',
      desc: 'Creating smooth, meaningful spatial interactions that enhance the user experience.',
    },
    {
      icon: Layers,
      title: 'Full-Stack Code Systems',
      desc: 'Engineering scalable Next.js and Three.js platforms that ensure speed and reliability.',
    },
    {
      icon: Box,
      title: '3D Prototyping & Motion',
      desc: 'Turning concepts into high-poly renders, fluid simulations, and commercial video reels.',
    },
  ];

  const toolCategories = [
    {
      categoryName: 'AI & Generative Workflows',
      icon: Cpu,
      accentColor: 'text-purple-300',
      items: [
        {
          name: 'ComfyUI & Flux',
          brand: 'Node Workflows',
          logoType: 'comfyui',
        },
        {
          name: 'Anti-Gravity',
          brand: 'Agentic Dev',
          logoType: 'antigravity',
        },
        {
          name: 'Stitch AI',
          brand: 'UI Generation',
          logoType: 'stitch',
        },
        {
          name: 'OpenAI Codex',
          brand: 'OpenAI Code',
          logoType: 'openai',
        },
      ],
    },
    {
      categoryName: '3D & Spatial Engines',
      icon: Box,
      accentColor: 'text-cyan-300',
      items: [
        {
          name: 'Unreal Engine 5.4',
          brand: 'Real-Time GI',
          logoType: 'unreal',
        },
        {
          name: 'Cinema 4D',
          brand: '3D Motion',
          logoType: 'c4d',
        },
        {
          name: 'Autodesk Maya',
          brand: 'CAD & Modeling',
          logoType: 'maya',
        },
        {
          name: 'Spline / Three.js',
          brand: 'Spatial Web',
          logoType: 'threejs',
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
        },
        {
          name: 'Premiere Pro',
          brand: 'Video Editing',
          logoType: 'pr',
        },
        {
          name: 'Photoshop',
          brand: 'PBR & Textures',
          logoType: 'ps',
        },
        {
          name: 'Illustrator',
          brand: 'Vector Design',
          logoType: 'ai',
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

  // Render SVG Brand Badge
  const renderLogo = (type: string) => {
    switch (type) {
      case 'openai':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#10A37F]/20 border border-[#10A37F]/40 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.9224-2.8398a4.4992 4.4992 0 0 1 6.6027 4.6756zM12 14.7081l-3.003-1.7331 3.003-1.733 3.003 1.733-3.003 1.7331z" />
            </svg>
          </div>
        );

      case 'antigravity':
        return (
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 22 22 22" />
              <line x1="12" y1="9" x2="12" y2="17" />
              <circle cx="12" cy="17" r="1" fill="currentColor" />
            </svg>
          </div>
        );

      case 'comfyui':
        return (
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="18" r="3" />
              <circle cx="18" cy="6" r="3" />
              <line x1="9" y1="6" x2="15" y2="6" />
              <path d="M6 9v6a3 3 0 0 0 3 3h6" />
            </svg>
          </div>
        );

      case 'stitch':
        return (
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
        );

      case 'unreal':
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-400/50 flex items-center justify-center shrink-0 font-display font-black text-white text-base">
            U
          </div>
        );

      case 'c4d':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-600/25 border border-blue-400/40 flex items-center justify-center shrink-0 font-mono font-bold text-blue-300 text-xs">
            C4D
          </div>
        );

      case 'maya':
        return (
          <div className="w-8 h-8 rounded-lg bg-teal-600/25 border border-teal-400/40 flex items-center justify-center shrink-0 font-mono font-bold text-teal-300 text-xs">
            M
          </div>
        );

      case 'threejs':
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-600/25 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300">
            <Box className="w-4 h-4" />
          </div>
        );

      case 'ae':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#9999FF]/25 border border-[#9999FF]/50 flex items-center justify-center shrink-0 font-bold text-[#E0E0FF] text-xs font-mono">
            Ae
          </div>
        );

      case 'pr':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EA77FF]/25 border border-[#EA77FF]/50 flex items-center justify-center shrink-0 font-bold text-[#FCD5FF] text-xs font-mono">
            Pr
          </div>
        );

      case 'ps':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#31A8FF]/25 border border-[#31A8FF]/50 flex items-center justify-center shrink-0 font-bold text-[#9CD7FF] text-xs font-mono">
            Ps
          </div>
        );

      case 'ai':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FF9A00]/25 border border-[#FF9A00]/50 flex items-center justify-center shrink-0 font-bold text-[#FFD699] text-xs font-mono">
            Ai
          </div>
        );

      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white">
            <Box className="w-4 h-4" />
          </div>
        );
    }
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
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed pl-11 font-sans">
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
                  12 Enterprise Platforms
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
                            className="bg-[#141726]/95 border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-inner hover:border-white/25 hover:bg-[#181C2E] transition-all group cursor-default"
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
    </section>
  );
};
