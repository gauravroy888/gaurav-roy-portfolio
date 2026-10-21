'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, Check, ArrowUpRight, Video, Mail, ShieldCheck } from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface CreativeConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreativeConsultationModal: React.FC<CreativeConsultationModalProps> = ({ isOpen, onClose }) => {
  // Global modal scroll lock & interaction blocker
  useModalScrollLock(isOpen);

  const [selectedTopic, setSelectedTopic] = useState('3D CGI & Product Commercials');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const topics = [
    {
      id: '3d-cgi',
      name: '3D CGI & Product Commercials',
      desc: 'Photorealistic lighting, Octane/Redshift rendering, luxury brand ads.',
      badge: 'CGI & Motion',
    },
    {
      id: 'unreal-engine',
      name: 'Unreal Engine 5 & Real-Time Walkthroughs',
      desc: 'Lumen/Nanite architectural visualization, virtual production & WebXR.',
      badge: 'Real-Time 3D',
    },
    {
      id: 'comfyui-ai',
      name: 'ComfyUI & Generative AI Pipelines',
      desc: 'Custom node workflows, LoRA training, video generation, pre-vis automation.',
      badge: 'AI Pipeline',
    },
    {
      id: 'spatial-web',
      name: 'Spatial Web & Interactive 3D WebGL',
      desc: 'Three.js web configurators, shader effects, high-conversion creative tech.',
      badge: 'WebXR / WebGL',
    },
  ];

  // Direct Google Calendar Event Link (pre-filled with Gaurav Roy's email and agenda)
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Creative Discovery Call — ${selectedTopic} (Gaurav Roy)`);
    const details = encodeURIComponent(
      `Creative & Technical Consultation with Gaurav Roy (Creative Technologist)\n\n` +
      `Focus: ${selectedTopic}\n` +
      `Client: ${clientName || 'Partner/Client'}\n` +
      `Contact: ${clientEmail || 'N/A'}\n` +
      `Notes: ${notes || '3D CGI / Spatial Web / AI Collaboration'}\n\n` +
      `Meeting Link: Google Meet will be automatically generated.`
    );
    const location = encodeURIComponent('Google Meet / Video Call');
    const add = encodeURIComponent('gauravroy476@gmail.com');

    // Create a default 30-min slot tomorrow at 3:00 PM UTC
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(15, 0, 0, 0);
    const end = new Date(tomorrow);
    end.setMinutes(end.getMinutes() + 30);

    const formatGDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const dates = `${formatGDate(tomorrow)}/${formatGDate(end)}`;

    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&details=${details}&location=${location}&add=${add}&dates=${dates}`;
  };

  const handleBookOnGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare mailto or webhook submission
    const subject = encodeURIComponent(`[Consultation Request] ${selectedTopic} - ${clientName}`);
    const body = encodeURIComponent(
      `Hi Gaurav,\n\nI would like to book a creative consultation call with you regarding: ${selectedTopic}.\n\n` +
      `Name: ${clientName}\n` +
      `Email: ${clientEmail}\n` +
      `Project Scope / Notes:\n${notes}\n\n` +
      `Looking forward to connecting!`
    );

    window.open(`mailto:gauravroy476@gmail.com?subject=${subject}&body=${body}`, '_self');
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      data-modal-scrollable
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0F111A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 mb-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Calendar className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Google Calendar Integration
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Book a 1:1 Creative Discovery Call
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              Schedule a 30-minute technical or creative consultation directly with Gaurav Roy.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 relative z-10">
          {/* Step 1: Select Consultation Topic */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Select Consultation Focus:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t.name)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedTopic === t.name
                      ? 'bg-purple-600/15 border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {t.badge}
                    </span>
                    {selectedTopic === t.name && (
                      <Check className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white leading-snug">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {t.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct One-Click Calendar Action Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#181B28] to-cyan-950/40 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
                <Video className="w-5 h-5 text-purple-300" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Direct Google Meet & Calendar Slot</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Instant
                  </span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Pre-fills meeting details, Google Meet link & Gaurav's availability.
                </div>
              </div>
            </div>

            <button
              onClick={handleBookOnGoogleCalendar}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-white/10"
            >
              <span>Add to Calendar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Form for Project Inquiry or Custom Timings */}
          <form onSubmit={handleSubmitInquiry} className="space-y-3.5 pt-1 border-t border-white/10">
            <div className="text-xs font-mono text-gray-300 uppercase tracking-wider">
              Or Send Quick Meeting Request:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Your Name / Studio Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Brief project scope, timeline, or preferred meeting times..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NDA & Client Confidentiality Respected</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Inquiry Prepared!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
