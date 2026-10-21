'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ProjectItem, CollectionItem, PROJECTS, COLLECTIONS } from '../data/portfolioData';
import { LuxuryBackground } from '../components/LuxuryBackground';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { MetricsBar } from '../components/MetricsBar';
import { CompanyLogosSection } from '../components/CompanyLogosSection';
import { SpecialtiesSection } from '../components/SpecialtiesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { DesignProcess } from '../components/DesignProcess';
import { ContactFooter } from '../components/ContactFooter';
import { useModalScrollLock } from '../utils/modalScrollLock';

// Dynamically imported interactive components & modals (SSR false, lazy chunks)
const CuteSpiderCompanion = dynamic(
  () => import('../components/CuteSpiderCompanion').then((mod) => mod.CuteSpiderCompanion),
  { ssr: false }
);

const CategoryCollageModal = dynamic(
  () => import('../components/CategoryCollageModal').then((mod) => mod.CategoryCollageModal),
  { ssr: false }
);

const DesignThinkingModal = dynamic(
  () => import('../components/DesignThinkingModal').then((mod) => mod.DesignThinkingModal),
  { ssr: false }
);

const ProductDetailModal = dynamic(
  () => import('../components/ProductDetailModal').then((mod) => mod.ProductDetailModal),
  { ssr: false }
);

const YouTubePlayerModal = dynamic(
  () => import('../components/YouTubePlayerModal').then((mod) => mod.YouTubePlayerModal),
  { ssr: false }
);

const ResumeModal = dynamic(
  () => import('../components/ResumeModal').then((mod) => mod.ResumeModal),
  { ssr: false }
);

const CommandMenuModal = dynamic(
  () => import('../components/CommandMenuModal').then((mod) => mod.CommandMenuModal),
  { ssr: false }
);

const StoryTimelineModal = dynamic(
  () => import('../components/StoryTimelineModal').then((mod) => mod.StoryTimelineModal),
  { ssr: false }
);

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CollectionItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
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

  const isAnyModalOpen = Boolean(
    selectedCategory ||
    selectedProject ||
    resumeOpen ||
    storyOpen ||
    commandOpen ||
    videoModal.isOpen
  );

  // Global root modal scroll lock and interaction blocker
  useModalScrollLock(isAnyModalOpen);

  // Idle preload primary modals so when a user clicks on mobile or desktop, the modal opens INSTANTLY with 0 lag
  useEffect(() => {
    const idlePreload = () => {
      import('../components/CategoryCollageModal');
      import('../components/ProductDetailModal');
      import('../components/DesignThinkingModal');
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(idlePreload, { timeout: 2500 });
        return () => {
          if ('cancelIdleCallback' in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
          }
        };
      } else {
        const timer = setTimeout(idlePreload, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Open category collage modal popup over current website
  const handleSelectCategory = (cat: CollectionItem) => {
    setSelectedCategory(cat);
  };

  // Determine active collection ID from selectedCategory OR selectedProject
  const currentCollectionId = selectedCategory?.id || selectedProject?.collectionId;

  // Active list of projects for navigation (strictly scoped to the current category/tab)
  const activeProjectPool = useMemo(() => {
    if (currentCollectionId) {
      const filtered = PROJECTS.filter((p) => p.collectionId === currentCollectionId);
      if (filtered.length > 0) return filtered;
    }
    return PROJECTS;
  }, [currentCollectionId]);

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = activeProjectPool.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = activeProjectPool.length - 1;
    if (nextIndex >= activeProjectPool.length) nextIndex = 0;
    setSelectedProject(activeProjectPool[nextIndex]);
  };

  // Back button handler: return to the category collage grid
  const handleBackToLayouts = () => {
    if (selectedProject) {
      const cat = COLLECTIONS.find((c) => c.id === selectedProject.collectionId);
      if (cat) {
        setSelectedCategory(cat);
      }
    }
    setSelectedProject(null);
  };

  // Close handler: close modals and return to main website
  const handleCloseProject = () => {
    setSelectedProject(null);
    setSelectedCategory(null);
  };

  const handleOpenVideo = (youtubeId: string, title: string, client?: string, role?: string) => {
    setVideoModal({
      isOpen: true,
      youtubeId,
      title,
      client,
      role,
    });
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#E4E7EE] selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* Rich Studio Lighting Dark Gradient Background with Top-Edge Dome */}
      <LuxuryBackground />

      {/* 3D Depth-Segregated Cute Spider Companion */}
      <CuteSpiderCompanion />

      {/* Top Sticky Navbar & Main Website Content (Non-interactive when any popup is open) */}
      <div className={isAnyModalOpen ? 'pointer-events-none select-none' : ''}>
        <Navbar
          onOpenResume={() => setResumeOpen(true)}
          onOpenCommand={() => setCommandOpen(true)}
        />

        {/* Main Page Flow - Unconditionally mounted at all times */}
        <main className="relative z-10">
          {/* 1. Hero Section */}
          <HeroSection
            onOpenResume={() => setResumeOpen(true)}
            onOpenStory={() => setStoryOpen(true)}
          />

          {/* 2. Metrics Bar (Directly connected beneath Hero) */}
          <MetricsBar />

          {/* 3. Companies & Enterprise Brands Section */}
          <div className="mt-4">
            <CompanyLogosSection />
          </div>

          {/* 4. SERVICES: My Specialties */}
          <div className="mt-4">
            <SpecialtiesSection />
          </div>

          {/* 5. TIER 1: PORTFOLIO ARCHIVES & CATEGORIES */}
          <div className="mt-4">
            <PortfolioSection
              onSelectProject={(proj) => setSelectedProject(proj)}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* 6. Capabilities & Tools Deck */}
          <div className="mt-4">
            <CapabilitiesSection />
          </div>

          {/* 7. My Design Process */}
          <div className="mt-4">
            <DesignProcess />
          </div>
        </main>

        {/* 8. Metallic Banner & Footer */}
        <div className="relative z-10 mt-6">
          <ContactFooter
            onOpenResume={() => setResumeOpen(true)}
          />
        </div>
      </div>

      {/* PERSISTENT BLUR BACKDROP: Keeps background website blurred across all modal transitions */}
      <div
        className={`fixed inset-0 z-[99990] bg-black/92 backdrop-blur-3xl transition-opacity duration-200 ${
          selectedCategory || selectedProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={handleCloseProject}
      />

      {/* TIER 2: CATEGORY COLLAGE POPUP MODAL (Window over website) */}
      <CategoryCollageModal
        isOpen={Boolean(selectedCategory)}
        category={selectedCategory}
        projects={activeProjectPool}
        isUnderlay={Boolean(selectedProject)}
        onClose={() => setSelectedCategory(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* TIER 3: DESIGN THINKING DETAIL MODAL (Matching User Reference Moodboard) */}
      {selectedProject && selectedProject.designThinking ? (
        <DesignThinkingModal
          project={selectedProject}
          onClose={handleCloseProject}
          onBack={handleBackToLayouts}
          onNavigatePrev={() => handleNavigateProject('prev')}
          onNavigateNext={() => handleNavigateProject('next')}
          currentIndex={activeProjectPool.findIndex((p) => p.id === selectedProject.id)}
          totalCount={activeProjectPool.length}
        />
      ) : (
        /* Fallback for projects without full DesignThinking dataset */
        <ProductDetailModal
          project={selectedProject}
          onClose={handleCloseProject}
          onBack={handleBackToLayouts}
          onOpenVideo={handleOpenVideo}
          onNavigatePrev={() => handleNavigateProject('prev')}
          onNavigateNext={() => handleNavigateProject('next')}
          currentIndex={selectedProject ? activeProjectPool.findIndex((p) => p.id === selectedProject.id) : undefined}
          totalCount={activeProjectPool.length}
        />
      )}

      {/* Supporting Modals */}
      <YouTubePlayerModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        youtubeId={videoModal.youtubeId}
        title={videoModal.title}
        client={videoModal.client}
        role={videoModal.role}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <StoryTimelineModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
      />

      <CommandMenuModal
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenResume={() => setResumeOpen(true)}
      />

    </div>
  );
}
