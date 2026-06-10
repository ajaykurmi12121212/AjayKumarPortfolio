import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const links = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar({ onHireMe }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#05050f]/90 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-[13px] tracking-tight" style={{ fontFamily: 'DM Sans' }}>AK</span>
              </div>
            </div>
            <span className="text-white font-semibold text-[17px] hidden sm:block tracking-tight">
              Ajay Kumar
            </span>
          </a>

          {/* Desktop links — minimal pill style */}
          <ul className="hidden md:flex items-center list-none">
            {links.map((l, i) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 text-[13px] font-medium text-[#7070a0] hover:text-white transition-colors duration-300 group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button onClick={toggle}
            className="hidden md:flex w-9 h-9 rounded-xl border border-white/[0.08] items-center justify-center text-[#7070a0] hover:text-white hover:border-[#6c63ff]/40 transition-all duration-300">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Hire Me CTA */}
          <button
            onClick={onHireMe}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white border border-white/[0.1] hover:border-[#6c63ff]/60 hover:bg-[#6c63ff]/8 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-ring flex-shrink-0" />
            Available for hire
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-[#8080a0] hover:text-white hover:border-white/20 transition-all"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-400 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#05050f]/95 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-64 bg-[#0a0a1e] border-l border-white/[0.05] p-7 flex flex-col gap-2 transition-transform duration-400 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-white font-semibold text-sm">Navigation</span>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-[#7070a0]">
              <X size={15} />
            </button>
          </div>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#9090b0] hover:text-white hover:bg-white/[0.04] font-medium text-[15px] transition-all duration-200 group"
            >
              <span className="w-1 h-1 rounded-full bg-[#6c63ff] opacity-0 group-hover:opacity-100 transition-opacity" />
              {l.label}
            </a>
          ))}
          <div className="mt-auto pt-6 border-t border-white/[0.05]">
            <a onClick={onHireMe} onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm w-full"
              style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
