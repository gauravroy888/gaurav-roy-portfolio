'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Github,
  Check
} from 'lucide-react';

interface ContactFooterProps {
  onOpenResume?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('gauravroy476@gmail.com');
    setCopiedEmail(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#FFFFFF', '#D1D5DB', '#9CA3AF'],
    });

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('+91 9069558564');
    setCopiedPhone(true);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.85 },
      colors: ['#00F5FF', '#C084FC', '#FFFFFF'],
    });

    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <footer id="contact" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Large Metallic Banner Card (Exact match to reference image) */}
        <div className="relative rounded-2xl overflow-hidden p-8 sm:p-12 border border-white/10 bg-gradient-to-r from-[#181B26] via-[#2A2F40] via-60% to-[#1A1D28] shadow-2xl mb-12">
          
          {/* Subtle metallic liquid reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.08] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Headline (5 cols): LET'S CREATE SOMETHING EXTRAORDINARY ✦ */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.92] select-none">
                LET'S CREATE <br />
                SOMETHING <br />
                EXTRAORDINARY <span className="text-white text-3xl font-sans inline-block align-middle">✦</span>
              </h2>
            </div>

            {/* Middle Action (4 cols): Subtitle + Pill Button */}
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                I'm currently available for full-time roles, freelance projects, and spatial CGI collaborations.
              </p>

              <div>
                <a
                  href="mailto:gauravroy476@gmail.com"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>{copiedEmail ? 'Copied gauravroy476@gmail.com!' : "Let's Work Together"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Contact Info List (3 cols): Exact match to reference icons & text */}
            <div className="lg:col-span-3 space-y-2.5 text-[11px] font-mono text-gray-300">
              <a
                href="mailto:gauravroy476@gmail.com"
                onClick={handleCopyEmail}
                className="flex items-center gap-2 hover:text-white transition-colors"
                title="Click to copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-gray-400" />}
                <span>{copiedEmail ? 'Copied Email!' : 'gauravroy476@gmail.com'}</span>
              </a>

              <a
                href="tel:9069558564"
                onClick={handleCopyPhone}
                className="flex items-center gap-2 hover:text-white transition-colors"
                title="Click to copy phone number"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5 text-gray-400" />}
                <span>{copiedPhone ? 'Copied Phone!' : '+91 9069558564'}</span>
              </a>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Delhi, India / Remote</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>gauravroy.dev</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright (Left) & LET'S CONNECT (Right) (Exact match to reference) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest pt-2">
          
          <div>
            © {new Date().getFullYear()} Gaurav Roy. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold">Let's Connect</span>
            <div className="flex items-center gap-3 text-gray-400">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
