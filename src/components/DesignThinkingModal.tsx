'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { ImageCompareSlider } from './ImageCompareSlider';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Sun,
  Palette,
  Armchair,
  Box,
  Feather,
  Shapes,
  Heart,
  Shield,
  Zap,
  Cpu,
  Award,
  Maximize2
} from 'lucide-react';

interface DesignThinkingModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const DesignThinkingModal: React.FC<DesignThinkingModalProps> = ({
  project,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount,
}) => {
  const [viewMode, setViewMode] = useState<'render' | 'clay' | 'gallery'>('render');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigateNext) onNavigateNext();
      if (e.key === 'ArrowLeft' && onNavigatePrev) onNavigatePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigateNext, onNavigatePrev]);

  if (!project) return null;

  const dt = project.designThinking;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-300" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-amber-300" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-amber-300" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-cyan-300" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-cyan-300" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  const getAttributeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box':
        return <Box className="w-4 h-4" />;
      case 'Feather':
        return <Feather className="w-4 h-4" />;
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Shapes':
        return <Shapes className="w-4 h-4" />;
      case 'Heart':
        return <Heart className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0F121C]/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black my-auto flex flex-col max-h-[92vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141724]/90 sticky top-0 z-30 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 font-bold text-white">
              {project.badge}
            </span>
            {project.client && (
              <span className="text-xs font-mono text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.08]">
                Client: {project.client}
              </span>
            )}
            <span className="hidden sm:inline text-xs text-gray-400 font-mono">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigatePrev && (
              <button
                onClick={onNavigatePrev}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Previous Layout"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}

            {currentIndex !== undefined && totalCount !== undefined && (
              <span className="text-xs font-mono text-gray-400 px-1">
                {currentIndex + 1} / {totalCount}
              </span>
            )}

            {onNavigateNext && (
              <button
                onClick={onNavigateNext}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Next Layout"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* 1. Project Title & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display text-white tracking-wide uppercase">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-sans">
              {project.subtitle}
            </p>
          </div>

          {/* 2. Interactive Viewport & Compare Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('render')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    viewMode === 'render'
                      ? 'bg-white text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Final Lit Render
                </button>
                {project.clayImage && (
                  <button
                    onClick={() => setViewMode('clay')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === 'clay'
                        ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Clay vs Lit Slider</span>
                  </button>
                )}
              </div>

              <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
                Redshift Photorealistic GPU Pass
              </span>
            </div>

            {/* Viewport Render Surface */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
              {viewMode === 'clay' && project.clayImage ? (
                <ImageCompareSlider
                  beforeImage={project.clayImage}
                  afterImage={project.coverImage}
                  beforeLabel="Clay / Wireframe Pass"
                  afterLabel="Final Lit 8K Render"
                  aspectRatio="aspect-[16/10]"
                />
              ) : (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>

          {/* 3. Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-2 rounded-xl bg-white/[0.02]">
                <div className="font-display text-lg sm:text-2xl text-white tracking-wider">
                  {metric.value}
                </div>
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* 4. DESIGN THINKING & MOODBOARD SPECIFICATION SHEET (Exact match to user reference) */}
          {dt && (
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-inner">
              
              {/* Editorial Concept Banner */}
              <div className="text-center space-y-2 border-b border-white/10 pb-6">
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-purple-300 font-bold">
                  Design Thinking & Visual Philosophy
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif tracking-widest text-amber-100 uppercase">
                  {dt.conceptTitle}
                </h3>
                <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-gray-300 uppercase">
                  {dt.tagline}
                </p>
              </div>

              {/* A. Color Palette Swatches */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-300 font-bold flex items-center gap-2">
                    <Palette className="w-4 h-4 text-purple-300" />
                    <span>Color Palette</span>
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    Click swatch to copy HEX
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {dt.colorPalette.map((swatch, idx) => {
                    const isCopied = copiedHex === swatch.hex;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleCopyHex(swatch.hex)}
                        className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-200"
                        title={`Copy ${swatch.name} (${swatch.hex})`}
                      >
                        <div
                          className="w-12 h-12 rounded-full border border-black/20 shadow-md group-hover:scale-110 transition-transform relative flex items-center justify-center mb-2"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-black drop-shadow" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-gray-200 leading-tight">
                          {swatch.name}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase">
                          {isCopied ? 'Copied!' : swatch.hex}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* B. Luxurious Materials Spec Board (12 Materials) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-300 font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-300" />
                    <span>Luxurious Materials & PBR Specs</span>
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    12 Tactile Surface Finishes
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {dt.materials.map((mat, idx) => (
                    <div
                      key={idx}
                      className="group bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-2xl p-3 flex flex-col transition-all duration-300 shadow-sm"
                    >
                      {/* Physical Texture Sim */}
                      <div
                        className="w-full aspect-[4/3] rounded-xl border border-white/15 shadow-inner mb-2.5 transition-transform group-hover:scale-[1.03]"
                        style={{
                          background: mat.textureGradient || mat.sampleColor,
                          backgroundColor: mat.sampleColor,
                        }}
                      />
                      <span className="text-xs font-bold text-white truncate">
                        {mat.name}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 mt-0.5 truncate">
                        {mat.finish}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* C. Two-Column Split: Key Features + Quote Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Key Features (7 Cols) */}
                <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-200 font-bold border-b border-white/10 pb-2.5">
                    Key Spatial & Architectural Features
                  </div>
                  <div className="space-y-3.5">
                    {dt.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                          {getFeatureIcon(feat.icon)}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {feat.title}
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed mt-0.5">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design Philosophy Quote & Core Pillars (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-6">
                  <div className="space-y-3 text-center my-auto">
                    <span className="text-3xl text-amber-200 font-serif leading-none block">“</span>
                    <blockquote className="text-sm sm:text-base font-serif italic text-amber-100/90 leading-relaxed px-2">
                      {dt.philosophyQuote || 'Art is not just in the walls, but in the way a space makes you feel.'}
                    </blockquote>
                    <span className="text-[11px] font-mono text-gray-400 tracking-wider block">
                      — Creative Direction Philosophy
                    </span>
                  </div>

                  {/* Core Attributes Bar */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2 text-center">
                      Core Spatial Pillars
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {dt.coreAttributes.map((attr, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-200"
                        >
                          {getAttributeIcon(attr.icon)}
                          <span>{attr.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 5. Project Scope & Technical Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Overview & Decisions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300 font-bold block">
                  Project Scope & Overview
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {project.fullOverview}
                </p>
              </div>

              {project.technicalDecisions.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300 font-bold block">
                    Technical Execution & Decisions
                  </span>
                  <div className="space-y-2.5">
                    {project.technicalDecisions.map((decision, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 leading-relaxed flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{decision}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pipeline Specifications (5 Cols) */}
            <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-300 font-bold block border-b border-white/10 pb-2">
                Pipeline Specifications
              </span>

              {project.specs.renderEngine && (
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">
                    Render Engine
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {project.specs.renderEngine}
                  </div>
                </div>
              )}

              {project.specs.polyCount && (
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">
                    Polygon Count
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {project.specs.polyCount}
                  </div>
                </div>
              )}

              {project.specs.software && project.specs.software.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase mb-2">
                    Software Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.specs.software.map((sw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-[11px] font-mono text-gray-200"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.specs.lightingSetup && (
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">
                    Lighting Setup
                  </div>
                  <div className="text-xs text-gray-300 mt-0.5 font-sans">
                    {project.specs.lightingSetup}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#141724]/90 sticky bottom-0 z-30 backdrop-blur-xl">
          <span className="text-xs font-mono text-gray-400">
            Enterprise Production Quality • 100% PBR Calibrated
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors"
          >
            Close (Esc)
          </button>
        </div>

      </div>
    </div>
  );
};
