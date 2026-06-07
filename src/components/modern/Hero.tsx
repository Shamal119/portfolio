import React from 'react';
import resumeData from '../../data/resumeData.json';

const Hero = () => {
  const { personal, summary, stats, focus } = resumeData;
  const stack = ['RAG', 'LangChain', 'FastAPI', 'AWS Glue', 'Power BI', 'XGBoost'];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#090909] pt-28 pb-14">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_32%)]" />
      <div className="absolute right-0 top-24 hidden h-[620px] w-[44%] border-l border-white/8 bg-white/[0.018] lg:block" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for AI and data roles</span>
          </div>
          <div className="flex items-center gap-6">
            <span>{personal.location}</span>
            <span>Portfolio / v4.0</span>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 xl:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="mb-8 inline-flex flex-wrap items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] font-mono uppercase tracking-[0.16em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              {personal.title}
              <span className="text-white/25">/</span>
              {personal.subtitle}
            </div>

            <h1
              className="font-serif max-w-5xl leading-[0.88] text-white"
              style={{ fontSize: 'clamp(3.6rem, 8.4vw, 7.6rem)' }}
            >
              Building AI<br />
              <span className="italic text-white/68">that works</span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h1>

            <div className="mt-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-lg leading-relaxed text-white/72">{summary}</p>
              <div className="hidden h-px w-28 bg-white/20 md:block" />
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="border border-white/12 bg-black/20 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.12em] text-white/65">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 bg-white px-6 py-3.5 text-black font-medium transition-all"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'white'; (e.currentTarget as HTMLAnchorElement).style.color = 'black'; }}
              >
                See selected work
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 border border-white/18 px-6 py-3.5 text-white/90 transition-all hover:bg-white/5">
                Start a conversation
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-white/18 px-6 py-3.5 text-white/90 transition-all hover:bg-white/5">
                Latest resume
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto max-w-[340px] sm:max-w-[400px] lg:max-w-[500px]">
              <div className="absolute -left-5 top-8 z-20 hidden w-28 border border-white/10 bg-black/45 p-4 backdrop-blur md:block">
                <div className="font-serif text-4xl text-white">2+</div>
                <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white/45">Years shipping AI</div>
              </div>
              <div className="absolute -right-4 bottom-16 z-20 hidden w-40 border border-white/10 bg-black/55 p-4 backdrop-blur md:block">
                <div className="text-sm text-white">Current</div>
                <div className="mt-1 text-xs leading-relaxed text-white/55">Data Scientist / AI Solutions Builder at Truwave</div>
              </div>

              <div className="absolute inset-x-10 bottom-8 top-16 border border-white/10 bg-white/[0.018]" />
              <div className="absolute left-0 right-0 top-20 h-px bg-white/12" />
              <div className="absolute bottom-24 left-0 right-0 h-px bg-white/12" />
              <div className="absolute bottom-8 left-1/2 top-12 w-px bg-white/10" />
              <div className="absolute inset-x-12 bottom-0 h-28 bg-[radial-gradient(ellipse_at_center,rgba(0,200,150,0.24),transparent_68%)] blur-2xl" />

              <div className="relative flex min-h-[430px] items-end justify-center sm:min-h-[520px] lg:min-h-[600px]">
                <img
                  src="/assets/shamal-portrait-cutout.png"
                  alt="Shamal Musthafa in a suit"
                  className="relative z-10 h-auto max-h-[610px] w-full object-contain drop-shadow-[0_34px_70px_rgba(0,0,0,0.55)]"
                />
                <div className="absolute inset-x-0 bottom-0 z-20 border-y border-white/10 bg-black/55 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-serif text-2xl text-white">{personal.name}</div>
                      <div className="text-xs font-mono uppercase tracking-[0.15em] text-white/45">{personal.location}</div>
                    </div>
                    <div className="grid h-11 w-11 place-items-center bg-white text-sm font-semibold text-black">SM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-12">
          <div className="grid grid-cols-2 border border-white/10 bg-white/[0.02] md:grid-cols-4 lg:col-span-7">
            {stats.map((s, i) => (
              <div key={i} className={`p-5 ${i > 0 ? 'md:border-l border-white/10' : ''} ${i > 1 ? 'border-t md:border-t-0 border-white/10' : ''}`}>
                <div className="font-serif text-4xl md:text-5xl text-white">{s.k}</div>
                <div className="mt-2 text-xs font-mono uppercase tracking-[0.15em] text-white/50">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:col-span-5">
            {focus.map((item, i) => (
              <div key={item.label} className="border border-white/10 bg-black/25 p-5">
                <div className="font-mono text-[10px] text-white/35 mb-3">0{i + 1}</div>
                <div className="text-sm font-medium text-white">{item.label}</div>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4 text-xs font-mono uppercase tracking-[0.16em] text-white/42">
          <span>GenAI systems</span>
          <span>Cloud ETL</span>
          <span>BI automation</span>
          <span>ML products</span>
          <span>Research mindset</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
