'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact?: () => void;
  onOpenCommand?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact, onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { id: 'work', label: 'Work' },
    { id: 'specialties', label: 'Services' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['work', 'specialties', 'capabilities', 'process', 'contact'];
      const scrollPosition = window.scrollY + 280;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0E0F14]/90 backdrop-blur-xl border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Serif Name Logo */}
          <a href="#" className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-wide hover:opacity-80 transition-opacity">
            Gaurav
          </a>

          {/* Center Glassmorphic Nav Bar Pill with Active Scroll Spy */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] transition-all font-medium ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Cmd+K Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenCommand && (
              <button
                onClick={onOpenCommand}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-gray-300 transition-all cursor-pointer"
                title="Open Command Menu (Ctrl+K or Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px] font-sans">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-gray-400 border border-white/10 font-mono">⌘K</kbd>
              </button>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0B10]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-gray-200 py-2"
          >
            Work & Projects
          </a>
          <a
            href="#specialties"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-gray-200 py-2"
          >
            Services
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-gray-200 py-2"
          >
            Capabilities & Tools
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-gray-200 py-2"
          >
            Design Process
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-gray-200 py-2"
          >
            Contact
          </a>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider"
            >
              Let&apos;s Talk
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full text-center py-3 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-wider"
            >
              Download Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
