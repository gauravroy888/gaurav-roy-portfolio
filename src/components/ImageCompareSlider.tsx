'use client';

import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface ImageCompareSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = '3D Clay / Wireframe Pass',
  afterLabel = 'Final Photoreal Render',
  aspectRatio = 'aspect-[16/10]',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 2) position = 2;
    if (position > 98) position = 98;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      className={`relative w-full select-none overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0D13] ${aspectRatio} ${className}`}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover max-w-none grayscale contrast-125"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        {/* Handle Pill */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#12151E]/90 border border-white/40 shadow-glow-md flex items-center justify-center text-white backdrop-blur-md">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400 rotate-90" />
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-gray-300">
        {beforeLabel}
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-cyan-300">
        {afterLabel}
      </div>

      {/* Helper text */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none bg-black/50 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] text-gray-400 font-mono">
        Drag slider to inspect render pipeline
      </div>
    </div>
  );
};
