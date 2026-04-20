import React, { useState, useEffect } from 'react';

const links = [
  { id: 'home',           label: 'Index',       n: '01' },
  { id: 'work',           label: 'Work',        n: '02' },
  { id: 'projects',       label: 'Projects',    n: '03' },
  { id: 'skills',         label: 'Stack',       n: '04' },
  { id: 'certifications', label: 'Credentials', n: '05' },
  { id: 'contact',        label: 'Contact',     n: '06' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('home');
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = links.map(l => l.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className={`mx-auto max-w-[1400px] px-6 lg:px-10 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/5' : ''}`}>
        <div className="flex items-center justify-between py-2">
          <a href="#home" className="flex items-center gap-3">
            <span className="w-8 h-8 grid place-items-center rounded-full bg-white text-black font-semibold text-sm tracking-tight">SM</span>
            <span className="hidden sm:block font-serif italic text-lg text-white/90">Shamal Musthafa</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`}
                className={`group relative px-4 py-2 text-[13px] tracking-wide uppercase transition-colors ${active === l.id ? 'text-white' : 'text-white/50 hover:text-white/90'}`}>
                <span className="mr-2 font-mono text-[10px] text-white/30">{l.n}</span>
                {l.label}
                <span className={`absolute left-4 right-4 bottom-1 h-px bg-[var(--accent)] origin-left transition-transform duration-300 ${active === l.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="/resume.pdf" target="_blank" rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-[13px] text-white/80 hover:bg-white hover:text-black transition-all">
              Résumé
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8"/></svg>
            </a>
            <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open
                  ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                  : <><path d="M4 7h16"/><path d="M4 17h16"/></>}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-1">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-white/80">
                <span className="font-mono text-[10px] text-white/30">{l.n}</span>
                <span className="text-sm tracking-wide uppercase">{l.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
