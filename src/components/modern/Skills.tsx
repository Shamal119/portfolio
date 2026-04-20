import React from 'react';
import resumeData from '../../data/resumeData.json';
import { SectionHeader } from './Experience';

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

const Skills = () => {
  const cats = resumeData.skills as SkillCategory[];

  return (
    <section id="skills" className="relative py-28 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          n="04 — Stack"
          kicker="Tools & capabilities"
          title={<>The <span className="italic text-white/70">kit</span><br />I reach for.</>}
          blurb="Grouped by where they live in a project — from model layer to BI surface. Depth over breadth; everything listed is something I've shipped."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {cats.map((c, i) => (
            <div key={c.id} className="relative rounded-3xl border border-white/10 p-8 bg-white/[0.015]">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                    {String(i + 1).padStart(2, '0')} / {String(cats.length).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">{c.title}</h3>
                </div>
                <span className="font-mono text-xs text-white/30">{c.skills.length} items</span>
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
                {c.skills.map((s, j) => (
                  <li key={j} className="group inline-flex items-center gap-2 text-white/80 text-[15px]">
                    <span className="font-mono text-[10px] text-white/30 w-6">{String(j + 1).padStart(2, '0')}</span>
                    <span className="relative">
                      {s}
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
                        style={{ background: 'var(--accent)' }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education block */}
        <div className="mt-10 rounded-3xl border border-white/10 p-8 bg-white/[0.015]">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>Education</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {resumeData.education.map((e, i) => (
              <div key={i} className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-serif text-2xl text-white tracking-tight">{e.degree}</div>
                  <div className="text-white/60 mt-1">{e.school}</div>
                </div>
                <div className="font-mono text-xs text-white/40 shrink-0 pt-2">{e.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
