'use client';

import React from 'react';
import { WORK_EXPERIENCE, EDUCATION } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#090B10]">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-900/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Leadership & Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Professional Experience & Milestones
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            5 years leading commercial 3D CGI teams, architecting real-time pipelines, and consulting on cutting-edge generative AI workflows.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="space-y-8 mb-16">
          {WORK_EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              className="bg-[#111422]/90 border border-white/[0.08] hover:border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all shadow-xl shadow-black/40"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      {exp.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-mono mt-1">
                    <span className="text-cyan-300 font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-gray-400 bg-white/[0.05] px-3.5 py-1.5 rounded-xl border border-white/[0.08] self-start md:self-auto">
                  {exp.period}
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-300 my-6 leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements list */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 block">
                  Key Accomplishments & Responsibilities:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.achievements.map((ach, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 bg-[#141828]/60 p-3.5 rounded-2xl border border-white/[0.04] text-xs sm:text-sm text-gray-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools tags */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-gray-500">Pipeline Stack:</span>
                {exp.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono bg-white/[0.04] text-gray-300 px-2.5 py-1 rounded-lg border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education & Academic Foundation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, index) => (
            <div
              key={index}
              className="bg-[#10131E] border border-white/[0.08] rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                    {edu.period}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-display font-bold text-white">
                  {edu.degree}
                </h4>
                <p className="text-xs text-purple-300 font-mono mt-1">
                  {edu.institution}
                </p>

                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  {edu.notes}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">
                  {edu.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
