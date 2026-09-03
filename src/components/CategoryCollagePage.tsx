'use client';

import React from 'react';
import { CollectionItem, ProjectItem, DOMAINS } from '../data/portfolioData';
import { ArrowLeft } from 'lucide-react';

interface CategoryCollagePageProps {
  category: CollectionItem;
  projects: ProjectItem[];
  onBack: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const CategoryCollagePage: React.FC<CategoryCollagePageProps> = ({
  category,
  projects,
  onBack,
  onSelectProject,
}) => {
  const domain = DOMAINS.find((d) => d.id === category.domainId);

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Sticky Navigation & Breadcrumbs Header */}
      <div className="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0E111D]/70 backdrop-blur-2xl border border-white/10 shadow-xl sticky top-20 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all border border-white/10 hover:border-white/25 shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Categories</span>
          </button>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-gray-400">{domain?.name || 'Projects'}</span>
            <span className="text-gray-600">/</span>
            <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
              {category.title}
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full font-bold">
          {projects.length} Layouts
        </span>
      </div>

      {/* 2. Category Hero Statement (Clean: 1 line heading + 1 line explanation) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E111D]/60 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-display text-white tracking-wide uppercase">
            {category.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            {category.description}
          </p>
        </div>
      </div>

      {/* 3. The Clean Glassmorphic Multi-Project Collage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
        {projects.map((project) => {
          const isWide = project.aspectRatio === 'wide';
          const isTall = project.aspectRatio === 'tall';

          let spanClass = 'col-span-1 row-span-1';
          if (isWide) spanClass = 'col-span-1 md:col-span-2 row-span-1';
          if (isTall) spanClass = 'col-span-1 md:col-span-1 row-span-2';

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 bg-[#0E111D]/60 backdrop-blur-2xl border border-white/10 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/10 ${spanClass} flex flex-col justify-end p-5 sm:p-6`}
            >
              {/* Pure Render Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Translucent Glass Vignette for High Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B13] via-[#080B13]/50 to-transparent" />
              </div>

              {/* Exactly Two Lines: 1 for Heading, 1 for Explanation */}
              <div className="relative z-10 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-display text-white tracking-wide uppercase line-clamp-1 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed font-sans">
                  {project.subtitle || project.shortDescription}
                </p>
              </div>

              {/* Glowing Corner Accents on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-400/30 transition-all pointer-events-none" />
            </div>
          );
        })}
      </div>

    </div>
  );
};
