'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CollectionItem, ProjectItem, DOMAINS } from '../data/portfolioData';
import { X, Layers, ArrowUpRight, Play } from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface CategoryCollageModalProps {
  isOpen: boolean;
  category: CollectionItem | null;
  projects: ProjectItem[];
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  isUnderlay?: boolean;
}

export const CategoryCollageModal: React.FC<CategoryCollageModalProps> = ({
  isOpen,
  category,
  projects,
  onClose,
  onSelectProject,
  isUnderlay = false,
}) => {
  // Use global modal scroll lock & interaction blocker
  useModalScrollLock(isOpen && !isUnderlay);

  // Close on Escape key press (only when active top modal)
  useEffect(() => {
    if (!isOpen || isUnderlay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isUnderlay, onClose]);

  if (!isOpen || !category) return null;

  const domain = DOMAINS.find((d) => d.id === category.domainId);

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-8 pt-6 sm:pt-8 bg-black/92 backdrop-blur-3xl overflow-y-auto overscroll-contain transition-opacity duration-150 ${
          isUnderlay ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
        data-modal-scrollable
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-[88vh] bg-[#070A12] border border-cyan-500/25 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-cyan-500/20 bg-[#090D1A]/90 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {domain?.name || '3D & Spatial Computing'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display text-white tracking-wide uppercase leading-tight">
                  {category.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full font-bold hidden sm:inline-block">
                {projects.length} {category.id === 'product-renders' ? 'Products' : category.id === 'commercial-campaigns' ? 'Commercials' : category.id === 'motion-graphics' ? 'Motion Graphics' : 'Layouts'}
              </span>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content: Category Statement + Glassmorphic Collage Grid */}
          <div className="relative overflow-y-auto px-6 sm:px-8 py-6 flex-1 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
            {/* Category Description Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E1526]/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="max-w-3xl">
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  {category.description}
                </p>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 rounded-xl whitespace-nowrap">
                ✦ Tap any {category.id === 'product-renders' ? 'product' : category.id === 'commercial-campaigns' ? 'commercial' : category.id === 'motion-graphics' ? 'motion graphic' : 'render'} for design study
              </span>
            </div>

            {/* The Glassmorphic Multi-Project Collage Grid: Strictly 2 tabs per horizontal line */}
            <div
              className={`grid gap-6 sm:gap-7 ${
                category.id === 'commercial-campaigns' || category.id === 'motion-graphics'
                  ? 'grid-cols-1 md:grid-cols-2'
                  : category.id === 'premium-kitchen-interiors'
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}
            >
              {projects.map((project) => {
                const isWide = project.aspectRatio === 'wide';
                const isTall = project.aspectRatio === 'tall';
                const isSquare = project.aspectRatio === 'square';

                let spanClass = 'col-span-1 aspect-[16/10]';
                if (category.id === 'commercial-campaigns' || category.id === 'motion-graphics') {
                  spanClass = 'col-span-1 aspect-[16/10]';
                } else if (isWide) {
                  spanClass = 'col-span-1 aspect-[16/10]';
                } else if (isTall) {
                  spanClass = 'col-span-1 aspect-[3/4]';
                } else if (isSquare) {
                  spanClass = 'col-span-1 aspect-square';
                }

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      onSelectProject(project);
                    }}
                    className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 bg-[#0E111D]/80 hover:bg-[#141B2E] backdrop-blur-2xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] ${spanClass} flex flex-col justify-end p-6 sm:p-7`}
                  >
                    {/* Render Image or Muted Video Poster */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                      {project.youtubeId ? (
                        <div className="relative w-full h-full group/video">
                          <img
                            src={
                              project.coverImage && !project.coverImage.includes('youtube.com')
                                ? (project.coverImage.endsWith('.webp') && !project.coverImage.includes('-thumb.webp')
                                    ? project.coverImage.replace('.webp', '-thumb.webp')
                                    : project.coverImage)
                                : `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
                            }
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              if (project.coverImage && target.src !== project.coverImage) {
                                target.src = project.coverImage;
                              }
                            }}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/15 transition-colors">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-purple-500 transition-all backdrop-blur-md border border-purple-400/50">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5 fill-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={
                            project.coverImage.endsWith('.webp') && !project.coverImage.includes('-thumb.webp')
                              ? project.coverImage.replace('.webp', '-thumb.webp')
                              : project.coverImage
                          }
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.src !== project.coverImage) {
                              target.src = project.coverImage;
                            }
                          }}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                      {/* Subtle Bottom Gradient - kept strictly near text only */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-36 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
                    </div>

                    {/* Top Left: Multi-view badge (only for non-video projects) */}
                    {!project.youtubeId && project.views && project.views.length > 1 && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-white font-bold px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{project.views.length} Views</span>
                        </span>
                      </div>
                    )}

                    {/* Top Right Pill: Client / Badge */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold px-3 py-1 rounded-full bg-black/75 border border-cyan-500/40 backdrop-blur-md shadow-md">
                        {project.badge || project.year}
                      </span>
                    </div>

                    {/* Bottom Info: Title & Subtitle */}
                    <div className="relative z-10 space-y-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-display text-white tracking-wide uppercase line-clamp-1 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 flex-shrink-0" />
                      </div>

                      <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed font-sans">
                        {project.subtitle || project.shortDescription}
                      </p>
                    </div>

                    {/* Hover Border Glow */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/30 transition-all pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
