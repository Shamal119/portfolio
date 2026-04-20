import React, { useState } from 'react';
import resumeData from '../../data/resumeData.json';
import { SectionHeader } from './Experience';

const Contact = () => {
  const { personal } = resumeData;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subj = `Portfolio contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const socialLinks = [
    { label: 'LinkedIn', href: `https://${personal.linkedin}` },
    { label: 'GitHub',   href: `https://${personal.github}` },
    { label: 'Résumé',   href: '/resume.pdf' },
  ];

  const inputClass = "mt-2 w-full bg-transparent border-0 border-b border-white/15 pb-2 text-white placeholder-white/30 focus:outline-none transition-colors";

  return (
    <section id="contact" className="relative py-28 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(800px 400px at 50% 100%, color-mix(in oklab, var(--accent) 25%, transparent), transparent 70%)'
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          n="06 — Contact"
          kicker="Open for work"
          title={<>Let's build<br /><span className="italic text-white/70">something</span> together.</>}
          blurb="Most useful for: LLM / RAG products, BI automation, or anything at the seam between data platforms and user-facing AI."
        />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-8">
            <a href={`mailto:${personal.email}`} className="group block">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Email</div>
              <div className="font-serif text-3xl md:text-4xl text-white group-hover:transition-colors break-all"
                style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'white')}>
                {personal.email}
              </div>
            </a>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Phone</div>
              <div className="font-serif text-2xl text-white/90">{personal.phone}</div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-white/80 text-sm hover:bg-white hover:text-black transition-all">
                  {l.label}<span>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-3xl border border-white/10 p-8 bg-white/[0.02] backdrop-blur">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Name</span>
                  <input required placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')} />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Email</span>
                  <input required type="email" placeholder="you@domain.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')} />
                </label>
              </div>

              <label className="block mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Message</span>
                <textarea required rows={5} placeholder="Tell me about what you're building…" value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')} />
              </label>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="font-mono text-[10px] text-white/40">
                  {sent ? '✓ Opening your mail client…' : 'Opens in your default mail client'}
                </span>
                <button type="submit"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium transition-all"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.color = 'black'; }}>
                  Send message
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
