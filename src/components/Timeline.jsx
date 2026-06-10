import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Award, Rocket } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';

const events = [
  {
    year: '2025',
    month: 'May',
    title: 'MCA Graduate',
    org: 'Galgotias University',
    desc: 'Completed Master of Computer Applications with CGPA 7.5/10. Specialized in full-stack web development.',
    icon: <GraduationCap size={16} />,
    color: '#6c63ff',
    type: 'education',
  },
  {
    year: '2025',
    month: 'Mar',
    title: 'ChitChat — Real-time Chat App',
    org: 'Personal Project',
    desc: 'Built a production-grade real-time messaging app with Socket.io, JWT auth, private rooms, and online status.',
    icon: <Code2 size={16} />,
    color: '#00ff88',
    type: 'project',
  },
  {
    year: '2025',
    month: 'Feb',
    title: 'ShopBazzar — E-commerce Platform',
    org: 'Personal Project',
    desc: 'Full-stack e-commerce with admin dashboard, role-based access, cart, wishlist, and payment gateway integration.',
    icon: <Rocket size={16} />,
    color: '#ff7849',
    type: 'project',
  },
  {
    year: '2025',
    month: 'Jan',
    title: 'Admission Chalo — EdTech Platform',
    org: 'Personal Project · Live on Vercel',
    desc: 'Production-level college discovery platform like Shiksha.com. Dynamic listings, JWT auth, deployed on Vercel.',
    icon: <Rocket size={16} />,
    color: '#00d4ff',
    type: 'project',
  },
  {
    year: '2024',
    month: 'Jun',
    title: 'Web Development Internship',
    org: 'Acmegrade',
    desc: 'Hands-on training in HTML, CSS, JavaScript, and React.js. Built real-world projects under industry mentorship.',
    icon: <Briefcase size={16} />,
    color: '#a78bfa',
    type: 'work',
  },
  {
    year: '2024',
    month: 'Mar',
    title: 'Graph Theory & Algorithms Camp',
    org: 'AlgoUniversity',
    desc: 'Intensive programming camp focused on competitive programming, DSA, and graph algorithms.',
    icon: <Award size={16} />,
    color: '#f7df1e',
    type: 'cert',
  },
  {
    year: '2023',
    month: 'Aug',
    title: 'Started MCA',
    org: 'Galgotias University, Greater Noida',
    desc: 'Began Master of Computer Applications. Focused on advanced programming, databases, and software engineering.',
    icon: <GraduationCap size={16} />,
    color: '#6c63ff',
    type: 'education',
  },
  {
    year: '2022',
    month: 'May',
    title: 'BCA Graduate',
    org: 'Khandelwal College, Bareilly',
    desc: 'Completed Bachelor of Computer Applications. Built foundation in programming, web development, and databases.',
    icon: <GraduationCap size={16} />,
    color: '#9b95ff',
    type: 'education',
  },
];

const typeColors = {
  education: '#6c63ff',
  project: '#00d4ff',
  work: '#a78bfa',
  cert: '#f7df1e',
};

export default function Timeline() {
  const headRef = useReveal();

  return (
    <section className="py-24 px-6 bg-[#0a0a18] relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Journey</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div ref={headRef} className="reveal text-center mb-14">
          <h2 className="font-black leading-tight" style={{ fontFamily:'DM Sans', fontSize:'clamp(34px,5vw,50px)' }}>
            <span className="text-white">My </span>
            <span className="grad-text">Journey</span>
          </h2>
          <p className="text-[#5050a0] mt-2 text-sm">From BCA to Full Stack Developer</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.entries({ All: 'all', Education: 'education', Projects: 'project', Work: 'work', Certs: 'cert' }).map(([label, val]) => (
            <span key={val} className="px-3 py-1 rounded-full text-xs font-medium border border-white/[0.08] text-[#5050a0]">
              {label}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6c63ff]/40 via-[#00d4ff]/20 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {events.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="flex-1">
                  <div className="bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300"
                    style={{ borderLeft: `3px solid ${e.color}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ color: e.color, background: e.color + '15' }}>
                        {e.month} {e.year}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-0.5" style={{ fontFamily:'DM Sans' }}>{e.title}</h3>
                    <p className="text-[#5050a0] text-xs mb-2 font-medium">{e.org}</p>
                    <p className="text-[#6060a0] text-xs leading-relaxed">{e.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 bg-[#0a0a18]"
                  style={{ borderColor: e.color, color: e.color, boxShadow: `0 0 16px ${e.color}30` }}>
                  {e.icon}
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
