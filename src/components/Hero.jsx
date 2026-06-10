import { useEffect, useRef, useState, useCallback } from 'react';
import { Mail, MapPin, ArrowRight, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons.jsx';
import { personalInfo } from '../data/index.js';
import useConfetti from '../hooks/useConfetti.js';

const roles = ['Full Stack Developer', 'React.js Engineer', 'MERN Stack Dev', 'Node.js Developer'];

export default function Hero({ onHireMe }) {
  const ref = useRef();
  const heroRef = useRef();
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const fireConfetti = useConfetti();

  // Typewriter
  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting && text.length < current.length) {
      t = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, 75);
    } else if (!deleting && text.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  // Load animation
  useEffect(() => {
    setTimeout(() => ref.current?.classList.add('loaded'), 80);
  }, []);

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handleHireClick = () => {
    fireConfetti();
    setTimeout(() => onHireMe?.(), 300);
  };

  return (
    <section
      id="home"
      ref={el => { ref.current = el; heroRef.current = el; }}
      className="min-h-screen flex items-center px-6 pt-28 pb-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-orb absolute w-[700px] h-[700px] rounded-full opacity-[0.11] blur-[140px] -top-40 -right-40"
          style={{
            background: 'radial-gradient(circle,#6c63ff,transparent 70%)',
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            transition: 'transform 0.3s ease',
          }} />
        <div className="animate-orb2 absolute w-[450px] h-[450px] rounded-full opacity-[0.08] blur-[110px] bottom-0 -left-28"
          style={{
            background: 'radial-gradient(circle,#00d4ff,transparent 70%)',
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            transition: 'transform 0.3s ease',
          }} />
        <div className="animate-orb3 absolute w-[280px] h-[280px] rounded-full opacity-[0.07] blur-[80px] top-1/2 left-1/3"
          style={{
            background: 'radial-gradient(circle,#a78bfa,transparent 70%)',
            transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
            transition: 'transform 0.3s ease',
          }} />
        {/* Dot grid with parallax */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
            transition: 'transform 0.4s ease',
          }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_auto] gap-16 items-center">

        {/* ── Left ── */}
        <div>
          <div className="animate-fade-up delay-1 inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border text-[13px] font-medium"
            style={{ background: 'rgba(0,255,136,0.05)', borderColor: 'rgba(0,255,136,0.18)', color: 'rgba(0,255,136,0.9)' }}>
            <span className="animate-pulse-ring w-2 h-2 rounded-full bg-[#00ff88] flex-shrink-0" />
            Open to work · Immediate joiner
          </div>

          <div className="mb-6">
            <p className="animate-fade-up delay-1 text-[#5050a0] text-base font-light tracking-wide mb-3">Hi, I'm</p>
            <h1 className="animate-fade-up delay-2"
              style={{ fontFamily:'DM Sans', fontWeight:800, lineHeight:0.9, letterSpacing:'-2.5px', fontSize:'clamp(62px,10vw,108px)' }}>
              <span className="text-white block">Ajay</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Kumar</span>
            </h1>
          </div>

          {/* Typewriter */}
          <div className="animate-fade-up delay-3 flex items-center gap-3 mb-5 h-8"
            style={{ transform: `translateY(${mousePos.y * -5}px)`, transition: 'transform 0.3s ease' }}>
            <div className="w-8 h-px bg-gradient-to-r from-[#6c63ff] to-transparent" />
            <span className="text-white font-semibold text-lg tracking-tight" style={{ fontFamily:'DM Sans' }}>
              {text}
              <span className="animate-blink inline-block w-[2px] h-5 bg-[#a78bfa] ml-0.5 align-middle rounded-full" />
            </span>
          </div>

          <p className="animate-fade-up delay-3 text-[#5a5a90] text-[15px] leading-relaxed mb-4 max-w-lg">
            Building fast, scalable, production-ready web apps with the MERN stack.
          </p>

          <div className="animate-fade-up delay-4 flex items-center gap-1.5 text-[#3a3a70] text-sm mb-9">
            <MapPin size={12} />
            <span>{personalInfo.location}</span>
          </div>

          {/* Buttons */}
          <div className="animate-fade-up delay-4 flex flex-wrap gap-3 mb-10">
            <button
              onClick={handleHireClick}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(108,99,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              🎉 Hire Me
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/[0.1] hover:border-white/25 text-[#9090c0] hover:text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.03]">
              View Projects
            </a>
            <a href="/Ajay_Kumar_Resume.pdf" download
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/[0.08] hover:border-[#6c63ff]/40 text-[#6060a0] hover:text-[#9b95ff] font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1">
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Socials */}
          <div className="animate-fade-up delay-5 flex items-center gap-4">
            <span className="text-[#2a2a60] text-[11px] uppercase tracking-[2px]">Connect</span>
            <div className="w-8 h-px bg-white/[0.06]" />
            <div className="flex gap-2.5">
              {[
                { icon: <GithubIcon size={15} />,   href: personalInfo.github,              label: 'GitHub' },
                { icon: <LinkedinIcon size={15} />, href: personalInfo.linkedin,            label: 'LinkedIn' },
                { icon: <Mail size={15} />,         href: `mailto:${personalInfo.email}`,   label: 'Email' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 border border-white/[0.07] rounded-xl flex items-center justify-center text-[#5050a0] hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right floating card ── */}
        <div className="hidden lg:flex items-center justify-center animate-float"
          style={{ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`, transition: 'transform 0.4s ease' }}>
          <div className="relative">
            <div className="animate-spin-slow absolute -inset-8 rounded-full"
              style={{ border: '1px dashed rgba(108,99,255,0.18)' }} />
            <div className="animate-spin-slow-r absolute -inset-4 rounded-full"
              style={{ border: '1px dashed rgba(0,212,255,0.10)' }} />
            <div className="relative w-[240px] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a1e]"
              style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg,#6c63ff,#00d4ff,#a78bfa)' }} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#6c63ff25,#00d4ff15)', border: '1px solid rgba(108,99,255,0.25)' }}>
                    👨‍💻
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm" style={{ fontFamily:'DM Sans' }}>Ajay Kumar</div>
                    <div className="text-[#5050a0] text-[11px]">Full Stack Dev</div>
                  </div>
                </div>
                {[
                  { label: 'React.js',  color: '#61dafb', icon: '⚛️' },
                  { label: 'Node.js',   color: '#00ff88', icon: '🟢' },
                  { label: 'MongoDB',   color: '#4db33d', icon: '🍃' },
                  { label: 'Socket.io', color: '#ff7849', icon: '🔌' },
                  { label: 'Tailwind',  color: '#38bdf8', icon: '🎨' },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-2 px-3 py-2 rounded-xl mb-2"
                    style={{ background: t.color + '08', border: `1px solid ${t.color}18` }}>
                    <span className="text-sm">{t.icon}</span>
                    <span className="text-xs font-medium flex-1" style={{ color: t.color + 'dd' }}>{t.label}</span>
                    <span className="text-[10px] font-bold" style={{ color: t.color }}>✓</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-3"
                  style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.18)' }}>
                  <span className="animate-pulse-ring w-2 h-2 rounded-full bg-[#00ff88] flex-shrink-0" />
                  <span className="text-[#00ff88] text-[11px] font-semibold">Available · Immediate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about"
        className="animate-scroll absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-[#2a2a60] hover:text-[#7070c0] transition-colors text-[10px] tracking-[3px] uppercase">
        <div className="w-4 h-7 border border-white/[0.08] rounded-full flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-[#6c63ff] rounded-full" style={{ animation: 'scrollBounce 2s infinite' }} />
        </div>
        scroll
      </a>
    </section>
  );
}
