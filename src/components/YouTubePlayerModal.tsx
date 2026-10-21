'use client';

import React from 'react';
import { X, Play, Youtube, ExternalLink } from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface YouTubePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string;
  title: string;
  client?: string;
  role?: string;
}

export const YouTubePlayerModal: React.FC<YouTubePlayerModalProps> = ({
  isOpen,
  onClose,
  youtubeId = 'dQw4w9WgXcQ',
  title,
  client,
  role,
}) => {
  // Global modal scroll lock & interaction blocker
  useModalScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 pt-6 sm:pt-8 bg-black/90 backdrop-blur-xl overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      data-modal-scrollable
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0E111A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#121522]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                {title}
                {client && (
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {client}
                  </span>
                )}
              </h3>
              {role && <p className="text-xs text-gray-400 font-mono">{role}</p>}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Video Container */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Video Footer Info */}
        <div className="px-6 py-4 bg-[#0B0D14] flex items-center justify-end border-t border-white/[0.06]">
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg border border-white/10 transition-all font-mono"
          >
            Open on YouTube <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
