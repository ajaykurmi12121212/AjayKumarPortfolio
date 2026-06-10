import { useEffect, useRef } from 'react';
import { skills } from '../data/index.js';
import useReveal from '../hooks/useReveal.js';

function SkillCard({ skill, index }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        setTimeout(() => {
          const bar = el.querySelector('.skill-bar-fill');
          if (bar) bar.style.width = skill.level + '%';
        }, 200 + index * 50);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [skill.level, index]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
      }}
      className="group bg-[#0a0a1e] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-white font-semibold text-sm mb-1.5">{skill.name}</div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
            style={{ color: skill.color, background: skill.color + '12', border: `1px solid ${skill.color}22` }}
          >
            {skill.category}
          </span>
        </div>
        <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
          style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}60` }} />
      </div>

      {/* Bar only — no % text */}
      <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className="skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: 0, background: `linear-gradient(90deg,${skill.color}50,${skill.color})` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useReveal();

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-28 px-6 bg-[#05050f] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00d4ff] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#6c63ff] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Skills</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div ref={headRef} className="reveal mb-14">
          <h2 className="font-black leading-tight" style={{ fontFamily:'DM Sans', fontSize:'clamp(36px,5vw,54px)' }}>
            <span className="text-white">My </span>
            <span className="grad-text">Toolkit</span>
          </h2>
          <p className="text-[#5050a0] mt-3 text-base">Technologies I use to build production apps.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
