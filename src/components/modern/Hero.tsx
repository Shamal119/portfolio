import React, { useRef, useEffect } from 'react';
import resumeData from '../../data/resumeData.json';

const Hero = () => {
  const { personal, summary, stats } = resumeData;
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 8;
      el.style.setProperty('--px', x + 'px');
      el.style.setProperty('--py', y + 'px');
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          'radial-gradient(1100px 600px at 80% -10%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%), radial-gradient(900px 500px at -10% 110%, color-mix(in oklab, var(--accent2) 18%, transparent), transparent 60%)'
      }} />
      {/* Parallax grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{
        transform: 'translate(var(--px,0px), var(--py,0px))',
        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '56px 56px'
      }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available Q2 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <span>{personal.location}</span>
            <span>Portfolio / v3.0</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] mb-8" style={{ color: 'var(--accent)' }}>
              ⎯⎯ Data Scientist / Applied AI
            </p>
            <h1 className="font-serif leading-[0.9] tracking-[-0.04em] text-white"
              style={{ fontSize: 'clamp(3.2rem, 10vw, 9.5rem)' }}>
              Shamal<br />
              <span className="italic text-white/70">Musthafa</span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
            <div className="mt-10 flex items-start gap-6 max-w-2xl">
              <span className="mt-2 block h-px w-12 bg-white/30 shrink-0" />
              <p className="text-white/70 text-lg leading-relaxed">{summary}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#projects"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-medium transition-all"
                style={{ ['--hover-bg' as string]: 'var(--accent)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'white'; (e.currentTarget as HTMLAnchorElement).style.color = 'black'; }}>
                See selected work
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-all">
                Start a conversation
              </a>
            </div>
          </div>

          {/* Currently card */}
          <div className="lg:col-span-4">
            <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Currently</span>
                <span className="font-mono text-[10px] text-white/40">01 / 04</span>
              </div>
              <p className="text-white/90 leading-relaxed">
                Shipping <span style={{ color: 'var(--accent)' }}>RAG pipelines</span> and{' '}
                <span style={{ color: 'var(--accent)' }}>BI automations</span> at Truwave — bridging enterprise data and LLMs.
              </p>
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/80 to-white/30 grid place-items-center text-black font-semibold text-xs">SM</div>
                <div className="text-sm">
                  <div className="text-white/90">Truwave Software</div>
                  <div className="text-white/40 text-xs">Data Scientist · Madurai</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rail */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
          {stats.map((s, i) => (
            <div key={i} className={`py-8 px-4 md:px-6 ${i > 0 ? 'md:border-l border-white/10' : ''} ${i > 1 ? 'border-t md:border-t-0 border-white/10' : ''}`}>
              <div className="font-serif text-4xl md:text-5xl text-white tracking-tight">{s.k}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.15em] text-white/50">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
