import { useState, useEffect } from 'react';
import { X, Mail, Phone, Download, Send, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons.jsx';
import { personalInfo } from '../data/index.js';

export default function HireMeModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  if (!open) return null;

  const links = [
    { icon: <Mail size={18} />,         label: 'Send Email',      sub: personalInfo.email,       href: `mailto:${personalInfo.email}`, color: '#6c63ff', primary: true },
    { icon: <Phone size={18} />,         label: 'Call / WhatsApp', sub: personalInfo.phone,       href: `tel:${personalInfo.phone}`,   color: '#00ff88' },
    { icon: <LinkedinIcon size={18} />,    label: 'LinkedIn',        sub: 'ajay-kumar-75721b225',   href: personalInfo.linkedin,         color: '#0a66c2' },
    { icon: <GithubIcon size={18} />,    label: 'GitHub',          sub: 'ajaykurmi12121212',      href: personalInfo.github,           color: '#9b95ff' },
    { icon: <Download size={18} />,      label: 'Download Resume', sub: 'PDF · ATS Friendly',    href: '/Ajay_Kumar_Resume.pdf',      color: '#ff7849', download: true },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="modal-content relative w-full max-w-md bg-[#0c0c1e] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(108,99,255,0.1)' }}>

        {/* Top gradient bar */}
        <div className="h-[2px]" style={{ background: 'linear-gradient(90deg,#6c63ff,#00d4ff,#a78bfa)' }} />

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white"
                style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}>
                AK
              </div>
              <div>
                <div className="text-white font-bold" style={{ fontFamily:'DM Sans' }}>Ajay Kumar</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-[#00ff88] text-xs font-medium">Available · Immediate Joiner</span>
                </div>
              </div>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-[#5050a0] hover:text-white hover:border-white/20 transition-all">
              <X size={16} />
            </button>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: '3–6 LPA', color: '#6c63ff' },
              { label: 'Full-Time', color: '#00d4ff' },
              { label: 'Greater Noida', color: '#00ff88' },
              { label: 'Remote OK', color: '#ff7849' },
            ].map(p => (
              <span key={p.label} className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ color: p.color, background: p.color + '12', border: `1px solid ${p.color}25` }}>
                {p.label}
              </span>
            ))}
          </div>

          <p className="text-[#5050a0] text-sm leading-relaxed mb-6">
            Looking for <span className="text-white">Software Developer, Full-Stack, or Frontend</span> roles. Open to Noida, Delhi NCR, Bengaluru, Hyderabad, Mumbai.
          </p>

          {/* Contact options */}
          <div className="flex flex-col gap-2.5">
            {links.map(l => (
              <a key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                download={l.download ? l.download : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: l.primary ? `linear-gradient(135deg, ${l.color}20, ${l.color}10)` : l.color + '08',
                  borderColor: l.primary ? l.color + '50' : l.color + '20',
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: l.color + '18', color: l.color }}>
                  {l.icon}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold">{l.label}</div>
                  <div className="text-[#4040a0] text-[11px] mt-0.5">{l.sub}</div>
                </div>
                <Send size={13} style={{ color: l.color + '80' }} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
