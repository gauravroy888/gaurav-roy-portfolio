'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Github,
  Check,
  Copy,
  Calendar
} from 'lucide-react';
import { SOCIAL_PROFILES } from '../data/socialProfiles';

const CreativeConsultationModal = dynamic(
  () => import('./CreativeConsultationModal').then((mod) => mod.CreativeConsultationModal),
  { ssr: false }
);

interface ContactFooterProps {
  onOpenResume?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenResume }) => {
  const [copiedContact, setCopiedContact] = useState<'email' | 'phone' | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const copyContact = async (type: 'email' | 'phone') => {
    const value = type === 'email' ? 'gauravroy476@gmail.com' : '+91 9069558564';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(value);
      setCopiedContact(type);
      setCopyError(false);
      window.setTimeout(() => setCopiedContact((current) => current === type ? null : current), 2200);
    } catch {
      setCopiedContact(null);
      setCopyError(true);
      window.setTimeout(() => setCopyError(false), 3000);
    }
  };

  const SocialIcon = ({ name }: { name: string }) => {
    if (name === 'LinkedIn') return <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />;
    if (name === 'Instagram') return <Instagram className="w-3.5 h-3.5" aria-hidden="true" />;
    return <Github className="w-3.5 h-3.5" aria-hidden="true" />;
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

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:gauravroy476@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-white border border-white/20 text-xs font-semibold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 shadow-md backdrop-blur-md"
                  title="Book a 1:1 Creative Discovery Call with Google Calendar"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Book a Call</span>
                </button>
              </div>
            </div>

            {/* Right Contact Info List (3 cols): Exact match to reference icons & text */}
            <div className="lg:col-span-3 space-y-2.5 text-[11px] font-mono text-gray-300">
              <div className="flex items-center gap-2">
                <a href="mailto:gauravroy476@gmail.com" className="flex min-w-0 items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" aria-hidden="true" />
                  <span>gauravroy476@gmail.com</span>
                </a>
                <button type="button" onClick={() => void copyContact('email')} aria-label="Copy email address" title="Copy email address" className="rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
                  {copiedContact === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a href="tel:+919069558564" className="flex min-w-0 items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" aria-hidden="true" />
                  <span>+91 9069558564</span>
                </a>
                <button type="button" onClick={() => void copyContact('phone')} aria-label="Copy phone number" title="Copy phone number" className="rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
                  {copiedContact === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                </button>
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {copyError ? 'Could not copy. Select and copy the contact information instead.' : copiedContact ? `${copiedContact === 'email' ? 'Email address' : 'Phone number'} copied.` : ''}
              </p>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Delhi, India / Remote</span>
              </div>

              <a
                href="https://gauravroy.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                title="Visit gauravroy.dev"
              >
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>gauravroy.dev</span>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright (Left) & LET'S CONNECT (Right) (Exact match to reference) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest pt-2">
          
          <div>
            © {new Date().getFullYear()} Gaurav Roy. All Rights Reserved.
          </div>

          {SOCIAL_PROFILES.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-semibold">Let&apos;s Connect</span>
              <div className="flex items-center gap-3 text-gray-400">
                {SOCIAL_PROFILES.map((profile) => (
                  <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label={profile.name} title={profile.name}>
                    <SocialIcon name={profile.name} />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Google Calendar Creative Consultation Modal */}
      <CreativeConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </footer>
  );
};
