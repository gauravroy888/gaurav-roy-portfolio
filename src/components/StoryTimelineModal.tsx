'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Camera,
  ZoomIn,
  Play,
  Film,
  CheckCircle2,
  ArrowUpRight,
  Grid,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface StoryTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * INTRO VIDEO CONFIGURATION (TOP CINEMATIC SCREEN)
 * Gaurav: When you shoot your intro video:
 * 1. For YouTube: Set `youtubeId` to your video's ID (e.g. 'H9XmsDbvflM')
 * 2. For Direct MP4 / Google Drive link: Set `directVideoUrl` to '/videos/intro.mp4'
 */
export const INTRO_VIDEO_CONFIG = {
  youtubeId: 'H9XmsDbvflM', // High-end 3D showreel sample
  directVideoUrl: '', // Leave empty to use YouTube embed, or set local path e.g. '/videos/intro.mp4'
  badge: 'Watch My Intro',
  posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
};

export interface TimelineMilestone {
  id: string;
  year: string;
  yearColor: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  imagePlaceholderTitle: string;
  imagePlaceholderDesc: string;
  imageUrl?: string; // Single cover image shown before opening
  gallery?: string[]; // Multiple images shown in collage after opening
  collageSlots?: { title: string; subtitle: string }[];
}

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'm1',
    year: '2018 — 2019',
    yearColor: '#38BDF8', // Sky Blue
    category: 'The Spark',
    title: 'Aeronautical Discipline to 3D Graphics',
    description:
      'Transitioned from aeronautical engineering into 3D computer graphics, translating drafting precision and mechanical CAD principles into hard-surface polygonal geometry.',
    highlights: [
      'Mathematical spatial foundation & CAD topology principles',
      'First digital sculpting & hard-surface experiments',
    ],
    imagePlaceholderTitle: 'Early Sketches & 3D Studies',
    imagePlaceholderDesc: 'Drop early concept sketches, topology wireframes, or drafting work here.',
    imageUrl: undefined,
    gallery: undefined,
    collageSlots: [
      { title: 'Aeronautical CAD Models', subtitle: 'Mathematical drafting & mechanical assemblies' },
      { title: 'Topology & Quad Wireframes', subtitle: 'Edge loop flow & surface curvature studies' },
      { title: 'Early Maya 3D Studies', subtitle: 'First hard-surface boolean experiments' },
    ],
  },
  {
    id: 'm2',
    year: '2019 — 2020',
    yearColor: '#60A5FA', // Electric Blue
    category: 'Arena Animation',
    title: 'Diploma in 3D Design & Computer Graphics',
    description:
      'Mastered the complete 3D production pipeline at Arena Animation, specializing in photorealistic lighting, UV unwrapping, digital sculpting, and material shading.',
    highlights: [
      'Comprehensive 3D pipeline: modeling, UV unwrapping & texturing',
      'First architectural and product visualization studies',
    ],
    imagePlaceholderTitle: 'Arena Animation Projects',
    imagePlaceholderDesc: 'Drop diploma showcase pieces, student reels, or clay renders here.',
    imageUrl: undefined,
    gallery: undefined,
    collageSlots: [
      { title: 'Diploma Showcase Frame', subtitle: 'Arena Animation graduating reel flagship piece' },
      { title: 'Clay Shaders & UV Unwrapping', subtitle: 'Coordinate texture unwrap & ambient occlusion' },
      { title: 'Lighting & Shading Rigs', subtitle: 'Photometric IES studio illumination setups' },
    ],
  },
  {
    id: 'm3',
    year: '2020 — 2021',
    yearColor: '#22D3EE', // Cyan
    category: 'Pixel2Pixel Studio',
    title: 'Joining Pixel2Pixel & Studio Production',
    description:
      'Led commercial photorealistic CGI renders for high-end interior spaces, introducing ACEScg color management workflows, IES light distribution profiles, and tactile material shaders.',
    highlights: [
      'Photorealistic interior suites for flagship sanitaryware brands',
      'Implemented ACEScg color management pipeline for studio assets',
    ],
    imagePlaceholderTitle: 'Studio Commercial CGI Stills',
    imagePlaceholderDesc: 'Early Pixel2Pixel interior suite stills or wireframe breakdowns.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    ],
    collageSlots: [
      { title: 'Master Kitchen Suite', subtitle: 'Commercial photorealistic architectural render' },
      { title: 'Sanitaryware Luxury Suite', subtitle: 'Tactile ceramics & reflective glass passes' },
      { title: 'IES Photometric Studio Lighting', subtitle: 'ACEScg high-dynamic color pipeline' },
    ],
  },
  {
    id: 'm4',
    year: '2021 — 2022',
    yearColor: '#818CF8', // Indigo
    category: 'Master Craft',
    title: 'High-End CGI & Tactile PBR Materials',
    description:
      'Engineered procedural PBR shaders for backlit Italian marble, fluted glass, hand-troweled plaster, and brushed champagne anodized metals with optical light accuracy.',
    highlights: [
      'Subsurface scattering (SSS) calibration for translucent ceramics',
      'Volumetric lighting dispersion and physical depth-of-field',
    ],
    imagePlaceholderTitle: 'Macro Material & PBR Renders',
    imagePlaceholderDesc: 'Macro material tests, lighting passes, or clay-vs-final comparisons.',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    ],
    collageSlots: [
      { title: 'Macro Material Shaders', subtitle: 'Procedural micro-displacement & surface roughness' },
      { title: 'Fluted Glass & Backlit Marble', subtitle: 'Subsurface scattering (SSS) physical calibration' },
      { title: 'Champagne Anodized Metals', subtitle: 'Redshift anisotropic reflection passes' },
    ],
  },
  {
    id: 'm5',
    year: '2022 — 2023',
    yearColor: '#38BDF8', // Sky Blue
    category: 'Enterprise Delivery',
    title: 'Flagship Campaigns: Kohler, Panasonic & TATA',
    description:
      'Directed high-profile commercial launch videos, fluid atomization simulations, and exploded-view CGI animations for enterprise clients including Kohler, Panasonic, TATA, and JBL.',
    highlights: [
      'Fluid atomization simulations for Kohler luxury showerheads',
      'Exploded-view IoT device animations for Panasonic Miraie platform',
      'Commercials broadcasted across 12 international territories',
    ],
    imagePlaceholderTitle: 'Kohler & Panasonic Launch Frames',
    imagePlaceholderDesc: 'High-res frames from Kohler Matte Black reel or Panasonic commercial.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    ],
    collageSlots: [
      { title: 'Kohler Luxury Showerhead', subtitle: 'Fluid atomization volumetric water particles' },
      { title: 'Panasonic Miraie Exploded View', subtitle: 'Precision mechanical assembly exploded CGI' },
      { title: 'International Broadcast Reels', subtitle: 'Broadcast commercial cuts across 12 countries' },
    ],
  },
  {
    id: 'm6',
    year: '2023 — 2024',
    yearColor: '#A78BFA', // Violet
    category: 'Creative Leadership',
    title: 'Senior 3D Artist & Studio Team Lead',
    description:
      'Directed multidisciplinary teams of 3D visualizers, engineering modular lighting templates and shader libraries that accelerated commercial project turnaround times by 35%.',
    highlights: [
      'Led and mentored junior artists across complex multi-room projects',
      'Spearheaded production for Biocon and GITAM University showcases',
    ],
    imagePlaceholderTitle: 'Studio Team & Production Sets',
    imagePlaceholderDesc: 'Drop studio workstation photos, team moments, or production setup diagrams here.',
    imageUrl: undefined,
    gallery: undefined,
    collageSlots: [
      { title: 'Studio Team & Workstation', subtitle: 'Artists mentorship & production lead sets' },
      { title: 'Modular Lighting Master Library', subtitle: 'Accelerated commercial turnaround pipelines' },
      { title: 'Biocon & GITAM University', subtitle: 'High-profile commercial showcase renders' },
    ],
  },
  {
    id: 'm7',
    year: '2024 — 2025',
    yearColor: '#34D399', // Mint / Emerald
    category: 'Real-Time Frontier',
    title: 'Unreal Engine 5 & WebXR Virtual Production',
    description:
      'Pioneered 60FPS real-time virtual production in Unreal Engine 5, building interactive WebXR device simulators, Lumen dynamic illumination, and Nanite geometry pipelines.',
    highlights: [
      'Lumen real-time dynamic global illumination & Nanite streaming geometry',
      'Interactive WebXR device configurator & spatial presentation suites',
    ],
    imagePlaceholderTitle: 'UE5 Viewport & Real-Time Setup',
    imagePlaceholderDesc: 'UE5 raytracing buffer screenshots, Blueprint node trees, or WebXR captures.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1633493106115-fa0c8c076579?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    ],
    collageSlots: [
      { title: 'UE5 Lumen Real-Time Illumination', subtitle: 'Dynamic global illumination & bounce bounce' },
      { title: 'Nanite Geometry Density Buffer', subtitle: 'Micro-polygon virtualized geometry rendering' },
      { title: 'Interactive WebXR 3D Walkthrough', subtitle: 'Browser spatial presentation suite' },
    ],
  },
  {
    id: 'm8',
    year: '2025 — Present',
    yearColor: '#38BDF8', // Sky Blue
    category: 'Next-Gen Horizon',
    title: 'Creative Technologist: ComfyUI, GenAI & Spatial Web',
    description:
      'Architecting automated ComfyUI node workflows, custom LoRA model fine-tuning, and full-stack interactive spatial web experiences with real-time AI companion agents.',
    highlights: [
      'Multi-pass ControlNet generation pipelines slashing pre-vis from days to hours',
      'Interactive 3D spatial companion with Web Audio synthesis & procedural kinematics',
      'Next.js 14 full-stack spatial web engineering',
    ],
    imagePlaceholderTitle: 'ComfyUI Graph & Spatial AI Systems',
    imagePlaceholderDesc: 'Drop screenshots of your ComfyUI node networks, LoRA test outputs, or companion code here.',
    imageUrl: undefined,
    gallery: undefined,
    collageSlots: [
      { title: 'ComfyUI Automated Node Pipelines', subtitle: 'Multi-pass ControlNet & pre-vis pipelines' },
      { title: 'Custom LoRA Fine-Tuning Graphs', subtitle: 'Artisan style weights & latent diffusion models' },
      { title: 'Spatial Web Companion Architecture', subtitle: 'Interactive Web Audio physics & browser AI' },
    ],
  },
];

export const StoryTimelineModal: React.FC<StoryTimelineModalProps> = ({ isOpen, onClose }) => {
  // Global modal scroll lock & interaction blocker
  useModalScrollLock(isOpen);

  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'collage' | 'spotlight'>('collage');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 1. Reset video playback whenever the modal opens or closes (No autoplay on open!)
  useEffect(() => {
    setIsPlayingIntro(false);
  }, [isOpen]);

  // 2. Reset photo index and view mode whenever a milestone card is opened
  useEffect(() => {
    if (selectedMilestone) {
      setActivePhotoIndex(0);
      setViewMode('collage');
    }
  }, [selectedMilestone]);

  // 3. Automatically stop playback when the video scrolls out of sight
  useEffect(() => {
    if (!isPlayingIntro || !scrollContainerRef.current || !videoContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsPlayingIntro(false);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.05,
      }
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [isPlayingIntro]);

  // Fallback scroll listener: instantly stop when scrolled down past the top video section
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isPlayingIntro) return;
    if (e.currentTarget.scrollTop > 380) {
      setIsPlayingIntro(false);
    }
  };

  // 4. Keyboard navigation: Escape key closes lightbox or modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedMilestone) {
          setSelectedMilestone(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedMilestone, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/92 backdrop-blur-3xl overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      data-modal-scrollable
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#070A12] border border-cyan-500/25 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background atmospheric bluish ambient glow */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* 1. TOP HEADER (Centered, elegant, matching website design language) */}
        <div className="relative flex items-center justify-center px-6 sm:px-8 py-5 border-b border-cyan-500/20 bg-[#0B101D]/90 backdrop-blur-2xl z-20 flex-shrink-0">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                The Creative Evolution
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wider uppercase font-display">
              My Journey
            </h2>
          </div>

          {/* Close button pinned to absolute right */}
          <button
            onClick={onClose}
            className="absolute right-5 sm:right-7 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all border border-white/10 hover:border-cyan-500/40 shadow-sm"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. SCROLLABLE TIMELINE BODY */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative overflow-y-auto overscroll-contain px-4 sm:px-8 py-6 flex-1 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
          data-modal-scrollable
        >
          
          {/* TOP CINEMATIC VIDEO SCREEN */}
          <div ref={videoContainerRef} className="w-full max-w-3xl sm:max-w-4xl mx-auto pt-2 pb-0">
            {/* Pill button only: "Watch My Intro" */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                <span>{INTRO_VIDEO_CONFIG.badge}</span>
              </div>
            </div>

            {/* 16:9 Cinematic Video Frame */}
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#0B101D] shadow-[0_20px_60px_rgba(0,0,0,0.85)] group">
              {isPlayingIntro ? (
                INTRO_VIDEO_CONFIG.directVideoUrl ? (
                  <video
                    src={INTRO_VIDEO_CONFIG.directVideoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${INTRO_VIDEO_CONFIG.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title="Gaurav Story Intro Reel"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <div
                  onClick={() => setIsPlayingIntro(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer group/poster flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={INTRO_VIDEO_CONFIG.posterUrl}
                    alt="Intro Reel Poster"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-700 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-black/40 to-black/20" />

                  {/* Ambient cyan glow behind play button */}
                  <div className="absolute w-28 h-28 rounded-full bg-cyan-500/30 blur-2xl group-hover/poster:bg-cyan-400/50 transition-all pointer-events-none" />

                  {/* Play Button */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.7)] group-hover/poster:scale-110 group-hover/poster:bg-cyan-400 group-hover/poster:text-black transition-all duration-300">
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-mono tracking-widest text-cyan-300 uppercase px-3.5 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md">
                      Watch My Intro
                    </span>
                  </div>

                  {/* Bottom banner notice */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] sm:text-xs font-mono text-gray-300">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-semibold tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      CINEMATIC 3D & SPATIAL SHOWREEL
                    </span>
                    <span className="hidden sm:inline text-gray-400 font-mono tracking-wider">1080p 60FPS</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VERTICAL CONNECTOR STEM (From Video Screen directly into Starting Dot) */}
          <div className="relative w-full flex items-center justify-start md:justify-center pl-6 md:pl-0">
            <div className="w-[2px] h-10 sm:h-12 bg-gradient-to-b from-cyan-400 to-cyan-400 shadow-[0_0_12px_rgba(56,189,248,1)] animate-pulse" />
          </div>

          {/* Inner content wrapper with timeline milestones */}
          <div className="relative pb-10">
            
            {/* THE CENTRAL VERTICAL BLUISH/CYAN SPINE */}
            <div className="absolute top-0 bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

            {/* Top Spine Terminal Node (Circled in red in sketch, connected directly to video stem) */}
            <div className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#070A12] shadow-[0_0_14px_rgba(56,189,248,1)] z-20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#070A12] animate-ping" />
            </div>

            {/* Bottom Spine Terminal Node */}
            <div className="absolute bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 border-2 border-[#070A12] shadow-[0_0_10px_rgba(168,85,247,0.9)] z-20" />

            {/* Alternating Timeline Items */}
            <div className="space-y-16 sm:space-y-20 pt-8">
              {TIMELINE_DATA.map((item, index) => {
                const isLeft = index % 2 === 0; // Even items on Left, Odd items on Right

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col md:flex-row items-center w-full"
                  >
                    {/* Central Node on the Spine */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 border-2 border-[#070A12] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.9)] z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#070A12]" />
                    </div>

                    {/* ============================================================== */}
                    {/* DESKTOP LAYOUT (md and above) */}
                    {/* ============================================================== */}

                    {/* --- CASE 1: MILESTONE IS ON THE LEFT --- */}
                    {isLeft ? (
                      <>
                        {/* Left Column: Big Card [Clean Single Image Before Opening] ─── Spine */}
                        <div className="hidden md:flex w-1/2 items-center justify-end relative pr-10">
                          {/* The Card */}
                          <div
                            onClick={() => setSelectedMilestone(item)}
                            className="w-full max-w-[430px] rounded-3xl border border-white/10 bg-[#0E1526]/85 hover:bg-[#131C33]/95 hover:border-cyan-500/40 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                          >
                            {/* Card Top: Year & Category */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span
                                className="text-2xl sm:text-3xl font-black font-display tracking-tight leading-none"
                                style={{ color: item.yearColor }}
                              >
                                {item.year}
                              </span>
                              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold uppercase">
                                {item.category}
                              </span>
                            </div>

                            {/* Title (Clean, no subtitle!) */}
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h3>

                            {/* SINGLE COVER IMAGE BEFORE OPENING */}
                            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#070A12] mb-3 group/img">
                              {item.imageUrl ? (
                                <>
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-black/15 group-hover/img:bg-black/0 transition-colors" />
                                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                                    <Grid className="w-3 h-3 text-cyan-400" />
                                    <span>{item.gallery ? `${item.gallery.length} Photos Collage` : '3-Photo Collage'}</span>
                                  </span>
                                </>
                              ) : (
                                <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
                                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 shadow-inner group-hover/img:scale-110 transition-transform">
                                    <Camera className="w-5 h-5" />
                                  </div>
                                  <span className="text-xs font-bold text-white group-hover/img:text-cyan-300 transition-colors leading-tight line-clamp-1">
                                    {item.imagePlaceholderTitle}
                                  </span>
                                  <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                                    {item.imagePlaceholderDesc}
                                  </span>
                                  <span className="mt-2 text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                                    <Grid className="w-3 h-3" />
                                    <span>Open Photo Collage</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* PUNCHY DESCRIPTION AT BOTTOM (No hashtags!) */}
                            <p className="text-xs text-gray-300 font-sans leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Horizontal Connector Stem (Touching center node) */}
                          <div className="w-10 h-[2px] bg-gradient-to-r from-cyan-400/80 to-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                        </div>

                        {/* Right Column: EMPTY (Infographic Zig-Zag Rhythm) */}
                        <div className="hidden md:block w-1/2 pl-10" />
                      </>
                    ) : (
                      /* --- CASE 2: MILESTONE IS ON THE RIGHT --- */
                      <>
                        {/* Left Column: EMPTY (Infographic Zig-Zag Rhythm) */}
                        <div className="hidden md:block w-1/2 pr-10" />

                        {/* Right Column: Spine ─── Big Card [Clean Single Image Before Opening] */}
                        <div className="hidden md:flex w-1/2 items-center justify-start relative pl-10">
                          {/* Horizontal Connector Stem (Touching center node) */}
                          <div className="w-10 h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-400/80 flex-shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />

                          {/* The Card */}
                          <div
                            onClick={() => setSelectedMilestone(item)}
                            className="w-full max-w-[430px] rounded-3xl border border-white/10 bg-[#0E1526]/85 hover:bg-[#131C33]/95 hover:border-cyan-500/40 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                          >
                            {/* Card Top: Year & Category */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span
                                className="text-2xl sm:text-3xl font-black font-display tracking-tight leading-none"
                                style={{ color: item.yearColor }}
                              >
                                {item.year}
                              </span>
                              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold uppercase">
                                {item.category}
                              </span>
                            </div>

                            {/* Title (Clean, no subtitle!) */}
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h3>

                            {/* SINGLE COVER IMAGE BEFORE OPENING */}
                            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#070A12] mb-3 group/img">
                              {item.imageUrl ? (
                                <>
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-black/15 group-hover/img:bg-black/0 transition-colors" />
                                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                                    <Grid className="w-3 h-3 text-cyan-400" />
                                    <span>{item.gallery ? `${item.gallery.length} Photos Collage` : '3-Photo Collage'}</span>
                                  </span>
                                </>
                              ) : (
                                <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
                                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 shadow-inner group-hover/img:scale-110 transition-transform">
                                    <Camera className="w-5 h-5" />
                                  </div>
                                  <span className="text-xs font-bold text-white group-hover/img:text-cyan-300 transition-colors leading-tight line-clamp-1">
                                    {item.imagePlaceholderTitle}
                                  </span>
                                  <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                                    {item.imagePlaceholderDesc}
                                  </span>
                                  <span className="mt-2 text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                                    <Grid className="w-3 h-3" />
                                    <span>Open Photo Collage</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* PUNCHY DESCRIPTION AT BOTTOM (No hashtags!) */}
                            <p className="text-xs text-gray-300 font-sans leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ============================================================== */}
                    {/* MOBILE LAYOUT (< md screens) */}
                    {/* ============================================================== */}
                    <div className="md:hidden w-full pl-12">
                      {/* Mobile Horizontal Stem */}
                      <div className="absolute left-6 top-8 w-6 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />

                      {/* Mobile Card Container */}
                      <div
                        onClick={() => setSelectedMilestone(item)}
                        className="bg-[#0E1526]/90 border border-white/10 rounded-3xl p-5 shadow-xl cursor-pointer"
                      >
                        {/* Year & Category */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="text-2xl font-black font-display tracking-tight leading-none" style={{ color: item.yearColor }}>
                            {item.year}
                          </div>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase font-semibold">
                            {item.category}
                          </span>
                        </div>

                        {/* Title (Clean, no subtitle!) */}
                        <div className="text-base font-bold text-white tracking-tight mb-3">
                          {item.title}
                        </div>

                        {/* Single Cover Image Before Opening */}
                        <div className="relative w-full aspect-[16/10] rounded-2xl border border-white/10 bg-[#070A12] overflow-hidden mb-3">
                          {item.imageUrl ? (
                            <>
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                                <Grid className="w-2.5 h-2.5 text-cyan-400" />
                                <span>{item.gallery ? `${item.gallery.length} Photos` : 'Collage'}</span>
                              </span>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                              <Camera className="w-6 h-6 text-cyan-400 mb-1" />
                              <div className="text-xs font-bold text-white">
                                {item.imagePlaceholderTitle}
                              </div>
                              <div className="text-[10px] text-gray-400 mt-0.5">
                                {item.imagePlaceholderDesc}
                              </div>
                              <span className="mt-1.5 text-[8px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10">
                                Open Photo Collage
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description (No hashtags!) */}
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </motion.div>

      {/* 3. MULTI-IMAGE COLLAGE LIGHTBOX MODAL (AFTER OPENING) */}
      <AnimatePresence>
        {selectedMilestone && (
          <div
            className="fixed inset-0 z-[100010] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/95 backdrop-blur-3xl overflow-y-auto"
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#0B101D] border border-cyan-500/40 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-y-auto my-auto scrollbar-thin scrollbar-thumb-cyan-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-30 border border-white/10 hover:border-cyan-400/50 shadow-sm"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header & View Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pr-12">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-display tracking-tight" style={{ color: selectedMilestone.yearColor }}>
                      {selectedMilestone.year}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 uppercase font-bold">
                      {selectedMilestone.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {selectedMilestone.title}
                  </h3>
                </div>

                {/* View Switcher: Collage vs Spotlight Slider */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode('collage')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                      viewMode === 'collage'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Collage</span>
                  </button>
                  <button
                    onClick={() => setViewMode('spotlight')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                      viewMode === 'spotlight'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Spotlight</span>
                  </button>
                </div>
              </div>

              {/* ============================================================== */}
              {/* VIEW 1: BENTO PHOTO COLLAGE GRID (3+ Photos in rich layout) */}
              {/* ============================================================== */}
              {viewMode === 'collage' && (
                <div className="mb-5">
                  {selectedMilestone.gallery && selectedMilestone.gallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 aspect-auto sm:aspect-[16/9] w-full rounded-2xl overflow-hidden">
                      {/* Featured Hero Frame (Left 7 Columns) */}
                      <div
                        onClick={() => {
                          setActivePhotoIndex(0);
                          setViewMode('spotlight');
                        }}
                        className="sm:col-span-7 relative min-h-[220px] sm:min-h-0 h-full rounded-2xl overflow-hidden border border-white/15 group/tile cursor-pointer bg-[#070A12] shadow-lg"
                      >
                        <img
                          src={selectedMilestone.gallery[0]}
                          alt="Hero Showcase"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/tile:opacity-95 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{selectedMilestone.collageSlots?.[0]?.title || 'Hero Showcase 01'}</span>
                          </span>
                          <span className="p-1.5 rounded-lg bg-black/70 text-cyan-300 backdrop-blur-md opacity-0 group-hover/tile:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Supporting Detail Frames (Right 5 Columns, Stacked) */}
                      <div className="sm:col-span-5 grid grid-cols-1 sm:grid-rows-2 gap-3 h-full min-h-[220px] sm:min-h-0">
                        {selectedMilestone.gallery.slice(1, 3).map((imgUrl, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setActivePhotoIndex(idx + 1);
                              setViewMode('spotlight');
                            }}
                            className="relative h-full rounded-2xl overflow-hidden border border-white/15 group/tile cursor-pointer bg-[#070A12] shadow-lg min-h-[140px] sm:min-h-0"
                          >
                            <img
                              src={imgUrl}
                              alt={`Detail photo ${idx + 2}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/tile:opacity-95 transition-opacity" />
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                              <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-mono text-cyan-300 border border-cyan-500/30">
                                {selectedMilestone.collageSlots?.[idx + 1]?.title || `Detail Shot 0${idx + 2}`}
                              </span>
                              <span className="p-1 rounded bg-black/70 text-cyan-300 backdrop-blur-md opacity-0 group-hover/tile:opacity-100 transition-opacity">
                                <Maximize2 className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Multi-Slot Blueprint Collage (When photos haven't been added yet) */
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 aspect-auto sm:aspect-[16/9] w-full rounded-2xl overflow-hidden">
                      {/* Slot 1: Hero Frame */}
                      <div className="sm:col-span-7 relative min-h-[220px] sm:min-h-0 h-full rounded-2xl overflow-hidden border border-dashed border-cyan-500/40 bg-[#070A12]/90 p-5 flex flex-col items-center justify-center text-center">
                        <Camera className="w-10 h-10 text-cyan-400 mb-2 animate-pulse" />
                        <span className="text-sm font-bold text-white mb-1">
                          {selectedMilestone.collageSlots?.[0]?.title || selectedMilestone.imagePlaceholderTitle}
                        </span>
                        <span className="text-xs text-gray-400 max-w-sm mb-3">
                          {selectedMilestone.collageSlots?.[0]?.subtitle || selectedMilestone.imagePlaceholderDesc}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                          Collage Slot #1 (Hero Render)
                        </span>
                      </div>

                      {/* Slots 2 & 3: Breakdown & Process */}
                      <div className="sm:col-span-5 grid grid-cols-1 sm:grid-rows-2 gap-3 h-full min-h-[220px] sm:min-h-0">
                        <div className="relative h-full rounded-2xl overflow-hidden border border-dashed border-cyan-500/30 bg-[#070A12]/80 p-4 flex flex-col items-center justify-center text-center min-h-[110px]">
                          <span className="text-xs font-bold text-white mb-0.5">
                            {selectedMilestone.collageSlots?.[1]?.title || 'Clay / Topology Render'}
                          </span>
                          <span className="text-[10px] text-gray-400 mb-1.5">
                            {selectedMilestone.collageSlots?.[1]?.subtitle || 'Wireframe & UV layout'}
                          </span>
                          <span className="text-[9px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                            Collage Slot #2
                          </span>
                        </div>

                        <div className="relative h-full rounded-2xl overflow-hidden border border-dashed border-cyan-500/30 bg-[#070A12]/80 p-4 flex flex-col items-center justify-center text-center min-h-[110px]">
                          <span className="text-xs font-bold text-white mb-0.5">
                            {selectedMilestone.collageSlots?.[2]?.title || 'Process / Macro Detail'}
                          </span>
                          <span className="text-[10px] text-gray-400 mb-1.5">
                            {selectedMilestone.collageSlots?.[2]?.subtitle || 'Behind the scenes pass'}
                          </span>
                          <span className="text-[9px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                            Collage Slot #3
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* VIEW 2: SPOTLIGHT FULL-SIZE CAROUSEL (Enlarged individual view) */}
              {/* ============================================================== */}
              {viewMode === 'spotlight' && (
                <div className="mb-5">
                  {selectedMilestone.gallery && selectedMilestone.gallery.length > 0 ? (
                    <div>
                      {/* Full-width spotlight image display with navigation */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl mb-3">
                        <img
                          src={selectedMilestone.gallery[activePhotoIndex]}
                          alt={`Photo ${activePhotoIndex + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />

                        {/* Navigation Arrows */}
                        <button
                          onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : selectedMilestone.gallery!.length - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all"
                          title="Previous Photo"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setActivePhotoIndex((prev) => (prev < selectedMilestone.gallery!.length - 1 ? prev + 1 : 0))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all"
                          title="Next Photo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Active Image Indicator Badge */}
                        <div className="absolute bottom-3 left-4 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-xs font-mono text-cyan-300 border border-cyan-500/30">
                          {selectedMilestone.collageSlots?.[activePhotoIndex]?.title || `Photo ${activePhotoIndex + 1} of ${selectedMilestone.gallery.length}`}
                        </div>
                      </div>

                      {/* Thumbnail Pill Strip */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 overflow-x-auto py-1">
                          {selectedMilestone.gallery.map((thumb, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActivePhotoIndex(idx)}
                              className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                                activePhotoIndex === idx
                                  ? 'border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.6)] scale-105'
                                  : 'border-white/10 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={thumb}
                                alt={`Thumbnail ${idx + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setViewMode('collage')}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 flex-shrink-0 transition-colors"
                        >
                          <Grid className="w-3.5 h-3.5" />
                          <span>View Full Collage</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] rounded-2xl border border-dashed border-cyan-500/30 bg-[#070A12] flex flex-col items-center justify-center p-6 text-center">
                      <Camera className="w-12 h-12 text-cyan-400 mb-2" />
                      <div className="text-sm font-bold text-white">
                        {selectedMilestone.imagePlaceholderTitle}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 mb-3">
                        {selectedMilestone.imagePlaceholderDesc}
                      </div>
                      <button
                        onClick={() => setViewMode('collage')}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-xs font-mono text-cyan-300 border border-cyan-500/30"
                      >
                        ← Back to Collage Grid
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Description & Narrative */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5">
                {selectedMilestone.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                {selectedMilestone.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
