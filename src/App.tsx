import React from 'react';
import Navbar from './components/modern/Navbar';
import Hero from './components/modern/Hero';
import Experience from './components/modern/Experience';
import Projects from './components/modern/Projects';
import Skills from './components/modern/Skills';
import Contact from './components/modern/Contact';
import Chatbot from './components/modern/Chatbot';
import Certifications from './components/modern/Certifications';

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Chatbot />

      <footer className="bg-black py-8 border-t border-gray-900 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Shamal Musthafa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
