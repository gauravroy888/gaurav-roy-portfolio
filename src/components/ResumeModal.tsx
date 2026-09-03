'use client';

import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, FileText, Sparkles, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
GAURAV ROY
Creative Technologist & Senior 3D / AI Full-Stack Engineer
Delhi, India | +91 9069558564 | gauravroy476@gmail.com | https://gauravroy.dev

EXECUTIVE SUMMARY
Creative Technologist with 5+ years of industry experience bridging spatial 3D computer graphics, real-time Unreal Engine 5, ComfyUI generative AI pipelines, and modern full-stack web engineering. Proven track record leading multidisciplinary teams at Pixel2Pixel and delivering commercial CGI and interactive assets for Fortune & enterprise brands (Kohler, Panasonic, TATA, JBL, Hindware, Biocon, GITAM).

CORE COMPETENCIES
• 3D & Spatial Computing: Unreal Engine 5.4 (Lumen/Nanite), Autodesk Maya, Cinema 4D, Marvelous Designer, Blender, WebXR, Three.js.
• Generative AI & Automation: ComfyUI Node Architectures, Flux.1, SDXL, LoRA Fine-Tuning, ControlNet, Antigravity Agentic Workflows.
• Full-Stack Web Development: Next.js 14/15, React, TypeScript, Tailwind CSS, Node.js, WebGL.
• Visuals & Post-Production: After Effects, Octane, Redshift, Premiere Pro, RealFlow, ACEScg Color Pipelines.
• Leadership & Delivery: Team Management, Creative Direction, Pipeline Architecture, Mentorship.

PROFESSIONAL EXPERIENCE
Senior 3D Artist & Team Lead | Pixel2Pixel (Jan 2020 – Jan 2025 | 5 Years)
• Led 3D modeling, lighting, photorealistic rendering, interior architectural suites, motion graphics, and WebXR workflows.
• Directed and mentored junior artists; assigned tasks based on team strengths, accelerating studio turnaround times by 35%.
• Spearheaded flagship commercial productions for major enterprise clients: Kohler, Panasonic, Hindware, TATA, JBL, Biocon, and GITAM.

Freelance Creative Technologist & AI Specialist (2019 – Present)
• Built automated ComfyUI node workflows for commercial clients, slashing concept pre-visualization turnaround from days to hours.
• Developed interactive 3D WebGL configurators and modern Next.js web applications with smooth motion physics.

EDUCATION
• Diploma in 3D Design & Computer Graphics — Arena Animation (Completed)
• Aeronautical Engineering & Computer Applications Foundation — Kurukshetra University & IGNOU
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0D101A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#121524]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white tracking-tight">
              Gaurav Roy — Official Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-gray-200 transition-all"
              title="Copy plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-mono font-semibold text-white transition-all shadow-glow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0D101A] text-gray-200 text-sm leading-relaxed">
          
          {/* Header Block */}
          <div className="border-b border-white/[0.08] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                GAURAV ROY
              </h1>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold">
                Creative Technologist & 3D/AI Lead
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Delhi, India
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-purple-400" /> gauravroy476@gmail.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 9069558564
              </span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">
              Executive Profile
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Multi-disciplinary Creative Technologist with 5+ years of production experience bridging high-end 3D CGI, Unreal Engine 5 real-time environments, ComfyUI generative AI pipelines, and modern full-stack web applications. Proven track record leading creative teams at Pixel2Pixel and delivering commercial assets for enterprise leaders including Kohler, Panasonic, TATA, JBL, Hindware, Biocon, and GITAM.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4">
              Professional Experience
            </h3>

            <div className="space-y-6">
              
              {/* Pixel2Pixel */}
              <div className="bg-[#121524]/60 p-5 rounded-2xl border border-white/[0.06] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Senior 3D Artist & Team Lead — <span className="text-purple-300">Pixel2Pixel</span>
                    </h4>
                    <span className="text-xs text-gray-400 font-mono">Delhi, India / Hybrid</span>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded">
                    Jan 2020 – Jan 2025 (5 Years)
                  </span>
                </div>

                <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300">
                  <li>Led modeling, photorealistic rendering, interior architectural suites, motion graphics, and WebXR/GameDev pipelines.</li>
                  <li>Assigned and managed tasks across junior and mid-level 3D artists, optimizing studio production throughput by 35%.</li>
                  <li>Delivered flagship commercial campaigns for high-profile clients: <strong>Kohler, Panasonic, Hindware, TATA, JBL, Biocon, GITAM</strong>.</li>
                  <li>Established standardized lighting rigs, PBR material calibration, and ACES color grading workflows.</li>
                </ul>
              </div>

              {/* Freelance */}
              <div className="bg-[#121524]/60 p-5 rounded-2xl border border-white/[0.06] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Freelance Creative Technologist & AI Engineer — <span className="text-cyan-300">Independent Practice</span>
                    </h4>
                    <span className="text-xs text-gray-400 font-mono">Remote / Global</span>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded">
                    2019 – Present
                  </span>
                </div>

                <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300">
                  <li>Constructed custom ComfyUI node workflows (Flux.1 / SDXL / ControlNet) for rapid concept pre-visualization and high-res asset generation.</li>
                  <li>Developed interactive 3D WebGL and Next.js platforms utilizing Antigravity agentic workflows.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Technical Skills Deck */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
              Technical Arsenal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#121524]/40 p-3 rounded-xl border border-white/[0.04]">
                <span className="text-purple-300 font-semibold block mb-1">Spatial & 3D:</span>
                <span className="text-gray-300">Unreal Engine 5.4, Maya, Cinema 4D, Marvelous Designer, Blender, WebXR, Three.js</span>
              </div>

              <div className="bg-[#121524]/40 p-3 rounded-xl border border-white/[0.04]">
                <span className="text-purple-300 font-semibold block mb-1">Generative AI:</span>
                <span className="text-gray-300">ComfyUI, Flux.1, SDXL, LoRA Training, ControlNet Depth/Canny, Antigravity AI</span>
              </div>

              <div className="bg-[#121524]/40 p-3 rounded-xl border border-white/[0.04]">
                <span className="text-purple-300 font-semibold block mb-1">Full-Stack Code:</span>
                <span className="text-gray-300">Next.js 14/15, React, TypeScript, Tailwind CSS, Node.js, WebGL</span>
              </div>

              <div className="bg-[#121524]/40 p-3 rounded-xl border border-white/[0.04]">
                <span className="text-purple-300 font-semibold block mb-1">Post & Motion:</span>
                <span className="text-gray-300">After Effects, Redshift, Octane, Premiere Pro, RealFlow, Photoshop, Figma</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
              Education & Foundation
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-300">
                <span><strong>Diploma in 3D Design</strong> — Arena Animation</span>
                <span className="font-mono text-gray-500">2019 – 2020</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Aeronautical Engineering & Computer Applications Foundation — Kurukshetra University & IGNOU</span>
                <span className="font-mono text-gray-500">Academic Background</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
