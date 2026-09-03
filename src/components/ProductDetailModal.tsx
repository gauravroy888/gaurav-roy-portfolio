'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { ImageCompareSlider } from './ImageCompareSlider';
import { X, Play, ExternalLink, Github, Sparkles, CheckCircle2, Cpu, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenVideo: (youtubeId: string, title: string, client?: string, role?: string) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  project,
  onClose,
  onOpenVideo,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clay-slider' | 'gallery'>('overview');

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
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigateNext) onNavigateNext();
      if (e.key === 'ArrowLeft' && onNavigatePrev) onNavigatePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigateNext, onNavigatePrev]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#12141D] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#161924] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-gray-200">
              {project.badge}
            </span>
            {project.client && (
              <span className="text-[10px] font-mono text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                Client: {project.client}
              </span>
            )}
            <span className="hidden sm:inline text-xs text-gray-400 font-mono">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onNavigatePrev && (
              <button
                onClick={onNavigatePrev}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Previous Project (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}
            {currentIndex !== undefined && totalCount !== undefined && (
              <span className="text-[11px] font-mono text-gray-400 px-1">
                {currentIndex + 1} / {totalCount}
              </span>
            )}
            {onNavigateNext && (
              <button
                onClick={onNavigateNext}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
                title="Next Project (Right Arrow)"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#12141D]">
          
          {/* Title and Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide uppercase">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Media View Tab Switcher */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              Main View
            </button>

            {project.clayImage && (
              <button
                onClick={() => setActiveTab('clay-slider')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeTab === 'clay-slider'
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Clay vs Render
              </button>
            )}

            {project.youtubeId && (
              <button
                onClick={() => onOpenVideo(project.youtubeId!, project.title, project.client, project.role)}
                className="ml-auto px-4 py-1.5 rounded-full text-xs font-semibold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Watch Video Reel</span>
              </button>
            )}
          </div>

          {/* Media Viewer Display */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
            {activeTab === 'overview' && (
              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {activeTab === 'clay-slider' && project.clayImage && project.finalImage && (
              <ImageCompareSlider
                beforeImage={project.clayImage}
                afterImage={project.finalImage}
                beforeLabel="3D Clay Pass"
                afterLabel="Final Lit Render"
              />
            )}
          </div>

          {/* Metric Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric, i) => (
                <div key={i} className="bg-[#171A26] border border-white/[0.06] rounded-xl p-3 text-center">
                  <div className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
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
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Project Scope & Overview
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {project.fullOverview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Technical Execution & Decisions
                </h4>
                <ul className="space-y-2">
                  {project.technicalDecisions.map((decision, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-gray-300 bg-[#171A26] p-3 rounded-xl border border-white/[0.04]">
                      <span className="w-4 h-4 rounded-full bg-white/10 text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Pipeline Specs */}
            <div className="bg-[#171A26] border border-white/[0.06] rounded-2xl p-4 space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">
                Pipeline Specifications
              </h4>

              <div className="space-y-2.5 text-xs font-mono">
                {project.specs.renderEngine && (
                  <div>
                    <span className="text-gray-500 block text-[10px]">Render Engine:</span>
                    <span className="text-gray-200">{project.specs.renderEngine}</span>
                  </div>
                )}

                {project.specs.polyCount && (
                  <div>
                    <span className="text-gray-500 block text-[10px]">Polygon Count:</span>
                    <span className="text-gray-200">{project.specs.polyCount}</span>
                  </div>
                )}

                {project.specs.software && (
                  <div>
                    <span className="text-gray-500 block text-[10px] mb-1">Software Stack:</span>
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
        <div className="px-6 py-3.5 bg-[#161924] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Enterprise Production Quality</span>
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
            className="text-white hover:text-gray-300 uppercase text-[11px] font-semibold tracking-wider"
          >
            Close (Esc)
          </button>
        </div>

      </div>
    </div>
  );
};
