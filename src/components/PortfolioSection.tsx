'use client';

import React, { useState } from 'react';
import { PROJECTS, COLLECTIONS, CollectionItem, ProjectItem } from '../data/portfolioData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlowBorderCard } from './GlowBorderCard';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectCategory: (category: CollectionItem) => void;
}

const ITEMS_PER_PAGE = 4;

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onSelectCategory,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '3d-design' | 'ads' | 'ai-projects' | 'webxr-unreal'>('all');
  const [currentPage, setCurrentPage] = useState(0);

  const filterTabs = [
    { id: 'all', label: 'All Disciplines' },
    { id: '3d-design', label: '3D Design', domainId: '3d-spatial' },
    { id: 'ads', label: 'Advertisements', domainId: 'brand-motion' },
    { id: 'ai-projects', label: 'AI Projects', domainId: 'gen-ai' },
    { id: 'webxr-unreal', label: 'WebXR & Unreal Engine', domainId: 'full-stack' },
  ];

  const handleFilterChange = (filterId: any) => {
    setActiveFilter(filterId);
    setCurrentPage(0);
  };

  // Get categories relevant to the active tab
  const getFilteredCategories = () => {
    if (activeFilter === 'all') {
      return COLLECTIONS;
    }
    if (activeFilter === '3d-design') {
      return COLLECTIONS.filter((c) => c.domainId === '3d-spatial');
    }
    if (activeFilter === 'ads') {
      return COLLECTIONS.filter((c) => c.domainId === 'brand-motion');
    }
    if (activeFilter === 'ai-projects') {
      return COLLECTIONS.filter((c) => c.domainId === 'gen-ai');
    }
    if (activeFilter === 'webxr-unreal') {
      return COLLECTIONS.filter((c) => c.domainId === 'full-stack' || c.id === 'unreal-engine-realtime');
    }
    return COLLECTIONS;
  };

  const filteredCategories = getFilteredCategories();
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  // Paginated categories (4 at a time to prevent long vertical scrolling)
  const displayedCategories = filteredCategories.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <section id="work" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Encased Container with Subtle Slow Border Beam */}
        <GlowBorderCard
          roundedClassName="rounded-3xl"
          innerClassName="rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl bg-white/[0.02]"
        >
          {/* Top Subtle Rim Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

          {/* Section Header */}
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-purple-300 font-bold block">
              Portfolio Archives
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white tracking-wide uppercase max-w-3xl mx-auto leading-tight">
              Select a category to explore its project collage
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto font-sans">
              Choose any discipline category below to view an artistic glassmorphic collage of all layouts, renders, and technical design thinking case studies.
            </p>
          </div>

          {/* Clean Filter Tabs (Without category count numbers) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                      : 'bg-white/[0.05] text-gray-300 hover:text-white hover:bg-white/[0.1] backdrop-blur-md border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Pagination Controls (Left / Right arrows when multiple pages exist) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 mb-6 text-xs font-mono text-gray-300">
              <span className="text-gray-400 hidden sm:inline">
                Showing{' '}
                <strong className="text-white font-bold">
                  {currentPage * ITEMS_PER_PAGE + 1}–
                  {Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredCategories.length)}
                </strong>{' '}
                of <strong className="text-white font-bold">{filteredCategories.length}</strong> Categories
              </span>

              <div className="flex items-center gap-2.5 ml-auto">
                <span className="text-gray-400 text-xs mr-2">
                  Page <strong className="text-white">{currentPage + 1}</strong> of{' '}
                  <strong className="text-white">{totalPages}</strong>
                </span>

                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-mono font-bold ${
                    currentPage === 0
                      ? 'opacity-30 cursor-not-allowed border-white/10 text-gray-500'
                      : 'border-white/15 bg-white/10 hover:bg-white/20 text-white shadow-sm'
                  }`}
                  title="Previous 4 Categories"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-mono font-bold ${
                    currentPage >= totalPages - 1
                      ? 'opacity-30 cursor-not-allowed border-white/10 text-gray-500'
                      : 'border-white/15 bg-white/10 hover:bg-white/20 text-white shadow-sm'
                  }`}
                  title="Next 4 Categories"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TIER 1: UNCLUTTERED CATEGORY CARDS (Heading + Explanation only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {displayedCategories.map((category) => {
              return (
                <div
                  key={category.id}
                  onClick={() => onSelectCategory(category)}
                  className="group relative bg-[#0E111D]/60 hover:bg-[#141828]/80 backdrop-blur-2xl border border-white/10 hover:border-purple-400/50 rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-500 flex flex-col justify-between shadow-2xl hover:scale-[1.01] hover:shadow-purple-500/10"
                >
                  {/* Clean Category Thumbnail with hardware-level alpha mask (zero subpixel edge artifacts) */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5">
                    <img
                      src={category.thumbnail}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 97%)',
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 97%)',
                      }}
                    />
                  </div>

                  {/* Exactly Two Lines: 1 for Heading, 1 for Explanation */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-display text-white tracking-wide uppercase group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {category.title}
                    </h3>

                    <p className="text-sm text-gray-300 leading-relaxed font-sans line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Bar when multiple pages exist */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-mono font-bold ${
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed border-white/10 text-gray-500'
                    : 'border-white/15 bg-white/10 hover:bg-white/20 text-white shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous 4 Options</span>
              </button>

              {/* Page Indicator Dots */}
              <div className="flex items-center gap-2 px-3">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentPage === idx
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-mono font-bold ${
                  currentPage >= totalPages - 1
                    ? 'opacity-30 cursor-not-allowed border-white/10 text-gray-500'
                    : 'border-white/15 bg-white/10 hover:bg-white/20 text-white shadow-sm'
                }`}
              >
                <span>Next 4 Options</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </GlowBorderCard>

      </div>
    </section>
  );
};
