import { Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons.jsx';
import { personalInfo } from '../data/index.js';

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education',href: '#education' },
  { label: 'Contact',  href: '#contact' },
];

const projectLinks = [
  { label: 'Admission Chalo', href: 'https://admission-chalo-sigma.vercel.app/', live: true },
  { label: 'ChitChat',        href: 'https://chitchat-chi-three.vercel.app',      live: true },
  { label: 'ShopBazzar',      href: 'https://github.com/ajaykurmi12121212',       live: false },
  { label: 'Portfolio',       href: 'https://ajay-kumar-portfolio-xi.vercel.app', live: true },
];

const socialLinks = [
  { icon: <GithubIcon size={16} />,   href: personalInfo.github,                  label: 'GitHub' },
  { icon: <LinkedinIcon size={16} />, href: personalInfo.linkedin,                label: 'LinkedIn' },
  { icon: <Mail size={16} />,         href: `mailto:${personalInfo.email}`,       label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-[#05050f] border-t border-white/[0.05]" id="footer">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}>
                AK
              </div>
              <span className="text-white font-bold text-lg">Ajay Kumar</span>
            </div>
            <p className="text-[#4040a0] text-sm leading-relaxed mb-5">
              Full Stack Developer building production-grade web apps with the MERN stack.
            </p>
            <div className="flex items-center gap-2 text-[#3a3a70] text-xs mb-2">
              <MapPin size={12} />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 border border-white/[0.07] rounded-xl flex items-center justify-center text-[#5050a0] hover:text-white hover:border-[#6c63ff]/40 hover:bg-[#6c63ff]/8 transition-all duration-300 hover:-translate-y-0.5">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#6c63ff]" />
              Navigation
            </div>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href}
                    className="text-[#5050a0] text-sm hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#6c63ff] transition-all duration-200 rounded-full" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <div className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#00d4ff]" />
              Projects
            </div>
            <ul className="flex flex-col gap-2.5">
              {projectLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer"
                    className="text-[#5050a0] text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group">
                    {l.label}
                    {l.live && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] opacity-70 group-hover:opacity-100" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#00ff88]" />
              Contact
            </div>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2.5 text-[#5050a0] hover:text-white transition-colors text-sm group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#6c63ff]/15 transition-colors"
                  style={{ background: 'rgba(108,99,255,0.08)' }}>
                  <Mail size={13} className="text-[#6c63ff]" />
                </div>
                <span className="truncate text-xs">{personalInfo.email}</span>
              </a>
              <a href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2.5 text-[#5050a0] hover:text-white transition-colors text-sm group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#00d4ff]/15 transition-colors"
                  style={{ background: 'rgba(0,212,255,0.08)' }}>
                  <Phone size={13} className="text-[#00d4ff]" />
                </div>
                <span className="text-xs">{personalInfo.phone}</span>
              </a>

              {/* Availability */}
              <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)' }}>
                <span className="animate-pulse-ring w-2 h-2 rounded-full bg-[#00ff88] flex-shrink-0" />
                <span className="text-[#00ff88] text-[11px] font-medium">Immediate Joiner · {personalInfo.ctc}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#3a3a70] text-xs">
            © 2025 <span className="text-[#6c63ff] font-semibold">Ajay Kumar</span> · All rights reserved
          </p>
          <div className="flex items-center gap-1.5 text-[#3a3a70] text-xs">
            <span>Built with</span>
            <Heart size={11} className="text-[#ff4d8d]" fill="#ff4d8d" />
            <span>using React + Tailwind + Vite</span>
          </div>
          <a href="#home"
            className="flex items-center gap-1.5 text-[#3a3a70] hover:text-white text-xs transition-colors">
            Back to top
            <ArrowUpRight size={12} />
          </a>
        </div>

      </div>
    </footer>
  );
}
