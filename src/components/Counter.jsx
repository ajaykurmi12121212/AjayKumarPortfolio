import { useEffect, useRef, useState } from 'react';
import { Code2, Rocket, Clock, Award } from 'lucide-react';

function useCounter(target, duration = 2000, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatItem({ icon, value, suffix, label, color, delay, started }) {
  const count = useCounter(value, 2000, started);
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.06] bg-[#0a0a1e] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: color + '15', border: `1px solid ${color}25` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="font-black text-4xl text-white mb-1" style={{ fontFamily: 'DM Sans' }}>
        {count}{suffix}
      </div>
      <div className="text-[#5050a0] text-sm">{label}</div>
    </div>
  );
}

const stats = [
  { icon: <Rocket size={20} />,  value: 3,  suffix: '+', label: 'Live Projects',    color: '#6c63ff', delay: 0    },
  { icon: <Code2 size={20} />,   value: 12, suffix: '+', label: 'Technologies',     color: '#00d4ff', delay: 0.1  },
  { icon: <Clock size={20} />,   value: 2,  suffix: '+', label: 'Years Building',   color: '#00ff88', delay: 0.2  },
  { icon: <Award size={20} />,   value: 2,  suffix: '',  label: 'Certifications',   color: '#ff7849', delay: 0.3  },
];

export default function Counter() {
  const ref = useRef();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-[#05050f]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <StatItem key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
