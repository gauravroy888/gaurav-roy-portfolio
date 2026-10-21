'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ProjectItem, ProjectViewAngle } from '../data/portfolioData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  LayoutGrid,
  Maximize2,
  Check,
  Eye,
  Layers,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';

const SOFTWARE_MAP: Record<string, { icon?: string; name: string; tag?: string }> = {
  'Cinema 4D': { icon: '/logos/c4d.png', name: 'Cinema 4D', tag: '3D Modeling' },
  'Corona Render Engine': { icon: '/logos/corona.svg', name: 'Chaos Corona', tag: 'Render Engine' },
  'Corona': { icon: '/logos/corona.svg', name: 'Chaos Corona', tag: 'Render Engine' },
  'Photoshop': { icon: '/logos/photoshop.png', name: 'Adobe Photoshop', tag: '32-Bit Post Edit' },
  'Adobe Photoshop': { icon: '/logos/photoshop.png', name: 'Adobe Photoshop', tag: '32-Bit Post Edit' },
  'Redshift GPU': { icon: '/logos/redshift.svg', name: 'Redshift GPU', tag: 'Render Engine' },
  'Redshift': { icon: '/logos/redshift.svg', name: 'Redshift GPU', tag: 'Render Engine' },
  'Autodesk Maya': { icon: '/logos/maya.png', name: 'Autodesk Maya', tag: 'CAD & Modeling' },
  'Maya': { icon: '/logos/maya.png', name: 'Autodesk Maya', tag: 'CAD & Modeling' },
  'Blender': { icon: '/logos/blender.png', name: 'Blender 3D', tag: 'DCC Suite' },
  'Unreal Engine': { icon: '/logos/unreal.png', name: 'Unreal Engine 5', tag: 'Real-Time' },
  'After Effects': { icon: '/logos/aftereffects.png', name: 'After Effects', tag: 'Motion Design' },
  'Premiere': { icon: '/logos/premiere.png', name: 'Premiere Pro', tag: 'Video Editing' },
  'Illustrator': { icon: '/logos/illustrator.png', name: 'Illustrator', tag: 'Vector Design' },
  'ComfyUI': { icon: '/logos/comfyui.png', name: 'ComfyUI', tag: 'Node Pipelines' },
  'Spline': { icon: '/logos/spline.png', name: 'Spline 3D', tag: 'Real-Time 3D' },
  'Three.js': { icon: '/logos/threejs.png', name: 'Three.js', tag: 'WebGL 3D' },
};

function getSoftwareMeta(sw: string): { icon?: string; name: string; tag?: string } {
  if (SOFTWARE_MAP[sw]) return SOFTWARE_MAP[sw];
  const lower = sw.toLowerCase();
  if (lower.includes('c4d') || lower.includes('cinema')) return { icon: '/logos/c4d.png', name: 'Cinema 4D', tag: '3D Modeling' };
  if (lower.includes('corona')) return { icon: '/logos/corona.svg', name: 'Chaos Corona', tag: 'Render Engine' };
  if (lower.includes('photoshop')) return { icon: '/logos/photoshop.png', name: 'Adobe Photoshop', tag: '32-Bit Post Edit' };
  if (lower.includes('redshift')) return { icon: '/logos/redshift.svg', name: 'Redshift GPU', tag: 'Render Engine' };
  if (lower.includes('maya')) return { icon: '/logos/maya.png', name: 'Autodesk Maya', tag: 'CAD & Modeling' };
  if (lower.includes('blender')) return { icon: '/logos/blender.png', name: 'Blender 3D', tag: 'DCC Suite' };
  if (lower.includes('unreal')) return { icon: '/logos/unreal.png', name: 'Unreal Engine 5', tag: 'Real-Time' };
  return { name: sw };
}

interface DesignThinkingModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onBack?: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const DesignThinkingModal: React.FC<DesignThinkingModalProps> = ({
  project,
  onClose,
  onBack,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount,
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'single' | 'clay' | 'grid'>('single');
  const [selectedViewIndex, setSelectedViewIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Global modal scroll lock & background interaction blocker
  useModalScrollLock(Boolean(project || lightboxImage));

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight' && onNavigateNext && !lightboxImage) onNavigateNext();
      if (e.key === 'ArrowLeft' && onNavigatePrev && !lightboxImage) onNavigatePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigateNext, onNavigatePrev, lightboxImage]);

  // Reset view selection on project change
  useEffect(() => {
    setSelectedViewIndex(0);
    setActiveViewMode('single');
    setLightboxImage(null);
  }, [project?.id]);

  // Assemble all view angles of this layout
  const viewAngles: ProjectViewAngle[] = useMemo(() => {
    if (!project) return [];
    if (project.views && project.views.length > 0) {
      return project.views;
    }
    // Fallback: generate camera angles from coverImage and galleryImages
    const list: ProjectViewAngle[] = [];
    if (project.coverImage) {
      list.push({
        id: 'view-cam-01',
        camNumber: 'CAM 01',
        name: 'Master Wide Perspective',
        tag: 'Primary Master View',
        imageUrl: project.coverImage,
        description: 'Primary architectural camera perspective capturing the full spatial layout.'
      });
    }
    if (project.galleryImages) {
      project.galleryImages.forEach((img, idx) => {
        if (img !== project.coverImage) {
          const camNum = `CAM 0${idx + 2}`;
          list.push({
            id: `view-cam-0${idx + 2}`,
            camNumber: camNum,
            name: idx === 0 ? 'Reverse Layout Angle' : idx === 1 ? 'Vanity & Fixture Detail' : `Camera Perspective 0${idx + 2}`,
            tag: idx === 0 ? 'Reverse Angle' : 'Detail Macro',
            imageUrl: img,
            description: `Alternative spatial view angle highlighting geometry and lighting accents.`
          });
        }
      });
    }
    return list;
  }, [project]);

  if (!project) return null;

  const currentView = viewAngles[selectedViewIndex] || viewAngles[0];

  const hasViewportInViews = useMemo(() => {
    return viewAngles.some(
      (v) =>
        v.camNumber === 'VIEWPORT' ||
        v.id.includes('viewport') ||
        (project?.clayImage && v.imageUrl === project.clayImage)
    );
  }, [viewAngles, project?.clayImage]);

  return (
    <div
      className="fixed inset-0 z-[100010] flex items-center justify-center p-3 sm:p-5 md:p-8 pt-6 sm:pt-8 bg-black/92 backdrop-blur-3xl overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      data-modal-scrollable
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-[#090D18] border border-cyan-500/25 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] my-auto flex flex-col max-h-[92vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP CONTROL BAR */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-cyan-500/20 bg-[#0C1222]/90 sticky top-0 z-30 backdrop-blur-xl gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/60 text-xs font-mono font-bold transition-all group shadow-sm active:scale-95 flex-shrink-0"
                title={`Back to ${project.collectionId === 'product-renders' ? 'All Products' : 'All Layouts'}`}
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
                <span className="hidden sm:inline">
                  {project.collectionId === 'product-renders' ? 'All Products' : 'All Layouts'}
                </span>
                <span className="sm:hidden">Back</span>
              </button>
            )}
            <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-bold text-cyan-300">
              {project.badge || '3D Architecture'}
            </span>
            {project.client && (
              <span className="text-xs font-mono text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.08] hidden sm:inline-block">
                Client: {project.client}
              </span>
            )}
            <span className="hidden md:inline text-xs text-gray-400 font-mono">
              {project.year}
            </span>
          </div>

          {/* Layout Switcher (Prev / Next) + Close */}
          <div className="flex items-center gap-2">
            {onNavigatePrev && (
              <button
                onClick={onNavigatePrev}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
                title={project.collectionId === 'product-renders' ? 'Previous Product' : 'Previous Layout'}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}

            {currentIndex !== undefined && totalCount !== undefined && (
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 font-bold">
                {currentIndex + 1} / {totalCount}
              </span>
            )}

            {onNavigateNext && (
              <button
                onClick={onNavigateNext}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
                title={project.collectionId === 'product-renders' ? 'Next Product' : 'Next Layout'}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <div className="h-4 w-px bg-white/15 mx-1" />

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors ml-1"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. SCROLLABLE STUDIO BODY */}
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent" data-modal-scrollable>
          
          {/* Project Title & Context */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                  {project.collectionId === 'product-renders' ? 'Product Design & Engineering Studio' : 'Multi-Camera Layout Studio'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-white tracking-wide uppercase leading-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-sans mt-0.5 max-w-2xl">
                {project.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full font-bold">
                {viewAngles.length} {project.collectionId === 'product-renders' ? 'Product Views' : 'Camera Views'}
              </span>
              {project.clayImage && (
                <button
                  onClick={() => {
                    const vpIdx = viewAngles.findIndex(
                      (v) =>
                        v.camNumber === 'VIEWPORT' ||
                        v.id.includes('viewport') ||
                        v.imageUrl === project.clayImage
                    );
                    if (vpIdx !== -1) {
                      setSelectedViewIndex(vpIdx);
                      setActiveViewMode('single');
                    } else {
                      setActiveViewMode('clay');
                    }
                  }}
                  className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-500/20 px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer"
                  title="Jump to Cinema 4D Viewport Proof"
                >
                  + Viewport Proof
                </button>
              )}
            </div>
          </div>

          {/* 3. THE MAIN MULTI-VIEW VIEWPORT */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/25 bg-black shadow-2xl min-h-[360px]">
            
            {/* MODE A: SINGLE CAMERA VIEW */}
            {activeViewMode === 'single' && currentView && (
              <div className={`relative w-full bg-black group flex items-center justify-center overflow-hidden ${project.aspectRatio === 'tall' ? 'max-h-[76vh] py-2' : 'aspect-[16/10]'}`}>
                <img
                  src={currentView.imageUrl}
                  alt={currentView.name}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-contain ${project.aspectRatio === 'tall' ? 'max-h-[74vh] w-auto mx-auto' : 'h-full object-cover'} transition-transform duration-700 ease-out group-hover:scale-[1.01]`}
                />

                {/* Top-Left Camera HUD Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/30 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {currentView.camNumber} // {currentView.name}
                  </span>
                  {currentView.tag && (
                    <span className="text-[10px] font-mono text-gray-400 bg-white/10 px-2 py-0.5 rounded ml-1 hidden sm:inline-block">
                      {currentView.tag}
                    </span>
                  )}
                </div>


                {/* Click-to-Zoom Button Overlay */}
                <button
                  onClick={() => setLightboxImage({ url: currentView.highResUrl || currentView.imageUrl, title: currentView.name, subtitle: currentView.description })}
                  className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-xs font-mono text-cyan-300 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentView.highResUrl ? 'Full Raw Image' : 'Full View'}</span>
                </button>

                {/* In-viewport Prev/Next Camera Arrow Buttons */}
                {viewAngles.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedViewIndex((prev) => (prev > 0 ? prev - 1 : viewAngles.length - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-cyan-500 text-white hover:text-black border border-white/20 hover:border-cyan-400 transition-all z-20 flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-xl"
                      title="Previous Camera View"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedViewIndex((prev) => (prev < viewAngles.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-cyan-500 text-white hover:text-black border border-white/20 hover:border-cyan-400 transition-all z-20 flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-xl"
                      title="Next Camera View"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* MODE B: VIEWPORT SCREENSHOT DIRECT IMAGE VIEW (NO SLIDER) */}
            {activeViewMode === 'clay' && project.clayImage && (
              <div className={`relative w-full bg-black group flex items-center justify-center overflow-hidden ${project.aspectRatio === 'tall' ? 'max-h-[76vh] py-2' : 'aspect-[16/10]'}`}>
                <img
                  src={project.clayImage}
                  alt="Cinema 4D Viewport Screenshot"
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-contain ${project.aspectRatio === 'tall' ? 'max-h-[74vh] w-auto mx-auto' : 'h-full object-cover'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                />

                {/* Top-Left Viewport HUD Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-500/30 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    VIEWPORT // Cinema 4D Viewport Screenshot
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded ml-1 border border-emerald-500/20">
                    Authenticity Proof (Not AI)
                  </span>
                </div>


                {/* Click-to-Zoom Button Overlay */}
                <button
                  onClick={() => setLightboxImage({
                    url: project.clayImage!,
                    title: "Cinema 4D Viewport Screenshot",
                    subtitle: "Authenticity Proof — Modeled in Cinema 4D with Native Geometry, Lighting & Shaders (Not AI)"
                  })}
                  className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-xs font-mono text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full Raw Image</span>
                </button>

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* MODE C: MULTI-VIEW ALL ANGLES GRID */}
            {activeViewMode === 'grid' && (
              <div className="p-4 sm:p-6 bg-[#070A12] space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Simultaneous Multi-Camera Layout Sheet
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    ✦ Tap any camera to expand
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {viewAngles.map((angle, idx) => (
                    <div
                      key={angle.id}
                      onClick={() => {
                        setSelectedViewIndex(idx);
                        setActiveViewMode('single');
                      }}
                      className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 cursor-pointer bg-black ${project.aspectRatio === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'} transition-all duration-300 hover:scale-[1.01] shadow-lg`}
                    >
                      <img
                        src={angle.imageUrl}
                        alt={angle.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                      
                      {/* Top Camera Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold">
                        {angle.camNumber}
                      </div>

                      {/* Bottom Title */}
                      <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide group-hover:text-cyan-300 transition-colors">
                          {angle.name}
                        </h4>
                        {angle.tag && (
                          <p className="text-[10px] font-mono text-gray-400">
                            {angle.tag}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Viewport Screenshot Card in Grid (Only shown if not already part of viewAngles) */}
                  {project.clayImage && !hasViewportInViews && (
                    <div
                      onClick={() => setActiveViewMode('clay')}
                      className={`group relative rounded-2xl overflow-hidden border border-emerald-500/30 hover:border-emerald-400 cursor-pointer bg-black ${project.aspectRatio === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'} transition-all duration-300 hover:scale-[1.01] shadow-lg`}
                    >
                      <img
                        src={project.clayImage}
                        alt="Cinema 4D Viewport Screenshot"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                        VIEWPORT PROOF
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors">
                          Viewport Render / Screenshot
                        </h4>
                        <p className="text-[10px] font-mono text-emerald-300/80">
                          Cinema 4D Authenticity Proof • Not AI Generated
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* 5. MULTI-VIEW FILMSTRIP / THUMBNAIL TRAY */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Layout Camera Filmstrip (Click to switch view):</span>
              </span>
              <span className="text-[11px] text-cyan-400">
                {currentView?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2.5">
              {viewAngles.map((angle, idx) => {
                const isSelected = activeViewMode === 'single' && selectedViewIndex === idx;
                return (
                  <button
                    key={angle.id}
                    onClick={() => {
                      setSelectedViewIndex(idx);
                      setActiveViewMode('single');
                    }}
                    className={`relative rounded-xl overflow-hidden border text-left p-1.5 transition-all duration-200 flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`relative w-full rounded-lg overflow-hidden bg-black ${project.aspectRatio === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                      <img
                        src={angle.imageUrl.endsWith('.webp') ? angle.imageUrl.replace('.webp', '-thumb.webp') : angle.imageUrl}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== angle.imageUrl) {
                            target.src = angle.imageUrl;
                          }
                        }}
                        alt={angle.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-cyan-300">
                        {angle.camNumber}
                      </span>
                    </div>
                    <div className="px-1 truncate">
                      <div className="text-[11px] font-bold text-white truncate">
                        {angle.name}
                      </div>
                      <div className="text-[9px] font-mono text-gray-400 truncate">
                        {angle.tag || 'Camera Angle'}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Viewport Screenshot Thumbnail Button (Only shown if not already part of viewAngles) */}
              {project.clayImage && !hasViewportInViews && (
                <button
                  onClick={() => setActiveViewMode('clay')}
                  className={`relative rounded-xl overflow-hidden border text-left p-1.5 transition-all duration-200 flex flex-col gap-1.5 ${
                    activeViewMode === 'clay'
                      ? 'border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'border-white/10 hover:border-emerald-400/40 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className={`relative w-full rounded-lg overflow-hidden bg-black ${project.aspectRatio === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                    <img
                      src={project.clayImage.endsWith('.webp') ? project.clayImage.replace('.webp', '-thumb.webp') : project.clayImage}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== project.clayImage) {
                          target.src = project.clayImage!;
                        }
                      }}
                      alt="Cinema 4D Viewport Screenshot"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-emerald-950/90 text-[9px] font-mono font-bold text-emerald-300">
                      VIEWPORT
                    </span>
                  </div>
                  <div className="px-1 truncate">
                    <div className="text-[11px] font-bold text-white truncate">
                      Viewport Render / Screenshot
                    </div>
                    <div className="text-[9px] font-mono text-emerald-300/80 truncate">
                      Authenticity Proof (C4D)
                    </div>
                  </div>
                </button>
              )}

              {/* All Views Grid Thumbnail Button */}
              {viewAngles.length > 1 && (
                <button
                  onClick={() => setActiveViewMode('grid')}
                  className={`relative rounded-xl overflow-hidden border text-left p-1.5 transition-all duration-200 flex flex-col gap-1.5 ${
                    activeViewMode === 'grid'
                      ? 'border-white bg-white/10 shadow-lg shadow-white/20 scale-[1.02]'
                      : 'border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className={`relative w-full rounded-lg overflow-hidden bg-[#0A0F1D] flex flex-col items-center justify-center border border-white/10 ${project.aspectRatio === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                    <LayoutGrid className="w-5 h-5 text-gray-300" />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-white">
                      GRID
                    </span>
                  </div>
                  <div className="px-1 truncate">
                    <div className="text-[11px] font-bold text-white truncate">
                      All Views Grid
                    </div>
                    <div className="text-[9px] font-mono text-gray-400 truncate">
                      {viewAngles.length} Angle Sheet
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* 5B. MINIMAL SPECIFICATIONS: SOFTWARE PIPELINE & PARTICULAR FINISHES */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#090E1C]/90 border border-cyan-500/20 backdrop-blur-xl space-y-4 shadow-xl">
            
            {/* A. SOFTWARES USED WITH OFFICIAL ICONS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Softwares Used</span>
                </div>
                {project.specs.renderEngine && (
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded-full font-semibold hidden sm:inline-block">
                    {project.specs.renderEngine.includes('Corona')
                      ? 'Chaos Corona Physical GI'
                      : project.specs.renderEngine.includes('Redshift')
                      ? 'Maxon Redshift GPU'
                      : project.specs.renderEngine}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {project.specs.software.map((sw, idx) => {
                  const meta = getSoftwareMeta(sw);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-500/40 transition-all shadow-sm"
                    >
                      {meta.icon ? (
                        <img
                          src={meta.icon}
                          alt={meta.name}
                          loading="lazy"
                          decoding="async"
                          className="w-5 h-5 rounded-md object-contain shrink-0"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[9px] font-mono font-bold text-cyan-300 shrink-0">
                          {meta.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-white leading-tight">
                          {meta.name}
                        </span>
                        {meta.tag && (
                          <span className="text-[9px] font-mono text-gray-400 leading-tight">
                            {meta.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* B. PARTICULAR BATHROOM FINISHES (PRODUCTS, MATERIALS & ARCHITECTURE FINISH) */}
            {project.designThinking?.materials && project.designThinking.materials.length > 0 && (
              <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {project.collectionId === 'premium-kitchen-interiors'
                        ? 'Particular Kitchen Finishes & Materials'
                        : 'Particular Bathroom Finishes & Materials'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 hidden sm:inline-block">
                    Products • Materials • Architecture ({Math.min(project.designThinking.materials.length, 5)} Key Finishes)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {project.designThinking.materials.slice(0, 5).map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-black/50 border border-white/10 hover:border-cyan-500/35 transition-all flex items-center gap-2.5 group shadow-sm"
                    >
                      <div
                        className="w-9 h-9 rounded-xl shrink-0 shadow-inner border border-white/15 group-hover:scale-105 transition-transform"
                        style={{
                          background: mat.textureGradient || mat.sampleColor,
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate" title={mat.name}>
                          {mat.name}
                        </div>
                        <div className="text-[10px] font-mono text-cyan-300 truncate" title={mat.finish}>
                          {mat.finish}
                        </div>
                        <div className="text-[9px] text-gray-400 truncate" title={mat.category}>
                          {mat.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C. BOTTOM CLEAN OVERVIEW & CLOSE BUTTON */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
              <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-3xl">
                {currentView?.description || project.shortDescription}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white border border-white/15 hover:border-cyan-400/40 transition-all whitespace-nowrap self-end sm:self-auto shadow-sm"
              >
                Close (Esc)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX MODAL FOR FULL-RESOLUTION INSPECTION */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100050] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative w-[92vw] h-[86vh] max-w-[1800px] flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-Right Prominent Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-2 -right-2 sm:top-2 sm:right-2 z-30 p-2 sm:p-2.5 text-gray-300 hover:text-white bg-black/80 hover:bg-black border border-white/20 rounded-full hover:scale-105 transition-all shadow-xl backdrop-blur-md"
              title="Close Full View (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Maximum-coverage Raw Image */}
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              decoding="async"
              className="w-full h-full max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_25px_100px_rgba(0,0,0,0.95)]"
            />

            {/* Sleek Floating Bottom HUD Overlay */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-2xl bg-black/85 hover:bg-black/95 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4 max-w-[94%] transition-all">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-white font-sans uppercase tracking-wide truncate">
                  {lightboxImage.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={lightboxImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-300 border border-cyan-500/35 transition-colors flex items-center gap-1 font-semibold"
                  title="Open raw full-resolution file in new browser tab"
                >
                  <span>Open Raw File</span>
                  <span>↗</span>
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/15 transition-colors"
                >
                  Close (Esc)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
