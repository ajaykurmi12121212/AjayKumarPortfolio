import { motion } from 'framer-motion';
import { Trophy, Zap, Star, Code2, Rocket, Shield, Globe, Clock } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';

const badges = [
  { icon: <Rocket size={20} />,  title: 'Deployed 3 Live Apps', desc: 'Vercel-deployed production projects',       color: '#6c63ff', unlocked: true  },
  { icon: <Globe size={20} />,   title: 'Full Stack Builder',    desc: 'Frontend + Backend + Database mastery',     color: '#00d4ff', unlocked: true  },
  { icon: <Zap size={20} />,     title: 'Real-time Dev',         desc: 'Built with Socket.io & WebSockets',         color: '#00ff88', unlocked: true  },
  { icon: <Code2 size={20} />,   title: 'Open Source',           desc: '15+ public repositories on GitHub',         color: '#f7df1e', unlocked: true  },
  { icon: <Shield size={20} />,  title: 'Auth Expert',           desc: 'JWT, bcrypt, role-based access',             color: '#ff4d8d', unlocked: true  },
  { icon: <Star size={20} />,    title: 'MCA Graduate',          desc: 'CGPA 7.5 — Galgotias University 2025',      color: '#a78bfa', unlocked: true  },
  { icon: <Trophy size={20} />,  title: 'EdTech Builder',        desc: 'Built Admission Chalo for 50M+ students',   color: '#ff7849', unlocked: true  },
  { icon: <Clock size={20} />,   title: 'Immediate Joiner',      desc: 'Ready to start from Day 1',                 color: '#38bdf8', unlocked: true  },
];

export default function Achievements() {
  const headRef = useReveal();

  return (
    <section className="py-24 px-6 bg-[#05050f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-[#f7df1e] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#6c63ff] opacity-[0.04] blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Achievements</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div ref={headRef} className="reveal mb-12">
          <h2 className="font-black leading-tight" style={{ fontFamily:'DM Sans', fontSize:'clamp(34px,5vw,50px)' }}>
            <span className="text-white">Achievement </span>
            <span className="grad-text">Badges</span>
          </h2>
          <p className="text-[#5050a0] mt-2 text-sm">Unlocked through projects, learning & experience.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: 'backOut' }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="relative bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-5 cursor-default overflow-hidden group"
              style={{ borderColor: b.unlocked ? `${b.color}25` : 'rgba(255,255,255,0.04)' }}
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${b.color}15, transparent 70%)` }} />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: b.color + '18', color: b.color, border: `1px solid ${b.color}30` }}>
                {b.icon}
              </div>

              {/* Badge shine */}
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: b.color + '20' }}>
                <Trophy size={10} style={{ color: b.color }} />
              </div>

              <div className="text-white font-semibold text-xs mb-1 leading-snug" style={{ fontFamily:'DM Sans' }}>
                {b.title}
              </div>
              <div className="text-[#4040a0] text-[10px] leading-relaxed">{b.desc}</div>

              {/* Unlocked indicator */}
              <div className="mt-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                <span className="text-[10px] font-semibold" style={{ color: b.color + 'aa' }}>Unlocked</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
