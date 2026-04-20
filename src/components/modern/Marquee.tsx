import React from 'react';

const ITEMS = ['Generative AI', 'RAG', 'Azure OpenAI', 'Power BI', 'Alteryx', 'Python', 'FastAPI', 'React', 'Tableau'];

const Marquee = () => {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a]">
      <div className="flex gap-12 py-4 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12 text-white/40 font-serif italic text-xl">
            {t}
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
