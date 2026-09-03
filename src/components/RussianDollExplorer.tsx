'use client';

import React, { useState, useMemo } from 'react';
import { DOMAINS, COLLECTIONS, PROJECTS, ProjectItem } from '../data/portfolioData';
import { ProductDetailModal } from './ProductDetailModal';
import { YouTubePlayerModal } from './YouTubePlayerModal';
import {
  ArrowUpRight,
  Sparkles,
  Play,
  Folder,
  SlidersHorizontal,
  ChevronRight,
  Layers,
  Search
} from 'lucide-react';

export const RussianDollExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isFolderMode, setIsFolderMode] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // Video modal state
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    youtubeId?: string;
    title: string;
    client?: string;
    role?: string;
  }>({
    isOpen: false,
    title: '',
  });

  const handleOpenVideo = (youtubeId: string, title: string, client?: string, role?: string) => {
    setVideoModal({
      isOpen: true,
      youtubeId,
      title,
      client,
      role,
    });
  };

  // Categories list
  const categories = [
    { id: 'all', label: 'All Works' },
    { id: '3d-spatial', label: '3D & Spatial' },
    { id: 'brand-motion', label: 'Commercial Reels' },
    { id: 'gen-ai', label: 'Generative AI & Nodes' },
    { id: 'full-stack', label: 'Web & Code' },
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedFolderId) {
      return PROJECTS.filter((p) => p.collectionId === selectedFolderId);
    }
    if (activeCategory === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.domainId === activeCategory);
  }, [activeCategory, selectedFolderId]);

  return (
    <section id="work" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-1">
              Portfolio & Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured Work
            </h2>
          </div>

          {/* Clean Pill Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedFolderId(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat.id && !selectedFolderId
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-[#121522] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Optional Folder Hierarchy Toggle */}
            <button
              onClick={() => setIsFolderMode(!isFolderMode)}
              className={`px-3.5 py-2 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all border ${
                isFolderMode
                  ? 'bg-purple-600/30 text-white border-purple-500/50'
                  : 'bg-[#121522] text-gray-400 hover:text-white border-white/[0.06]'
              }`}
              title="Toggle folder hierarchy view"
            >
              <Folder className="w-3.5 h-3.5 text-purple-400" />
              <span>Folders</span>
            </button>
          </div>
        </div>

        {/* Optional Folder Mode Drilldown */}
        {isFolderMode && (
          <div className="mb-10 p-5 bg-[#10131E]/90 border border-white/[0.08] rounded-2xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Production Directory Series
              </span>
              {selectedFolderId && (
                <button
                  onClick={() => setSelectedFolderId(null)}
                  className="text-purple-400 hover:underline"
                >
                  View All Folders
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setSelectedFolderId(col.id)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    selectedFolderId === col.id
                      ? 'bg-purple-600/20 border-purple-500/50 text-white'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] text-gray-300'
                  }`}
                >
                  <div className="text-xs font-mono font-medium truncate flex items-center gap-1.5">
                    📁 {col.folderName}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-1">
                    {col.itemCount} items
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spacious, Clean Project Grid (Inspired by Reference 1 & 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#111422]/90 hover:bg-[#151A2C] border border-white/[0.08] hover:border-purple-500/40 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm flex flex-col justify-between"
            >
              {/* Media Card */}
              <div className="relative aspect-[16/11] w-full bg-black overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-[#0B0D14]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-gray-300">
                  {project.client || project.badge}
                </div>

                {/* Watch Reel Action if available */}
                {project.youtubeId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenVideo(project.youtubeId!, project.title, project.client, project.role);
                    }}
                    className="absolute top-3 right-3 bg-red-600/80 hover:bg-red-600 backdrop-blur-md p-2 rounded-full border border-white/20 text-white shadow-md transition-transform hover:scale-110"
                    title="Watch Video Reel"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                )}

                {/* Clay Slider Indicator */}
                {project.clayImage && (
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 flex items-center gap-1 border border-white/10">
                    <Sparkles className="w-3 h-3" />
                    Clay Slider
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {project.specs.software.slice(0, 2).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-white/[0.04] text-gray-400 px-2 py-0.5 rounded border border-white/[0.06]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-white group-hover:text-black text-gray-300 flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenVideo={handleOpenVideo}
      />

      {/* 4K YouTube Video Player Modal */}
      <YouTubePlayerModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        youtubeId={videoModal.youtubeId}
        title={videoModal.title}
        client={videoModal.client}
        role={videoModal.role}
      />

    </section>
  );
};
