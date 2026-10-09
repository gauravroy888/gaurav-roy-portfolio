'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Workflow,
  Sparkles,
  Layers,
  Cpu,
  Monitor,
  Video,
  PenTool,
  MousePointer,
  CheckCircle2,
} from 'lucide-react';
import {
  capabilitiesWorkflows,
  CapabilityWorkflow,
  WorkflowNode,
} from '../data/capabilitiesWorkflowData';

interface CapabilityWorkflowModalProps {
  initialCapabilityId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CapabilityWorkflowModal: React.FC<CapabilityWorkflowModalProps> = ({
  initialCapabilityId,
  isOpen,
  onClose,
}) => {
  const [activeId, setActiveId] = useState<string>('3d-unreal');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset scroll to top when changing capability
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeId]);

  // Sync active capability when modal opens
  useEffect(() => {
    if (initialCapabilityId && capabilitiesWorkflows[initialCapabilityId]) {
      setActiveId(initialCapabilityId);
      setSelectedNode(null);
    }
  }, [initialCapabilityId, isOpen]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation
  const capabilityKeys = Object.keys(capabilitiesWorkflows);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = capabilityKeys.indexOf(activeId);
        const nextIndex = (currentIndex + 1) % capabilityKeys.length;
        setActiveId(capabilityKeys[nextIndex]);
        setSelectedNode(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = capabilityKeys.indexOf(activeId);
        const prevIndex = (currentIndex - 1 + capabilityKeys.length) % capabilityKeys.length;
        setActiveId(capabilityKeys[prevIndex]);
        setSelectedNode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeId, capabilityKeys, onClose]);

  if (!isOpen || !mounted) return null;

  const currentWorkflow: CapabilityWorkflow =
    capabilitiesWorkflows[activeId] || capabilitiesWorkflows['3d-unreal'];

  const getIconForCapability = (id: string) => {
    switch (id) {
      case '3d-unreal':
        return <Monitor className="w-3.5 h-3.5" />;
      case 'gen-ai':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'spatial-ux':
        return <MousePointer className="w-3.5 h-3.5" />;
      case 'creative-prototyping':
        return <PenTool className="w-3.5 h-3.5" />;
      case 'motion-editing':
        return <Video className="w-3.5 h-3.5" />;
      case 'spatial-web':
        return <Layers className="w-3.5 h-3.5" />;
      default:
        return <Workflow className="w-3.5 h-3.5" />;
    }
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel((z) => Math.min(z + 0.15, 1.4));
    if (direction === 'out') setZoomLevel((z) => Math.max(z - 0.15, 0.7));
    if (direction === 'reset') setZoomLevel(1);
  };

  const { flowchart } = currentWorkflow;

  // Custom theme colors for accents
  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return {
          stroke: '#38bdf8',
          border: 'border-cyan-500/40',
          hoverBorder: 'hover:border-cyan-400',
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          glow: 'shadow-[0_0_20px_rgba(56,189,248,0.25)]',
          pillBorder: 'border-cyan-500/30',
        };
      case 'purple':
        return {
          stroke: '#c084fc',
          border: 'border-purple-500/40',
          hoverBorder: 'hover:border-purple-400',
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          glow: 'shadow-[0_0_20px_rgba(192,132,252,0.25)]',
          pillBorder: 'border-purple-500/30',
        };
      case 'indigo':
        return {
          stroke: '#818cf8',
          border: 'border-indigo-500/40',
          hoverBorder: 'hover:border-indigo-400',
          text: 'text-indigo-400',
          bg: 'bg-indigo-500/10',
          glow: 'shadow-[0_0_20px_rgba(129,140,248,0.25)]',
          pillBorder: 'border-indigo-500/30',
        };
      case 'emerald':
        return {
          stroke: '#34d399',
          border: 'border-emerald-500/40',
          hoverBorder: 'hover:border-emerald-400',
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          glow: 'shadow-[0_0_20px_rgba(52,211,153,0.25)]',
          pillBorder: 'border-emerald-500/30',
        };
      case 'amber':
        return {
          stroke: '#fbbf24',
          border: 'border-amber-500/40',
          hoverBorder: 'hover:border-amber-400',
          text: 'text-amber-400',
          bg: 'bg-amber-500/10',
          glow: 'shadow-[0_0_20px_rgba(251,191,36,0.25)]',
          pillBorder: 'border-amber-500/30',
        };
      case 'blue':
      default:
        return {
          stroke: '#60a5fa',
          border: 'border-blue-500/40',
          hoverBorder: 'hover:border-blue-400',
          text: 'text-blue-400',
          bg: 'bg-blue-500/10',
          glow: 'shadow-[0_0_20px_rgba(96,165,250,0.25)]',
          pillBorder: 'border-blue-500/30',
        };
    }
  };

  const accentStyles = getAccentStyles(currentWorkflow.accentColor);

  return createPortal(
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-2.5 sm:p-6 lg:p-8 pt-16 sm:pt-20 bg-black/50 backdrop-blur-[2px] overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0B0D14]/95 border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.15)] my-auto flex flex-col h-[82vh] max-h-[82vh] sm:h-[80vh] sm:max-h-[80vh] backdrop-blur-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-7 py-2.5 sm:py-3.5 border-b border-white/10 bg-[#10131E]/95 backdrop-blur-md gap-3 shrink-0">
          
          {/* Title & Category Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl ${accentStyles.bg} border ${accentStyles.border} flex items-center justify-center ${accentStyles.text} shadow-sm shrink-0`}
            >
              {getIconForCapability(currentWorkflow.id)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-semibold truncate">
                  {currentWorkflow.categoryBadge}
                </span>
                <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 bg-white/[0.06] border border-white/10 rounded text-gray-300">
                  Architecture Flow
                </span>
              </div>
              <h3 className="text-xs sm:text-lg font-bold text-white tracking-tight leading-tight truncate">
                {currentWorkflow.title}
              </h3>
            </div>
          </div>

          {/* Controls: Zoom and Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/[0.05] rounded-lg sm:rounded-xl border border-white/10 p-0.5 sm:p-1 gap-0.5 sm:gap-1">
              <button
                onClick={() => handleZoom('out')}
                className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <span className="text-[9px] sm:text-[11px] font-mono text-gray-300 px-1 min-w-[32px] sm:min-w-[42px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom('in')}
                className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button
                onClick={() => handleZoom('reset')}
                className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors ml-0.5"
                title="Reset Zoom"
              >
                <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-white rounded-lg sm:rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close Architecture Modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Capability Switcher Bar (3-col grid on mobile, 6-col on desktop - ZERO CROPPING) */}
        <div className="px-2.5 sm:px-6 py-2 bg-[#0E111B] border-b border-white/[0.08] shrink-0">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 w-full">
            {capabilityKeys.map((key) => {
              const cap = capabilitiesWorkflows[key];
              const isSelected = activeId === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveId(key);
                    setSelectedNode(null);
                  }}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition-all border w-full text-center ${
                    isSelected
                      ? `bg-white/[0.14] text-white ${cap.accentBorder} shadow-sm font-semibold`
                      : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/[0.06]'
                  }`}
                  title={cap.title}
                >
                  <span className="shrink-0">{getIconForCapability(key)}</span>
                  <span className="truncate">{cap.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Stack Strip */}
        <div className="px-3 sm:px-7 py-1.5 sm:py-2 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center gap-1.5 text-xs shrink-0">
          <span className="font-mono text-gray-400 text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0 mr-1">
            Primary Stack:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {currentWorkflow.primaryTools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-gray-300 font-mono text-[10px] sm:text-[11px]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Main Flowchart Content Area */}
        <div ref={scrollContainerRef} className="flex-1 overflow-auto bg-[#080A10] p-2.5 sm:p-6 lg:p-8 relative custom-scrollbar">
          
          {/* Subtle blueprint grid background */}
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Visual Flowchart Canvas */}
          <div
            className="flex justify-center transition-transform duration-200 origin-top w-full pb-10"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="flex flex-col items-center w-full max-w-3xl space-y-0 relative px-0.5 sm:px-4">

              {/* 1. ROOT INPUT NODE */}
              <div className="flex flex-col items-center w-full">
                <div
                  onClick={() => setSelectedNode(flowchart.rootInput)}
                  className="w-full max-w-[320px] sm:max-w-md p-3 sm:p-4 rounded-xl bg-[#141724] border border-white/20 hover:border-white/50 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181B2B]"
                >
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-0.5 sm:mb-1">
                    {flowchart.rootInput.badge || 'Entry Point'}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white tracking-wide leading-tight">
                    {flowchart.rootInput.title}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug">
                    {flowchart.rootInput.subtitle}
                  </div>
                </div>

                {/* Vertical Connection */}
                <div className="flex flex-col items-center my-0">
                  <div className="w-[2px] h-5 sm:h-9 bg-sky-400" />
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[7px] border-t-sky-400" />
                </div>
              </div>

              {/* 2. DECISION DIAMOND NODE */}
              <div className="flex flex-col items-center w-full relative">
                {/* Diamond container */}
                <div className="relative w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center my-1 sm:my-2">
                  {/* Rotated background card */}
                  <div
                    className="w-16 h-16 sm:w-28 sm:h-28 rotate-45 rounded-lg sm:rounded-xl bg-[#121526] border-2 border-sky-400/80 shadow-lg shadow-sky-950/50 flex items-center justify-center transition-all hover:scale-105"
                  />
                  {/* Centered un-rotated text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1.5 sm:p-3 pointer-events-none">
                    <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-sky-300 font-bold mb-0.5">
                      Routing Logic
                    </span>
                    <span className="text-[9px] sm:text-xs font-bold text-white tracking-tight leading-tight px-1">
                      {flowchart.decisionDiamond.condition}
                    </span>
                  </div>
                </div>

                {/* Orthogonal Split Connector (Diamond to 2 Child Nodes) */}
                <div className="w-full max-w-2xl relative h-10 sm:h-14 mt-0.5 sm:mt-1">
                  <svg className="w-full h-full" viewBox="0 0 600 56" preserveAspectRatio="none" fill="none">
                    <path d="M 300 0 L 300 24" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 150 24 L 450 24" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 150 24 L 150 56" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 450 24 L 450 56" stroke="#38bdf8" strokeWidth="2" />
                    <polygon points="146,50 154,50 150,56" fill="#38bdf8" />
                    <polygon points="446,50 454,50 450,56" fill="#38bdf8" />
                  </svg>

                  {/* Edge Label Badges at 25% and 75% */}
                  <div className="absolute top-1 sm:top-2 left-1/4 -translate-x-1/2 -translate-y-1/2">
                    <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#161a29] border border-sky-400/40 text-[8px] sm:text-[11px] font-mono text-sky-200 shadow-sm whitespace-nowrap">
                      {flowchart.decisionDiamond.leftBranch.edgeLabel}
                    </span>
                  </div>
                  <div className="absolute top-1 sm:top-2 left-3/4 -translate-x-1/2 -translate-y-1/2">
                    <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#161a29] border border-sky-400/40 text-[8px] sm:text-[11px] font-mono text-sky-200 shadow-sm whitespace-nowrap">
                      {flowchart.decisionDiamond.rightBranch.edgeLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. PARALLEL BRANCH NODES (Left & Right) */}
              <div className="w-full max-w-2xl grid grid-cols-2 gap-2 sm:gap-6 items-start">
                {/* Left Branch Node */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() =>
                      setSelectedNode(flowchart.decisionDiamond.leftBranch.node)
                    }
                    className="w-full p-2.5 sm:p-4 rounded-xl bg-[#131625] border border-white/20 hover:border-sky-400 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181C30]"
                  >
                    <div className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-sky-400 mb-0.5 sm:mb-1">
                      {flowchart.decisionDiamond.leftBranch.node.badge || 'Branch A'}
                    </div>
                    <div className="text-[11px] sm:text-sm font-semibold text-white tracking-wide leading-tight">
                      {flowchart.decisionDiamond.leftBranch.node.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug line-clamp-3 sm:line-clamp-none">
                      {flowchart.decisionDiamond.leftBranch.node.subtitle}
                    </div>
                  </div>

                  {/* Drop Line with Label */}
                  <div className="flex flex-col items-center my-0">
                    <div className="w-[2px] h-3 sm:h-4 bg-sky-400" />
                    {flowchart.decisionDiamond.leftBranch.downEdgeLabel && (
                      <span className="my-0.5 sm:my-1 px-1.5 sm:px-2 py-0.5 rounded bg-[#101320] border border-white/10 text-[8px] sm:text-[10px] font-mono text-gray-300">
                        {flowchart.decisionDiamond.leftBranch.downEdgeLabel}
                      </span>
                    )}
                    <div className="w-[2px] h-3 sm:h-4 bg-sky-400" />
                  </div>
                </div>

                {/* Right Branch Node */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() =>
                      setSelectedNode(flowchart.decisionDiamond.rightBranch.node)
                    }
                    className="w-full p-2.5 sm:p-4 rounded-xl bg-[#131625] border border-white/20 hover:border-sky-400 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181C30]"
                  >
                    <div className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-sky-400 mb-0.5 sm:mb-1">
                      {flowchart.decisionDiamond.rightBranch.node.badge || 'Branch B'}
                    </div>
                    <div className="text-[11px] sm:text-sm font-semibold text-white tracking-wide leading-tight">
                      {flowchart.decisionDiamond.rightBranch.node.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug line-clamp-3 sm:line-clamp-none">
                      {flowchart.decisionDiamond.rightBranch.node.subtitle}
                    </div>
                  </div>

                  {/* Drop Line with Label */}
                  <div className="flex flex-col items-center my-0">
                    <div className="w-[2px] h-3 sm:h-4 bg-sky-400" />
                    {flowchart.decisionDiamond.rightBranch.downEdgeLabel && (
                      <span className="my-0.5 sm:my-1 px-1.5 sm:px-2 py-0.5 rounded bg-[#101320] border border-white/10 text-[8px] sm:text-[10px] font-mono text-gray-300">
                        {flowchart.decisionDiamond.rightBranch.downEdgeLabel}
                      </span>
                    )}
                    <div className="w-[2px] h-3 sm:h-4 bg-sky-400" />
                  </div>
                </div>
              </div>

              {/* Orthogonal Convergence Connector */}
              <div className="w-full max-w-2xl relative h-9 sm:h-12">
                <svg className="w-full h-full" viewBox="0 0 600 48" preserveAspectRatio="none" fill="none">
                  <path d="M 150 0 L 150 24 L 300 24" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 450 0 L 450 24 L 300 24" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 300 24 L 300 48" stroke="#38bdf8" strokeWidth="2" />
                  <polygon points="296,42 304,42 300,48" fill="#38bdf8" />
                </svg>
              </div>

              {/* 4. CONVERGENCE NODE */}
              <div className="flex flex-col items-center w-full">
                <div
                  onClick={() => setSelectedNode(flowchart.convergenceNode)}
                  className="w-full max-w-[320px] sm:max-w-md p-3 sm:p-4 rounded-xl bg-[#141724] border border-white/20 hover:border-purple-400 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181B2B]"
                >
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-purple-400 mb-0.5 sm:mb-1">
                    {flowchart.convergenceNode.badge || 'Unified Pipeline'}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white tracking-wide leading-tight">
                    {flowchart.convergenceNode.title}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug">
                    {flowchart.convergenceNode.subtitle}
                  </div>
                </div>

                {/* Vertical Connection */}
                <div className="flex flex-col items-center my-0">
                  <div className="w-[2px] h-5 sm:h-7 bg-sky-400" />
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[7px] border-t-sky-400" />
                </div>
              </div>

              {/* 5. SEQUENTIAL PROCESSING NODES */}
              {flowchart.sequentialNodes.map((sNode, idx) => (
                <div key={sNode.id} className="flex flex-col items-center w-full">
                  <div
                    onClick={() => setSelectedNode(sNode)}
                    className="w-full max-w-[320px] sm:max-w-md p-3 sm:p-4 rounded-xl bg-[#141724] border border-white/20 hover:border-white/50 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181B2B]"
                  >
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-0.5 sm:mb-1">
                      {sNode.badge || `Stage ${idx + 1}`}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white tracking-wide leading-tight">
                      {sNode.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug">
                      {sNode.subtitle}
                    </div>
                  </div>

                  {/* Vertical Connector */}
                  <div className="flex flex-col items-center my-0">
                    <div className="w-[2px] h-5 sm:h-7 bg-sky-400" />
                    <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[7px] border-t-sky-400" />
                  </div>
                </div>
              ))}

              {/* 6. FINAL PARALLEL OUTPUT SPLIT CONNECTOR */}
              <div className="w-full max-w-2xl relative h-10 sm:h-14">
                <svg className="w-full h-full" viewBox="0 0 600 56" preserveAspectRatio="none" fill="none">
                  <path d="M 300 0 L 300 24" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 150 24 L 450 24" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 150 24 L 150 56" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 450 24 L 450 56" stroke="#38bdf8" strokeWidth="2" />
                  <polygon points="146,50 154,50 150,56" fill="#38bdf8" />
                  <polygon points="446,50 454,50 450,56" fill="#38bdf8" />
                </svg>

                {/* Output Edge Labels at 25% and 75% */}
                <div className="absolute top-1 sm:top-2 left-1/4 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#161a29] border border-sky-400/40 text-[8px] sm:text-[11px] font-mono text-sky-200 shadow-sm whitespace-nowrap">
                    {flowchart.outputSplit.leftBranch.edgeLabel}
                  </span>
                </div>
                <div className="absolute top-1 sm:top-2 left-3/4 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#161a29] border border-sky-400/40 text-[8px] sm:text-[11px] font-mono text-sky-200 shadow-sm whitespace-nowrap">
                    {flowchart.outputSplit.rightBranch.edgeLabel}
                  </span>
                </div>
              </div>

              {/* 7. TERMINAL OUTPUT NODES */}
              <div className="w-full max-w-2xl grid grid-cols-2 gap-2 sm:gap-6 items-start">
                
                {/* Left Output Branch */}
                <div className="flex flex-col items-center space-y-0">
                  <div
                    onClick={() =>
                      setSelectedNode(flowchart.outputSplit.leftBranch.node)
                    }
                    className="w-full p-2.5 sm:p-4 rounded-xl bg-[#131625] border border-white/20 hover:border-sky-400 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181C30]"
                  >
                    <div className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-sky-400 mb-0.5 sm:mb-1">
                      {flowchart.outputSplit.leftBranch.node.badge || 'Output Sub-Pass'}
                    </div>
                    <div className="text-[11px] sm:text-sm font-semibold text-white tracking-wide leading-tight">
                      {flowchart.outputSplit.leftBranch.node.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug line-clamp-3 sm:line-clamp-none">
                      {flowchart.outputSplit.leftBranch.node.subtitle}
                    </div>
                  </div>

                  {flowchart.outputSplit.leftBranch.subNode && (
                    <>
                      <div className="flex flex-col items-center my-0">
                        <div className="w-[2px] h-3 sm:h-6 bg-sky-400" />
                        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[7px] border-t-sky-400" />
                      </div>

                      <div
                        onClick={() =>
                          setSelectedNode(flowchart.outputSplit.leftBranch.subNode!)
                        }
                        className={`w-full p-2.5 sm:p-4 rounded-xl bg-[#151928] border-2 ${accentStyles.border} shadow-lg ${accentStyles.glow} transition-all text-center group cursor-pointer hover:scale-[1.02]`}
                      >
                        <div className="flex items-center justify-center gap-1 text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-emerald-400 mb-0.5 sm:mb-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{flowchart.outputSplit.leftBranch.subNode.badge}</span>
                        </div>
                        <div className="text-[11px] sm:text-sm font-bold text-white tracking-wide leading-tight">
                          {flowchart.outputSplit.leftBranch.subNode.title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-300 mt-1 font-sans leading-snug line-clamp-3 sm:line-clamp-none">
                          {flowchart.outputSplit.leftBranch.subNode.subtitle}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Output Branch */}
                <div className="flex flex-col items-center space-y-0">
                  <div
                    onClick={() =>
                      setSelectedNode(flowchart.outputSplit.rightBranch.node)
                    }
                    className="w-full p-2.5 sm:p-4 rounded-xl bg-[#131625] border border-white/20 hover:border-sky-400 transition-all text-center shadow-lg group cursor-pointer hover:bg-[#181C30]"
                  >
                    <div className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-sky-400 mb-0.5 sm:mb-1">
                      {flowchart.outputSplit.rightBranch.node.badge || 'Output Sub-Pass'}
                    </div>
                    <div className="text-[11px] sm:text-sm font-semibold text-white tracking-wide leading-tight">
                      {flowchart.outputSplit.rightBranch.node.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-sans leading-snug line-clamp-3 sm:line-clamp-none">
                      {flowchart.outputSplit.rightBranch.node.subtitle}
                    </div>
                  </div>

                  {flowchart.outputSplit.rightBranch.subNode && (
                    <>
                      <div className="flex flex-col items-center my-0">
                        <div className="w-[2px] h-3 sm:h-6 bg-sky-400" />
                        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[7px] border-t-sky-400" />
                      </div>

                      <div
                        onClick={() =>
                          setSelectedNode(flowchart.outputSplit.rightBranch.subNode!)
                        }
                        className={`w-full p-2.5 sm:p-4 rounded-xl bg-[#151928] border-2 ${accentStyles.border} shadow-lg ${accentStyles.glow} transition-all text-center group cursor-pointer hover:scale-[1.02]`}
                      >
                        <div className="flex items-center justify-center gap-1 text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-emerald-400 mb-0.5 sm:mb-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{flowchart.outputSplit.rightBranch.subNode.badge}</span>
                        </div>
                        <div className="text-[11px] sm:text-sm font-bold text-white tracking-wide leading-tight">
                          {flowchart.outputSplit.rightBranch.subNode.title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-300 mt-1 font-sans leading-snug line-clamp-3 sm:line-clamp-none">
                          {flowchart.outputSplit.rightBranch.subNode.subtitle}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Selected Node Details Drawer */}
          {selectedNode && (
            <div className="sticky bottom-2 mx-auto max-w-xl bg-[#121526]/95 border border-sky-400/50 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 animate-in slide-in-from-bottom-3 z-30">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                    {selectedNode.badge || 'Architecture Node'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-400 font-semibold">
                    Step Details
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  {selectedNode.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-300 font-sans leading-relaxed">
                  {selectedNode.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 shrink-0"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};
