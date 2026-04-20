import React from 'react';
import Navbar from './components/modern/Navbar';
import Hero from './components/modern/Hero';
import Marquee from './components/modern/Marquee';
import Experience from './components/modern/Experience';
import Projects from './components/modern/Projects';
import Skills from './components/modern/Skills';
import Certifications from './components/modern/Certifications';
import Contact from './components/modern/Contact';
import Chatbot from './components/modern/Chatbot';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <footer className="relative border-t border-white/10 py-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <div>© {new Date().getFullYear()} Shamal Musthafa</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Designed &amp; built 2026
          </div>
          <div>v3.0 / Editorial</div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;
