'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem, ProjectPlanItem } from '../data/portfolioData';
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
  ArrowLeft,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';
import { assetPath } from '../utils/assetPath';

interface ProductDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onBack?: () => void;
  onOpenVideo: (youtubeId: string, title: string, client?: string, role?: string) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

type ModalTab = 'video' | 'overview' | 'gallery' | 'plans' | 'clay-slider' | 'views' | 'stills';

interface LightboxItem {
  url: string;
  title: string;
  subtitle?: string;
  scale?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  project,
  onClose,
  onBack,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalCount,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('video');
  const [videoSource, setVideoSource] = useState<'main' | 'proof'>('main');
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  // Global modal scroll lock & interaction blocker
  useModalScrollLock(Boolean(project || lightboxItem));

  // Reset video source and set default active tab on project change
  useEffect(() => {
    if (!project) return;
    setVideoSource('main');
    if (project.youtubeId) {
      setActiveTab('video');
    } else {
      setActiveTab('overview');
    }
  }, [project?.id, project?.youtubeId]);

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
  const isAdvertisement =
    project.collectionId === 'commercial-campaigns' ||
    project.collectionId === 'motion-graphics' ||
    project.domainId === 'brand-motion';
  const stillsList = project.stills || [];

  return (
    <>
      <div
        className="fixed inset-0 z-[100010] flex items-center justify-center p-2 sm:p-5 md:p-8 pt-4 sm:pt-8 bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn"
        data-modal-scrollable
        onClick={onClose}
      >
      <div
        className="relative w-full max-w-5xl bg-[#0F121C] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black my-auto flex flex-col max-h-[92vh] text-white animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.08] bg-[#141724]/90 sticky top-0 z-30 backdrop-blur-xl gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/15 hover:border-white/30 text-xs font-mono font-bold transition-all group shadow-sm active:scale-95 flex-shrink-0"
                title={`Back to ${
                  project.collectionId === 'product-renders'
                    ? 'All Products'
                    : project.collectionId === 'commercial-campaigns'
                    ? 'All Commercials'
                    : project.collectionId === 'motion-graphics'
                    ? 'All Motion Graphics'
                    : 'All Layouts'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">
                  {project.collectionId === 'product-renders'
                    ? 'All Products'
                    : project.collectionId === 'commercial-campaigns'
                    ? 'All Commercials'
                    : project.collectionId === 'motion-graphics'
                    ? 'All Motion Graphics'
                    : 'All Layouts'}
                </span>
                <span className="sm:hidden">Back</span>
              </button>
            )}
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 font-bold text-white">
              {project.badge}
            </span>
            {project.client && (
              <span className="hidden md:inline-block text-xs font-mono text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.08]">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/15 hover:border-white/30 text-xs font-mono font-bold transition-all ml-1 active:scale-95"
              title="Close (Esc)"
            >
              <span className="hidden sm:inline">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Title and Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-wide uppercase">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Media View Tab Switcher (Horizontally scrollable and perfectly aligned on mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 border-b border-white/[0.08] pb-3 sm:pb-4 overflow-x-auto no-scrollbar">
            {project.youtubeId ? (
              <>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap ${
                    activeTab === 'video'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/50'
                      : 'text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white" />
                  <span className="hidden sm:inline">
                    {project.collectionId === 'motion-graphics'
                      ? 'Motion Graphic Video'
                      : 'Commercial Video'}
                  </span>
                  <span className="sm:hidden">
                    {project.collectionId === 'motion-graphics' ? 'Motion Video' : 'Video'}
                  </span>
                </button>

                {isAdvertisement && (
                  <button
                    onClick={() => setActiveTab('stills')}
                    className={`px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap ${
                      activeTab === 'stills'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/50'
                        : 'text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
                    <span className="hidden sm:inline">Stills / Renders</span>
                    <span className="sm:hidden">Stills</span>
                  </button>
                )}

                {project.storyboardUrl && (
                  <a
                    href={project.storyboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-md group active:scale-95 shrink-0 whitespace-nowrap"
                    title="Open interactive storyboard in a new browser tab"
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Storyboard</span>
                    <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-400 ml-0.5" />
                  </a>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                      : 'text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Master Render</span>
                </button>

                {project.views && project.views.length > 0 ? (
                  <button
                    onClick={() => setActiveTab('views')}
                    className={`px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap ${
                      activeTab === 'views'
                        ? 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20'
                        : 'text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">3D Views & Details ({project.views.length})</span>
                    <span className="sm:hidden">Views ({project.views.length})</span>
                  </button>
                ) : galleryList.length > 0 ? (
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap ${
                      activeTab === 'gallery'
                        ? 'bg-white text-black font-bold shadow-lg'
                        : 'text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Images & Stills ({galleryList.length})</span>
                    <span className="sm:hidden">Gallery ({galleryList.length})</span>
                  </button>
                ) : null}
              </>
            )}
          </div>

          {/* Media Viewer Display */}
          <div className="space-y-3">
            
            {/* 1. Video Player Surface */}
            {activeTab === 'video' && project.youtubeId && (
              <div className="space-y-4">
                {/* Proof Video Switcher (for projects with companion proof video, e.g. Translumina) */}
                {project.proofYoutubeId && (
                  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl w-fit">
                    <button
                      onClick={() => setVideoSource('main')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                        videoSource === 'main'
                          ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Final Commercial Cut</span>
                    </button>
                    <button
                      onClick={() => setVideoSource('proof')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                        videoSource === 'proof'
                          ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>3D Production Proof Video</span>
                    </button>
                  </div>
                )}

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                  <iframe
                    key={videoSource === 'proof' && project.proofYoutubeId ? project.proofYoutubeId : project.youtubeId}
                    src={`https://www.youtube.com/embed/${
                      videoSource === 'proof' && project.proofYoutubeId
                        ? project.proofYoutubeId
                        : project.youtubeId
                    }?autoplay=1&controls=1&rel=0`}
                    title={
                      videoSource === 'proof' && project.proofVideoTitle
                        ? project.proofVideoTitle
                        : project.title
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Concise Details on Video Tab */}
                <div className="bg-[#141724]/80 border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl">
                  <div className="space-y-1 border-b border-white/[0.06] pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold block">
                      Campaign Brief
                    </span>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans max-w-3xl">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-gray-500 text-[11px]">Software:</span>
                      {project.specs.software?.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-gray-300 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      {project.client && (
                        <span className="text-gray-300 text-[11px]">
                          Client: <strong className="text-white">{project.client}</strong>
                        </span>
                      )}
                      {project.role && (
                        <span className="text-gray-400 text-[11px] hidden md:inline">
                          {project.role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Authentic 3D Viewport Proofs (for campaigns with viewport renders, e.g. Kohler Wild at Heart) */}
                {project.views && project.views.length > 0 && (
                  <div className="bg-[#141724]/80 border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-300 font-bold uppercase tracking-wider text-xs">
                          3D Viewport Geometry Proofs ({project.views.length})
                        </span>
                      </div>
                      <span className="text-gray-400 text-[11px] hidden sm:inline">
                        Click to inspect high-poly model in lightbox
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {project.views.map((v) => (
                        <div
                          key={v.id}
                          onClick={() =>
                            setLightboxItem({
                              url: v.highResUrl || v.imageUrl,
                              title: v.name,
                              subtitle: v.description,
                            })
                          }
                          className="group relative rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-emerald-400/50 cursor-pointer transition-all duration-300 shadow-md"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-black">
                            <img
                              src={assetPath(v.imageUrl)}
                              alt={v.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono">
                              <Maximize2 className="w-4 h-4 text-emerald-300" />
                              <span>Inspect High-Poly Proof</span>
                            </div>
                            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30 hidden sm:block">
                              {v.camNumber}
                            </div>
                          </div>
                          <div className="p-3 bg-[#111420] border-t border-white/[0.06] space-y-0.5">
                            <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {v.name}
                            </h4>
                            {v.description && (
                              <p className="text-[11px] text-gray-400 font-sans line-clamp-1">
                                {v.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stills / Renders / Images Section (Only for Advertisement Section) */}
                {isAdvertisement && stillsList.length > 0 && (
                  <div className="bg-[#141724]/80 border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        <span className="text-purple-300 font-bold uppercase tracking-wider text-xs">
                          Stills & Production Renders ({stillsList.length})
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('stills')}
                        className="text-gray-400 hover:text-purple-300 text-[11px] flex items-center gap-1.5 transition-colors font-mono"
                      >
                        <span>Full Stills View</span>
                        <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {stillsList.map((still, idx) => (
                        <div
                          key={still.id || idx}
                          onClick={() =>
                            setLightboxItem({
                              url: still.highResUrl || still.imageUrl,
                              title: still.title,
                              subtitle: still.description || `${project.title} • Still 0${idx + 1}`,
                            })
                          }
                          className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all duration-300 shadow-md hover:scale-[1.02]"
                        >
                          <img
                            src={assetPath(still.imageUrl)}
                            alt={still.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[11px] font-mono">
                            <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
                            <span>Inspect</span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 truncate">
                            <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-gray-300 border border-white/10">
                              {still.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stills / Renders Dedicated Tab Surface (Advertisement Section) */}
            {activeTab === 'stills' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400 bg-white/[0.03] border border-white/[0.08] p-3.5 rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-purple-300 font-bold uppercase tracking-wider text-xs">
                      Campaign Stills, CGI Renders & Lighting Passes ({stillsList.length})
                    </span>
                  </div>
                  <span className="text-gray-400 text-[11px]">
                    Click any still to inspect in full 4K resolution lightbox
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stillsList.map((still, idx) => (
                    <div
                      key={still.id || idx}
                      onClick={() =>
                        setLightboxItem({
                          url: still.highResUrl || still.imageUrl,
                          title: still.title,
                          subtitle: still.description || `${project.title} • Still 0${idx + 1}`,
                        })
                      }
                      className="group relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 hover:border-purple-400/50 cursor-pointer transition-all duration-300 shadow-xl"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <img
                          src={assetPath(still.imageUrl)}
                          alt={still.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono backdrop-blur-[2px]">
                          <Maximize2 className="w-4 h-4 text-purple-300" />
                          <span>Inspect Full Resolution</span>
                        </div>
                        {still.tag && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30 hidden sm:block">
                            {still.tag}
                          </div>
                        )}
                      </div>
                      <div className="p-3.5 bg-[#111420] border-t border-white/[0.06] flex items-center justify-between">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                            {still.title}
                          </h4>
                          {still.description && (
                            <p className="text-[11px] text-gray-400 font-sans mt-0.5 line-clamp-1">
                              {still.description}
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase shrink-0 ml-2">
                          STILL 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Overview Master Render */}
            {activeTab === 'overview' && (
              <div
                className={`relative w-full bg-black/80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center cursor-pointer group ${
                  project.aspectRatio === 'tall' ? 'max-h-[76vh] py-2' : 'aspect-[16/10]'
                }`}
                onClick={() => {
                  const highRes = project.views?.[0]?.highResUrl || project.finalImage || project.coverImage;
                  setLightboxItem({
                    url: highRes,
                    title: project.title,
                    subtitle: project.subtitle,
                  });
                }}
              >
                <img
                  src={assetPath(project.coverImage)}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-contain ${
                    project.aspectRatio === 'tall' ? 'max-h-[74vh] w-auto mx-auto' : 'h-full object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono">
                  <Maximize2 className="w-4 h-4 text-cyan-300" />
                  <span>Click to Inspect Master Resolution (Lightbox)</span>
                </div>
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
                        src={assetPath(img)}
                        alt={`${project.title} - ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono">
                        <Maximize2 className="w-4 h-4" />
                        <span>Expand View</span>
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10 hidden sm:block">
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
                          src={assetPath(plan.image)}
                          alt={plan.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono">
                          <Maximize2 className="w-4 h-4 text-cyan-300" />
                          <span>Inspect Blueprint</span>
                        </div>
                        {plan.scale && (
                          <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 hidden sm:block">
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

            {/* 5. Viewport Screenshot Surface (Direct Image View) */}
            {activeTab === 'clay-slider' && project.clayImage && (
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-black shadow-2xl aspect-[16/10] group flex items-center justify-center">
                <img
                  src={assetPath(project.clayImage)}
                  alt="Cinema 4D Viewport Screenshot"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-500/30 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    Cinema 4D Viewport Screenshot (Authenticity Proof — Not AI)
                  </span>
                </div>
              </div>
            )}

            {/* 6. Viewport Proofs Surface */}
            {activeTab === 'views' && project.views && project.views.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="text-emerald-300 font-bold">
                    Authentic 3D Viewport Geometry & Wireframe Proofs ({project.views.length})
                  </span>
                  <span>Click any viewport render to inspect high-poly geometry</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.views.map((v) => (
                    <div
                      key={v.id}
                      onClick={() =>
                        setLightboxItem({
                          url: v.highResUrl || v.imageUrl,
                          title: v.name,
                          subtitle: v.description,
                        })
                      }
                      className="group relative rounded-2xl overflow-hidden bg-[#151928] border border-white/10 hover:border-emerald-400/50 cursor-pointer transition-all duration-300 shadow-md p-4 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black border border-white/10">
                        <img
                          src={assetPath(v.imageUrl)}
                          alt={v.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono">
                          <Maximize2 className="w-4 h-4 text-emerald-300" />
                          <span>Inspect Viewport Proof</span>
                        </div>
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30 hidden sm:block">
                          {v.camNumber}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {v.name}
                        </h4>
                        {v.description && (
                          <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-2">
                            {v.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Detailed Specifications & Overview (shown on overview / stills tabs, kept concise on video tab) */}
          {(activeTab !== 'video' || !isAdvertisement) && (
            <>
              {/* Metric Highlights */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-[#151824] border border-white/[0.08] hover:border-white/20 rounded-xl p-3 sm:p-3.5 text-center flex flex-col items-center justify-center min-h-[72px] transition-colors"
                    >
                      <div className="text-xs sm:text-sm md:text-[15px] font-sans font-bold text-white tracking-wide uppercase leading-snug break-words">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-gray-400 uppercase tracking-wider mt-1 font-medium">
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
            </>
          )}

        </div>
      </div>
    </div>

      {/* Lightbox Overlay for Fullscreen Image or Blueprint Inspection (Sibling of modal, completely isolated from onClose) */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100020] bg-black flex items-center justify-center p-2 sm:p-4 select-none animate-fadeIn"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxItem(null);
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Prominent Fixed Top-Right Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxItem(null);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="fixed top-4 right-4 z-[100030] p-2.5 sm:p-3 text-white/80 hover:text-white bg-black/60 hover:bg-black border border-white/20 rounded-full transition-all shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
            title="Close Full View (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full h-full max-w-[1920px] max-h-[96vh] flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxItem(null);
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <img
              src={assetPath(lightboxItem.url)}
              alt={lightboxItem.title}
              decoding="async"
              className="w-auto h-auto max-w-full max-h-[88vh] sm:max-h-[92vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            />

            {(lightboxItem.title || lightboxItem.scale) && (
              <div
                className="mt-2 text-center max-w-lg px-4 hidden sm:block"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white font-sans uppercase tracking-wide">
                    {lightboxItem.title}
                  </h4>
                  {lightboxItem.scale && (
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                      {lightboxItem.scale}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
