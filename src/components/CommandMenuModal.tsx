'use client';

import React, { useState, useEffect } from 'react';
import { PROJECTS, DOMAINS } from '../data/portfolioData';
import {
  Search,
  X,
  FileText,
  Mail,
  Github,
  Linkedin,
  Youtube,
  Layers,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Phone,
  Copy,
  Check
} from 'lucide-react';

interface CommandMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject?: (project: any) => void;
}

export const CommandMenuModal: React.FC<CommandMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gauravroy476@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects = PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.specs.software.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
    (p.client && p.client.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0D101A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/[0.08] bg-[#121626]">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, tool (UE5, ComfyUI), client (Kohler, TATA)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          
          {/* Quick Actions */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 px-3 block mb-1.5">
              Quick Actions
            </span>
            <div className="space-y-1">
              
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-left text-xs font-mono text-gray-200 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>View & Download Resume PDF</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-left text-xs font-mono text-gray-200 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Copy Email: gauravroy476@gmail.com</span>
                </div>
                <span className="text-[10px] text-gray-400">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copy'}
                </span>
              </button>

              <a
                href="#work"
                onClick={onClose}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-left text-xs font-mono text-gray-200 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Jump to Featured Work</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </a>

            </div>
          </div>

          {/* Projects Match */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 px-3 block mb-1.5">
                Projects & Productions ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <a
                    key={proj.id}
                    href="#russian-doll"
                    onClick={onClose}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] text-left text-xs text-gray-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="font-medium text-white block">{proj.title}</span>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {proj.client ? `${proj.client} • ` : ''}{proj.badge}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social Channels */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 px-3 block mb-1.5">
              Channels & Connect
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href="mailto:gauravroy476@gmail.com"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-gray-300"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" /> Email Direct
              </a>
              <a
                href="tel:9069558564"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-gray-300"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call / WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Footer Hint */}
        <div className="px-5 py-3 bg-[#0B0D14] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span>Navigate with ⌘K / Esc to close</span>
          <span>Gaurav Roy Portfolio</span>
        </div>

      </div>
    </div>
  );
};
