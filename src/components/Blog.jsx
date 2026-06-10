import { ExternalLink, Clock, Tag } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';

const blogs = [
  {
    title: 'Building Real-Time Chat with Socket.io and React',
    desc: 'How I built ChitChat — a production-grade real-time messaging app using WebSockets, JWT authentication, and MongoDB for persistent storage.',
    tags: ['Socket.io', 'React', 'Node.js'],
    readTime: '8 min read',
    date: 'Mar 2025',
    color: '#00ff88',
    href: 'https://github.com/ajaykurmi12121212',
    emoji: '💬',
  },
  {
    title: 'MERN Stack Architecture: Lessons from Production',
    desc: 'Key architectural decisions I made while building Admission Chalo — folder structure, API design, JWT auth flow, and deployment on Vercel.',
    tags: ['MERN', 'Architecture', 'Vercel'],
    readTime: '6 min read',
    date: 'Feb 2025',
    color: '#6c63ff',
    href: 'https://github.com/ajaykurmi12121212',
    emoji: '🏗️',
  },
  {
    title: 'React State Management: Context vs Zustand',
    desc: 'A practical comparison of React Context API and Zustand for state management in mid-size applications, with real code examples.',
    tags: ['React', 'Zustand', 'State'],
    readTime: '5 min read',
    date: 'Jan 2025',
    color: '#00d4ff',
    href: 'https://github.com/ajaykurmi12121212',
    emoji: '⚛️',
  },
];

export default function Blog() {
  const headRef = useReveal();

  return (
    <section className="py-24 px-6 bg-[#05050f] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-[#00d4ff] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Articles</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div ref={headRef} className="reveal flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-black leading-tight" style={{ fontFamily:'DM Sans', fontSize:'clamp(34px,5vw,50px)' }}>
              <span className="text-white">Technical </span>
              <span className="grad-text-2">Writing</span>
            </h2>
            <p className="text-[#5050a0] mt-2 text-sm">Sharing what I learn while building.</p>
          </div>
          <span className="text-[#3a3a70] text-xs border border-white/[0.06] px-3 py-1.5 rounded-full">Coming to Medium soon</span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {blogs.map((b, i) => (
            <a key={b.title} href={b.href} target="_blank" rel="noreferrer"
              className="group bg-[#0a0a1e] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.14] hover:-translate-y-2 transition-all duration-400 flex flex-col"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }} />
              <div className="p-6 flex flex-col flex-1">
                <div className="text-3xl mb-4">{b.emoji}</div>
                <h3 className="text-white font-bold text-[15px] leading-snug mb-3 group-hover:text-[#9b95ff] transition-colors" style={{ fontFamily:'DM Sans' }}>
                  {b.title}
                </h3>
                <p className="text-[#5050a0] text-sm leading-relaxed flex-1 mb-5">{b.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {b.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-[10px] text-[#6060a0]">
                      <Tag size={8} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3 text-[#3a3a70] text-xs">
                    <span>{b.date}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span>{b.readTime}</span>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-[#3a3a70] group-hover:text-[#6c63ff] transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
