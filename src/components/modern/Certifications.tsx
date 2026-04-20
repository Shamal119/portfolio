import React from 'react';
import resumeData from '../../data/resumeData.json';
import { SectionHeader } from './Experience';

interface Cert {
  name: string;
  issuer: string;
  link: string;
}

const Certifications = () => {
  const certs = resumeData.certifications as Cert[];

  return (
    <section id="certifications" className="relative py-28 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          n="05 — Credentials"
          kicker="Verified"
          title={<>Certifications<br /><span className="italic text-white/70">& vouches</span>.</>}
        />

        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((c, i) => (
            <a key={i} href={c.link} target="_blank" rel="noreferrer"
              className="group flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/20 transition-all">
              <div className="font-serif text-4xl text-white/30 group-hover:transition-colors w-12 shrink-0"
                style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[15px] font-medium leading-snug">{c.name}</div>
                <div className="text-white/40 text-xs font-mono mt-1 uppercase tracking-wider">{c.issuer}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
