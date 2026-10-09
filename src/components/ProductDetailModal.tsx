'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem, ProjectPlanItem } from '../data/portfolioData';
import { ImageCompareSlider } from './ImageCompareSlider';
import {
  X,
  Play,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Compass,
  Eye,
  Maximize2,
  ImagePlus,
  FilePlus,
  Volume2
} from 'lucide-react';

interface ProductDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenVideo: (youtubeId: string, title: string, client?: string, role?: string) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

type ModalTab = 'video' | 'overview' | 'gallery' | 'plans' | 'clay-slider';

interface LightboxItem {
  url: string;
  title: string;
  subtitle?: string;
  scale?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  project,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('video');
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  // Sync initial tab whenever project changes
  useEffect(() => {
    if (project) {
      if (project.youtubeId) {
        setActiveTab('video');
      } else {
        setActiveTab('overview');
      }
      setLightboxItem(null);
    }
  }, [project?.id]);

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

  // Keyboard navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxItem) {
          setLightboxItem(null);
        } else {
          onClose();
        }
      }
      if (!lightboxItem) {
        if (e.key === 'ArrowRight' && onNavigateNext) onNavigateNext();
        if (e.key === 'ArrowLeft' && onNavigatePrev) onNavigatePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigateNext, onNavigatePrev, lightboxItem]);

  if (!project) return null;

  const galleryList = project.galleryImages || [];
  const plansList = project.plans || [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0F121C] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black my-auto flex flex-col max-h-[92vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#141724]/90 sticky top-0 z-30 backdrop-blur-xl">
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
                title="Previous Project (Left Arrow)"
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
                title="Next Project (Right Arrow)"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div className="h-4 w-px bg-white/15 mx-1 hidden sm:block" />
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Title and Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-wide uppercase">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Media View Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-3">
            {project.youtubeId && (
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeTab === 'video'
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                    : 'text-gray-300 hover:text-white bg-white/[0.05]'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Live Video Experience</span>
                <span className="text-[10px] font-normal opacity-80">(Audio On)</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-gray-300 hover:text-white bg-white/[0.05]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Master Render</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-gray-300 hover:text-white bg-white/[0.05]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images & Stills ({galleryList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'plans'
                  ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                  : 'text-gray-300 hover:text-white bg-white/[0.05]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Plans & Schematics ({plansList.length})</span>
            </button>

            {project.clayImage && project.finalImage && (
              <button
                onClick={() => setActiveTab('clay-slider')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeTab === 'clay-slider'
                    ? 'bg-purple-500 text-white font-semibold shadow-md'
                    : 'text-gray-300 hover:text-white bg-white/[0.05]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clay vs Render</span>
              </button>
            )}
          </div>

          {/* Media Viewer Display */}
          <div className="space-y-3">
            
            {/* 1. Video Player Surface */}
            {activeTab === 'video' && project.youtubeId && (
              <div className="space-y-2">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&controls=1&rel=0`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 px-1 pt-1 gap-2">
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <Volume2 className="w-3.5 h-3.5" />
                    Full audio & HD controls enabled • Click fullscreen for immersive 4K playback
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1 text-[11px] underline underline-offset-2"
                  >
                    Open on YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* 2. Overview Master Render */}
            {activeTab === 'overview' && (
              <div className="relative aspect-[16/10] w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* 3. Image Gallery Surface */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Render Stills & High-Res Stills ({galleryList.length})</span>
                  <span>Click any image to inspect full size</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryList.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxItem({ url: img, title: `${project.title} — Shot ${idx + 1}` })}
                      className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all duration-300 shadow-md hover:scale-[1.02]"
                    >
                      <img
                        src={img}
                        alt={`${project.title} - ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono">
                        <Maximize2 className="w-4 h-4" />
                        <span>Expand View</span>
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10">
                        Frame {idx + 1}
                      </div>
                    </div>
                  ))}

                  {/* Add Images Placeholder Slot */}
                  <div className="aspect-[16/10] rounded-xl border-2 border-dashed border-white/15 hover:border-purple-400/50 bg-white/[0.02] hover:bg-white/[0.05] p-5 flex flex-col items-center justify-center text-center transition-all">
                    <ImagePlus className="w-7 h-7 text-purple-300 mb-2" />
                    <span className="text-xs font-bold text-white">Add Project Images</span>
                    <span className="text-[11px] text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                      Add image URLs or local assets to <code className="text-purple-300 font-mono text-[10px]">galleryImages</code> in <code className="text-gray-300 font-mono text-[10px]">portfolioData.ts</code>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Plans & Schematics Surface */}
            {activeTab === 'plans' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="text-cyan-300 font-bold">Architectural Blueprints, Schematics & Plans ({plansList.length})</span>
                  <span>Click any blueprint to zoom & inspect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {plansList.map((plan: ProjectPlanItem, idx: number) => (
                    <div
                      key={idx}
                      onClick={() =>
                        setLightboxItem({
                          url: plan.image,
                          title: plan.title,
                          subtitle: plan.description,
                          scale: plan.scale,
                        })
                      }
                      className="group relative rounded-2xl overflow-hidden bg-[#151928] border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 shadow-md p-4 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black border border-white/10">
                        <img
                          src={plan.image}
                          alt={plan.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono">
                          <Maximize2 className="w-4 h-4 text-cyan-300" />
                          <span>Inspect Blueprint</span>
                        </div>
                        {plan.scale && (
                          <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                            {plan.scale}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                          {plan.type}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {plan.title}
                        </h4>
                        {plan.description && (
                          <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-2">
                            {plan.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Blueprints / Plans Placeholder Slot */}
                  <div className="rounded-2xl border-2 border-dashed border-white/15 hover:border-cyan-400/50 bg-white/[0.02] hover:bg-white/[0.05] p-6 flex flex-col items-center justify-center text-center transition-all min-h-[200px]">
                    <FilePlus className="w-8 h-8 text-cyan-300 mb-2" />
                    <span className="text-xs font-bold text-white">Add Blueprints & Plans</span>
                    <span className="text-[11px] text-gray-400 mt-1 max-w-[220px] leading-relaxed">
                      Add 2D architectural drawings, level blueprints or CAD layouts to <code className="text-cyan-300 font-mono text-[10px]">plans</code> in <code className="text-gray-300 font-mono text-[10px]">portfolioData.ts</code>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Clay Slider Surface */}
            {activeTab === 'clay-slider' && project.clayImage && project.finalImage && (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <ImageCompareSlider
                  beforeImage={project.clayImage}
                  afterImage={project.finalImage}
                  beforeLabel="3D Clay / Wireframe Pass"
                  afterLabel="Final Lit Render"
                />
              </div>
            )}

          </div>

          {/* Metric Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.02] border border-white/10 rounded-2xl p-4">
              {project.metrics.map((metric, i) => (
                <div key={i} className="bg-[#171A26] border border-white/[0.06] rounded-xl p-3 text-center">
                  <div className="text-base sm:text-xl font-display font-bold text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="md:col-span-2 space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-1.5">
                  Project Scope & Overview
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {project.fullOverview}
                </p>
              </div>

              {project.technicalDecisions && project.technicalDecisions.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-2">
                    Technical Execution & Decisions
                  </h4>
                  <ul className="space-y-2">
                    {project.technicalDecisions.map((decision, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-gray-300 bg-[#171A26] p-3 rounded-xl border border-white/[0.04]">
                        <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Pipeline Specs */}
            <div className="bg-[#171A26] border border-white/[0.06] rounded-2xl p-4 space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold border-b border-white/[0.06] pb-2">
                Pipeline Specifications
              </h4>

              <div className="space-y-3 text-xs font-mono">
                {project.specs.renderEngine && (
                  <div>
                    <span className="text-gray-500 block text-[10px]">Render Engine</span>
                    <span className="text-gray-200 font-bold">{project.specs.renderEngine}</span>
                  </div>
                )}

                {project.specs.polyCount && (
                  <div>
                    <span className="text-gray-500 block text-[10px]">Polygon Budget</span>
                    <span className="text-gray-200">{project.specs.polyCount}</span>
                  </div>
                )}

                {project.specs.deliveryFormat && (
                  <div>
                    <span className="text-gray-500 block text-[10px]">Delivery Format</span>
                    <span className="text-gray-200">{project.specs.deliveryFormat}</span>
                  </div>
                )}

                {project.specs.software && (
                  <div>
                    <span className="text-gray-500 block text-[10px] mb-1.5">Software Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {project.specs.software.map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-white/[0.06] px-2 py-0.5 rounded text-gray-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#141724]/90 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-gray-400 sticky bottom-0 z-30 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Enterprise Real-Time & Spatial Quality</span>
            {onNavigateNext && (
              <button
                onClick={onNavigateNext}
                className="text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors font-sans font-medium"
              >
                <span>Next Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors uppercase tracking-wider"
          >
            Close (Esc)
          </button>
        </div>

      </div>

      {/* Lightbox Overlay for Fullscreen Image or Blueprint Inspection */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute -top-10 right-0 p-1.5 text-gray-300 hover:text-white bg-white/10 rounded-full"
              title="Close Full View (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={lightboxItem.url}
              alt={lightboxItem.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />

            <div className="mt-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white font-display uppercase tracking-wide">
                  {lightboxItem.title}
                </h4>
                {lightboxItem.scale && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                    {lightboxItem.scale}
                  </span>
                )}
              </div>
              {lightboxItem.subtitle && (
                <p className="text-xs text-gray-400 font-sans max-w-lg">
                  {lightboxItem.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
