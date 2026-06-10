import { MapPin, GraduationCap, Zap, IndianRupee } from 'lucide-react';
import { personalInfo } from '../data/index.js';
import useReveal from '../hooks/useReveal.js';
import SkillsRadar from './SkillsRadar.jsx';

export default function About() {
  const leftRef = useReveal();
  const rightRef = useReveal();

  const cards = [
    { icon: <MapPin size={14} />, label: 'Location', value: personalInfo.location, color: '#00d4ff' },
    { icon: <GraduationCap size={14} />, label: 'Degree', value: 'MCA — Galgotias Univ.', color: '#9b95ff' },
    { icon: <Zap size={14} />, label: 'Availability', value: 'Immediate Joiner', color: '#00ff88' },
    { icon: <IndianRupee size={14} />, label: 'Expected CTC', value: personalInfo.ctc, color: '#ff7849' },
  ];

  return (
    <section id="about" className="py-28 px-6 bg-[#0a0a18] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-[#6c63ff] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
          <span className="text-[#6c63ff] text-[11px] font-bold tracking-[4px] uppercase">About Me</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mt-10">

          {/* Left */}
          <div ref={leftRef} className="reveal-left flex flex-col items-center gap-8">
            {/* Avatar ring */}
            <div className="relative w-56 h-56 animate-float">
              <div className="animate-spin-slow absolute inset-0 rounded-full"
                style={{ border: '1px dashed rgba(108,99,255,0.25)' }} />
              <div className="animate-spin-slow-r absolute inset-4 rounded-full"
                style={{ border: '1px dashed rgba(0,212,255,0.15)' }} />
              <div className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))', border: '1px solid rgba(108,99,255,0.2)' }}>
                <span className="font-black text-5xl grad-text" style={{ fontFamily: 'Space Grotesk' }}>AK</span>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-2 -right-2 px-3 py-2 rounded-xl text-white text-xs font-bold text-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}>
                <div className="text-lg font-black leading-none">MCA</div>
                <div className="opacity-80">2025</div>
              </div>
            </div>

            {/* Stats */}
            <div className="w-full bg-[#0c0c1e] border border-white/[0.06] rounded-2xl overflow-hidden">
              {[
                { num: '3+', label: 'Live Projects' },
                { num: '12+', label: 'Technologies' },
                { num: 'MCA', label: '2025 Graduate' },
              ].map((s, i) => (
                <div key={s.label} className={`flex items-center justify-between px-6 py-4 ${i < 2 ? 'border-b border-white/[0.05]' : ''} hover:bg-white/[0.02] transition-colors`}>
                  <span className="text-[#6060a0] text-sm">{s.label}</span>
                  <span className="font-black text-xl grad-text" style={{ fontFamily: 'DM Sans' }}>{s.num}</span>
                </div>
              ))}
            </div>

            {/* Radar Chart */}
            <div className="w-full bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-4 mt-4">
              <div className="text-[#4040a0] text-[10px] uppercase tracking-widest font-medium mb-2 text-center">Skill Distribution</div>
              <SkillsRadar />
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="reveal-right">
            <h2 className="font-black leading-tight mb-5" style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(30px, 4vw, 44px)' }}>
              <span className="text-white">Passionate about </span>
              <span className="grad-text">building things</span>
            </h2>

            <p className="text-[#6060a0] leading-relaxed mb-4 text-[15px]">{personalInfo.bio}</p>
            <p className="text-[#6060a0] leading-relaxed mb-8 text-[15px]">
              Preferred locations:{' '}
              <span className="text-[#9b95ff] font-medium">{personalInfo.preferred}</span>
            </p>

            <div className="grid grid-cols-2 gap-3">
              {cards.map(c => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: c.color + '08',
                    borderColor: c.color + '20',
                  }}
                >
                  <span style={{ color: c.color }}>{c.icon}</span>
                  <div>
                    <div className="text-[#4040a0] text-[10px] uppercase tracking-wider font-medium">{c.label}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: c.color }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
