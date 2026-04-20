import React from 'react';
import resumeData from '../../data/resumeData.json';

interface SectionHeaderProps {
  n: string;
  kicker: string;
  title: React.ReactNode;
  blurb?: string;
}

export const SectionHeader = ({ n, kicker, title, blurb }: SectionHeaderProps) => (
  <div className="mb-16 grid md:grid-cols-12 gap-6 items-end">
    <div className="md:col-span-5">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>{n}</span>
        <span className="h-px flex-1 bg-white/15" />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">{kicker}</span>
      </div>
      <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] text-white">{title}</h2>
    </div>
    {blurb && (
      <div className="md:col-span-6 md:col-start-7">
        <p className="text-white/60 text-lg leading-relaxed">{blurb}</p>
      </div>
    )}
  </div>
);

const Experience = () => {
  const exp = resumeData.experience;

  return (
    <section id="work" className="relative py-28 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          n="02 — Work"
          kicker="Selected history"
          title={<>A track record<br /><span className="italic text-white/70">of shipped</span> work.</>}
          blurb="Two years, one company, consistent outcomes — from intern-scale dashboards to production LLM systems."
        />

        <div className="grid md:grid-cols-12 gap-8">
          <div className="hidden md:block md:col-span-2">
            <div className="sticky top-28 space-y-6">
              {exp.map((e, i) => {
                const parts = e.period.split('—');
                return (
                  <div key={i} className="font-mono text-[11px] text-white/40">
                    <div className="text-white/90 text-sm">{parts[0]?.trim()}</div>
                    <div>— {parts[1]?.trim() ?? ''}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-10 space-y-6">
            {exp.map((e, i) => (
              <article key={i} className="relative rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] transition-colors p-7 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight">{e.title}</h3>
                      {e.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm flex-wrap">
                      <span className="text-white/90">{e.company}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{e.location}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="font-mono text-xs text-white/50">{e.period}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-white/30">
                    0{i + 1} / 0{exp.length}
                  </span>
                </div>

                <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3">
                  {e.responsibilities.map((r, j) => (
                    <li key={j} className="flex items-start gap-3 text-white/70 text-[15px] leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
