'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem, CollectionItem, PROJECTS, COLLECTIONS } from '../data/portfolioData';
import { LuxuryBackground } from '../components/LuxuryBackground';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { MetricsBar } from '../components/MetricsBar';
import { CompanyLogosSection } from '../components/CompanyLogosSection';
import { SpecialtiesSection } from '../components/SpecialtiesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { CategoryCollagePage } from '../components/CategoryCollagePage';
import { DesignThinkingModal } from '../components/DesignThinkingModal';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { DesignProcess } from '../components/DesignProcess';
import { ContactFooter } from '../components/ContactFooter';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { YouTubePlayerModal } from '../components/YouTubePlayerModal';
import { ResumeModal } from '../components/ResumeModal';
import { CommandMenuModal } from '../components/CommandMenuModal';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CollectionItem | null>(null);
  const [savedWorkScrollY, setSavedWorkScrollY] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
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

  // Save scroll position when entering a category, and scroll to top of collage
  const handleSelectCategory = (cat: CollectionItem) => {
    setSavedWorkScrollY(window.scrollY);
    setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // When clicking Back to Categories, restore scroll position directly to where the user left off
  const handleBackFromCategory = () => {
    const targetY = savedWorkScrollY;
    setSelectedCategory(null);
    setTimeout(() => {
      const workEl = document.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'instant' });
      } else if (targetY > 0) {
        window.scrollTo({ top: targetY, behavior: 'instant' });
      }
    }, 15);
  };

  // Get active list of projects for navigation (either current category or all)
  const activeProjectPool = selectedCategory
    ? PROJECTS.filter((p) => p.collectionId === selectedCategory.id)
    : PROJECTS;

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = activeProjectPool.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = activeProjectPool.length - 1;
    if (nextIndex >= activeProjectPool.length) nextIndex = 0;
    setSelectedProject(activeProjectPool[nextIndex]);
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

      {/* Top Sticky Navbar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        
        {selectedCategory ? (
          /* TIER 2: Dedicated Glassmorphic Category Collage View */
          <div className="animate-fadeIn">
            <CategoryCollagePage
              category={selectedCategory}
              projects={activeProjectPool}
              onBack={handleBackFromCategory}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
          </div>
        ) : (
          /* DEFAULT FULL HOME PAGE FLOW */
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onOpenResume={() => setResumeOpen(true)}
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
          </>
        )}

      </main>

      {/* 8. Metallic Banner & Footer */}
      <div className="relative z-10 mt-6">
        <ContactFooter
          onOpenResume={() => setResumeOpen(true)}
        />
      </div>

      {/* TIER 3: DESIGN THINKING DETAIL MODAL (Matching User Reference Moodboard) */}
      {selectedProject && selectedProject.designThinking ? (
        <DesignThinkingModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNavigatePrev={() => handleNavigateProject('prev')}
          onNavigateNext={() => handleNavigateProject('next')}
          currentIndex={activeProjectPool.findIndex((p) => p.id === selectedProject.id)}
          totalCount={activeProjectPool.length}
        />
      ) : (
        /* Fallback for projects without full DesignThinking dataset */
        <ProductDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
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

      <CommandMenuModal
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenResume={() => setResumeOpen(true)}
      />

    </div>
  );
}
