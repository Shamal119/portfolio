import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTED = [
  'Tell me about your AI projects',
  'What is your tech stack?',
  'How can you help my business?',
  'Show me your resume summary',
];

const Chatbot = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [visible, setVisible]   = useState(false); // controls DOM presence for animation
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi — I'm Nexus, Shamal's AI assistant. Ask me about his projects, skills, or how he might help your team." }
  ]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // mount before animating in; unmount after animating out
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'model', text: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Connection error — please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fab-in { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .chatbot-fab { animation: fab-in 0.3s cubic-bezier(.34,1.56,.64,1) forwards; }
        .chat-window { transition: opacity 0.2s ease, transform 0.2s ease; }
        .chat-window.entering { opacity: 1; transform: translateY(0) scale(1); }
        .chat-window.leaving  { opacity: 0; transform: translateY(12px) scale(0.97); }
      `}</style>

      {/* FAB — always visible */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="chatbot-fab fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
        style={{ background: 'var(--accent)', zIndex: 99999, position: 'fixed' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          {isOpen ? <X size={22} color="white" /> : <MessageSquare size={22} color="white" />}
        </span>
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0a]" />
        )}
      </button>

      {/* Chat window */}
      {visible && (
        <div
          className={`chat-window fixed bottom-0 right-0 md:bottom-24 md:right-6 w-full h-[100dvh] md:w-[400px] md:h-[560px] md:max-h-[80vh] flex flex-col overflow-hidden rounded-none md:rounded-3xl border-t md:border border-white/10 bg-[#0f0f0f] shadow-2xl ${isOpen ? 'entering' : 'leaving'}`}
          style={{ zIndex: 99998, backdropFilter: 'blur(20px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-semibold"
                style={{ background: 'var(--accent)' }}>N</div>
              <div>
                <div className="text-white text-sm font-medium flex items-center gap-2">
                  Nexus
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[9px] font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />online
                  </span>
                </div>
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Powered by Gemini</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'bg-white/[0.06] border border-white/10 text-white/85 rounded-bl-sm'
                }`} style={msg.role === 'user' ? { background: 'var(--accent)' } : {}}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.06] border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="px-5 pb-3 shrink-0">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">Suggested</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((q, i) => (
                  <button key={i} onClick={() => send(q)}
                    className="text-xs border border-white/10 text-white/60 hover:text-white hover:border-white/25 rounded-full px-3 py-1.5 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-5 py-4 border-t border-white/10 shrink-0">
            <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything…"
                disabled={loading}
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors"
              />
              <button type="submit" disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-colors shrink-0"
                style={{ background: 'var(--accent)' }}>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
