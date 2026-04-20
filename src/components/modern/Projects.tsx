import React from 'react';
import resumeData from '../../data/resumeData.json';
import { SectionHeader } from './Experience';

const ACCENT_COLORS: Record<string, string> = {
  blue:    '#4f8dff',
  violet:  '#a78bfa',
  emerald: '#34d399',
  amber:   '#fbbf24',
};

interface Project {
  title: string;
  tag: string;
  description: string;
  technologies: string[];
  github?: string;
  accent?: string;
}

const ProjectCard = ({ p, i }: { p: Project; i: number }) => {
  const c = ACCENT_COLORS[p.accent ?? 'blue'] ?? ACCENT_COLORS.blue;
  const href = p.github && p.github !== '#' ? p.github : undefined;

  return (
    <a href={href} target={href ? '_blank' : undefined} rel="noreferrer"
      className="group relative block rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] transition-all overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(420px 220px at 70% 0%, ${c}22, transparent 70%)` }} />

      <div className="relative p-7 md:p-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Project {String(i + 1).padStart(2, '0')}
            </span>
            <div className="mt-2 inline-flex items-center gap-2 text-xs font-mono text-white/50">
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: c }} />
              {p.tag}
            </div>
          </div>
          <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight mb-4 leading-tight">{p.title}</h3>
        <p className="text-white/65 leading-relaxed mb-6 text-[15px]">{p.description}</p>

        <div className="flex flex-wrap gap-2">
          {p.technologies.map((t, j) => (
            <span key={j} className="px-3 py-1 text-[11px] font-mono text-white/70 border border-white/10 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${c}00, ${c}, ${c}00)`, opacity: 0.6 }} />
    </a>
  );
};

const Projects = () => {
  const projects = resumeData.projects as Project[];

  return (
    <section id="projects" className="relative py-28 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          n="03 — Projects"
          kicker="Recent builds"
          title={<>Work that<br /><span className="italic text-white/70">earns</span> its keep.</>}
          blurb="From RAG assistants to churn models — each is production-shaped: real data, real deployment, measurable outcomes."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
        </div>

        <div className="mt-10 text-center">
          <a href="https://github.com/Shamal119" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-mono uppercase tracking-[0.2em] transition-colors">
            More on GitHub <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
