"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, RotateCcw, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTED = [
  { icon: "🕉️", text: "Who are the Trimurti?" },
  { icon: "🐘", text: "Tell me Ganesha's birth story" },
  { icon: "⚖️", text: "What is Karma and Dharma?" },
  { icon: "🏹", text: "Who were the Pandavas?" },
  { icon: "🐚", text: "Avatars of Lord Vishnu" },
  { icon: "📖", text: "Core teachings of Bhagavad Gita" },
  { icon: "🔱", text: "Why does Shiva have a third eye?" },
  { icon: "🌸", text: "Tell me about Goddess Durga" },
];

const MANTRAS = [
  "सत्यं शिवं सुन्दरम्",
  "ॐ नमः शिवाय",
  "हरे कृष्ण हरे राम",
  "जय माता दी",
  "ॐ गं गणपतये नमः",
];

function Particles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      color: ['var(--gold)', 'var(--saffron)', 'var(--lotus)', 'var(--gold-light)'][Math.floor(Math.random() * 4)],
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%',
          background: p.color, opacity: 0.5,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
        }} />
      ))}
    </div>
  );
}

function MantraBanner() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % MANTRAS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="overflow-hidden w-full" style={{
      background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
      borderTop: '1px solid var(--border-gold)',
      borderBottom: '1px solid var(--border-gold)',
      padding: '10px 0',
    }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100vw', opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-sanskrit"
          style={{ fontSize: 20, color: 'var(--gold)', letterSpacing: '0.15em', textShadow: '0 0 20px rgba(212,175,55,0.5)' }}
        >
          {MANTRAS[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function MandalaSpinner({ size = 40 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full border border-transparent animate-spin-slow"
        style={{ borderTopColor: 'var(--gold)', borderRightColor: 'rgba(212,175,55,0.3)' }} />
      <div className="absolute rounded-full border border-transparent animate-spin-reverse"
        style={{ inset: size * 0.12, borderBottomColor: 'var(--saffron)', borderLeftColor: 'rgba(255,107,0,0.3)' }} />
      <span className="font-sanskrit relative" style={{ fontSize: size * 0.3, color: 'var(--gold)' }}>ॐ</span>
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-3">
      <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--saffron), var(--vermillion))', boxShadow: '0 0 16px rgba(255,107,0,0.4)' }}>
        <span style={{ fontSize: 14 }}>✦</span>
      </div>
      <div className="glass rounded-2xl rounded-bl-sm px-5 py-4">
        <div className="flex gap-2 items-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-full"
              style={{ width: 7, height: 7, background: 'var(--gold)', animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
          <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>Dharma is reflecting...</span>
        </div>
      </div>
    </motion.div>
  );
}

function Diya() {
  return (
    <div className="flex flex-col items-center" style={{ width: 18 }}>
      <div className="animate-diya" style={{
        width: 7, height: 12,
        background: 'linear-gradient(to top, var(--saffron), var(--gold-light), white)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        boxShadow: '0 0 8px var(--saffron)',
      }} />
      <div style={{ width: 16, height: 7, background: 'linear-gradient(var(--gold-dim), var(--gold))', borderRadius: '0 0 50% 50%' }} />
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0 rounded-full flex items-center justify-center" style={{
        width: 38, height: 38,
        background: isUser
          ? 'linear-gradient(135deg, #2a1a3e, #1a0f2e)'
          : 'linear-gradient(135deg, var(--saffron), var(--vermillion))',
        border: `1px solid ${isUser ? 'var(--border-gold)' : 'rgba(255,107,0,0.4)'}`,
        boxShadow: isUser ? 'none' : '0 0 16px rgba(255,107,0,0.3)',
        fontSize: 16,
      }}>
        {isUser ? '🙏' : '✦'}
      </div>
      <div style={{
        maxWidth: '75%', padding: '14px 18px',
        borderRadius: isUser ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
        background: isUser
          ? 'linear-gradient(135deg, rgba(192,57,43,0.3), rgba(75,0,130,0.3))'
          : 'rgba(20,13,36,0.85)',
        border: `1px solid ${isUser ? 'rgba(192,57,43,0.4)' : 'var(--border-gold)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: isUser ? '0 4px 20px rgba(192,57,43,0.15)' : '0 4px 20px rgba(0,0,0,0.3)',
        fontSize: 15, lineHeight: 1.7, color: 'var(--text-primary)',
      }}>
        <div className="prose-divine" dangerouslySetInnerHTML={{
          __html: msg.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br/>')
        }} />
      </div>
    </motion.div>
  );
}

function HeroMandala() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="absolute rounded-full border" style={{
          inset: i * 16,
          borderColor: `rgba(212,175,55,${0.08 + i * 0.07})`,
          animation: i % 2 === 0
            ? `spin-slow ${20 + i * 5}s linear infinite`
            : `spin-reverse ${18 + i * 4}s linear infinite`,
        }} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: 6, height: 6,
          background: i % 2 === 0 ? 'var(--gold)' : 'var(--saffron)',
          top: '50%', left: '50%',
          transform: `rotate(${i * 45}deg) translateY(-64px) translate(-50%, -50%)`,
          boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--gold)' : 'var(--saffron)'}`,
        }} />
      ))}
      <div className="relative flex items-center justify-center rounded-full animate-pulse-glow" style={{
        width: 80, height: 80,
        background: 'linear-gradient(135deg, var(--saffron), var(--vermillion), var(--indigo))',
      }}>
        <span className="font-sanskrit text-white" style={{ fontSize: 36, textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>ॐ</span>
      </div>
    </motion.div>
  );
}

const THEMES = {
  dark: {
    '--bg-void': '#04030a', '--bg-deep': '#080614', '--bg-mid': '#0f0a1e',
    '--bg-card': '#140d24', '--bg-glass': 'rgba(20, 13, 36, 0.85)',
    '--text-primary': '#F5ECD7', '--text-secondary': '#C9A96E', '--text-muted': '#7A6040',
  },
  saffron: {
    '--bg-void': '#1a0800', '--bg-deep': '#220b00', '--bg-mid': '#2d1200',
    '--bg-card': '#3a1800', '--bg-glass': 'rgba(42, 18, 0, 0.88)',
    '--text-primary': '#FFF3E0', '--text-secondary': '#FFB74D', '--text-muted': '#A0522D',
  },
  forest: {
    '--bg-void': '#020a05', '--bg-deep': '#041209', '--bg-mid': '#071a0e',
    '--bg-card': '#0a2214', '--bg-glass': 'rgba(10, 34, 20, 0.88)',
    '--text-primary': '#E8F5E9', '--text-secondary': '#A5D6A7', '--text-muted': '#558B2F',
  },
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showThemes, setShowThemes] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const vars = THEMES[theme];
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, [theme]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    if (!started) setStarted(true);
    setInput("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch (err) {
      setMessages([...newMessages, {
        role: "assistant",
        content: "🙏 " + (err.message || "The cosmic connection was disrupted. Please try again."),
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [input, messages, loading, started]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="relative min-h-screen flex flex-col diamond-pattern" style={{ zIndex: 1 }}>
      <Particles />

      {/* ── Header ── */}
      <header className="glass-bright sticky top-0 z-50 px-6 py-3"
        style={{ borderBottom: '1px solid var(--border-gold)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ boxShadow: ['0 0 10px rgba(212,175,55,0.3)', '0 0 25px rgba(255,107,0,0.5)', '0 0 10px rgba(212,175,55,0.3)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--saffron), var(--vermillion))' }}>
              <span className="font-sanskrit text-white" style={{ fontSize: 18 }}>ॐ</span>
            </motion.div>
            <div>
              <h1 className="font-display shimmer-text" style={{ fontSize: 15, letterSpacing: '0.25em' }}>DHARMA</h1>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>SACRED KNOWLEDGE GUIDE</p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-3 items-center px-4 py-1.5 rounded-full"
              style={{ border: '1px solid var(--border-gold)', background: 'rgba(212,175,55,0.05)' }}>
              <Diya />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic' }}>सत्यं शिवं सुन्दरम्</span>
              <Diya />
            </div>

            {/* Theme switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemes(s => !s)}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  fontSize: 12,
                  background: 'rgba(212,175,55,0.12)',
                  fontWeight: 600,
                  boxShadow: '0 0 12px rgba(212,175,55,0.2)',
                }}>
                <Sun size={13} /> Theme
              </button>
              <AnimatePresence>
                {showThemes && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 mt-2 rounded-xl p-2 z-50"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', minWidth: 150, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                    {Object.keys(THEMES).map(t => (
                      <button key={t}
                        onClick={() => { setTheme(t); setShowThemes(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:scale-[1.02]"
                        style={{
                          color: theme === t ? 'var(--gold)' : 'var(--text-secondary)',
                          background: theme === t ? 'rgba(212,175,55,0.15)' : 'transparent',
                          fontWeight: theme === t ? 600 : 400,
                        }}>
                        {t === 'dark' ? '🌑 Midnight' : t === 'saffron' ? '🔥 Saffron' : '🌿 Forest'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* New Chat button */}
            {started && (
              <button
                onClick={() => { setMessages([]); setStarted(false); setInput(""); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{
                  border: '1px solid rgba(255,107,0,0.8)',
                  color: 'var(--saffron-light)',
                  fontSize: 12,
                  background: 'rgba(255,107,0,0.12)',
                  fontWeight: 600,
                  boxShadow: '0 0 12px rgba(255,107,0,0.2)',
                }}>
                <RotateCcw size={12} /> New Chat
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Mantra Banner ── */}
      <MantraBanner />

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4" style={{ paddingTop: 32, paddingBottom: 8 }}>

        {/* Landing */}
        <AnimatePresence>
          {!started && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center gap-8 py-8 text-center">

              <HeroMandala />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}>
                <h2 className="font-display shimmer-text" style={{ fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: '0.1em' }}>
                  Namaste, Seeker
                </h2>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
                  <span className="font-sanskrit" style={{ color: 'var(--gold)', fontSize: 18 }}>🌸 नमस्ते 🌸</span>
                  <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.9, fontStyle: 'italic' }}>
                  I am <span style={{ color: 'var(--gold)' }}>Dharma</span>, keeper of the ancient scriptures.
                  Ask me of gods, epics, philosophy, and the eternal wisdom of{' '}
                  <span style={{ color: 'var(--saffron-light)' }}>Sanatana Dharma</span>.
                </p>
              </motion.div>

              {/* Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="w-full max-w-2xl">
                <p className="text-center mb-5" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  ✦ Ask about Gods, Epics, Philosophy, Rituals ✦
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {SUGGESTED.map((s, i) => (
                    <motion.button key={s.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.07 }}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,175,55,0.25)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => sendMessage(s.text)}
                      className="glass rounded-2xl p-4 text-center"
                      style={{ border: '1px solid var(--border-gold)', cursor: 'pointer' }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                      <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{s.text}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="font-sanskrit text-center"
                style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                "योगः कर्मसु कौशलम्" — Excellence in action is yoga
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat */}
        {started && (
          <div className="flex-1 flex flex-col gap-5 pb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, var(--border-gold))' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>✦ Conversation with Dharma ✦</span>
              <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, var(--border-gold), transparent)' }} />
            </div>
            {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* ── Input bar ── */}
      <div className="sticky bottom-0 z-40 px-4 py-4"
        style={{
          background: 'linear-gradient(to top, var(--bg-void) 60%, transparent)',
          borderTop: '1px solid var(--border-gold)',
        }}>
        <div className="max-w-2xl mx-auto">

          {/* Quick chips */}
          {started && messages.length <= 2 && (
            <div className="flex gap-2 overflow-x-auto pb-3 justify-center flex-wrap">
              {SUGGESTED.slice(0, 5).map(s => (
                <button key={s.text} onClick={() => sendMessage(s.text)} disabled={loading}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  style={{
                    border: '1px solid var(--border-gold)',
                    color: 'var(--text-secondary)',
                    fontSize: 11,
                    background: 'rgba(212,175,55,0.05)',
                    whiteSpace: 'nowrap',
                  }}>
                  <span>{s.icon}</span>{s.text}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="✦  Ask about Gods, Epics, Philosophy, Rituals..."
              rows={1}
              disabled={loading}
              className="input-divine flex-1 rounded-2xl px-5 py-4 resize-none font-body"
              style={{
                background: 'rgba(30, 18, 50, 0.98)',
                border: '2px solid var(--gold)',
                color: 'var(--text-primary)',
                fontSize: 15,
                lineHeight: 1.6,
                maxHeight: 140,
                textAlign: 'center',
                boxShadow: '0 0 24px rgba(212,175,55,0.2), inset 0 1px 0 rgba(212,175,55,0.1)',
              }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
                e.target.style.textAlign = e.target.value ? 'left' : 'center';
              }}
            />
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="flex-shrink-0 rounded-2xl flex items-center justify-center disabled:opacity-30"
              style={{
                width: 52, height: 52,
                background: 'linear-gradient(135deg, var(--saffron), var(--vermillion))',
                boxShadow: loading || !input.trim() ? 'none' : '0 0 20px rgba(255,107,0,0.5)',
              }}>
              {loading ? <MandalaSpinner size={28} /> : <Send size={18} color="white" />}
            </motion.button>
          </div>

          <p className="text-center mt-3" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
            ✦ &nbsp; Guided by the wisdom of the Vedas &nbsp; ✦
          </p>
        </div>
      </div>
    </div>
  );
}