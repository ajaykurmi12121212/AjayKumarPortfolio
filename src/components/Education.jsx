import { GraduationCap, Award, Calendar } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Galgotias University',
    location: 'Greater Noida, UP',
    period: 'Aug 2023 – May 2025',
    score: 'CGPA: 7.5 / 10',
    color: '#6c63ff',
    icon: '🎓',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Khandelwal College',
    location: 'Bareilly, UP',
    period: 'Aug 2019 – May 2022',
    score: '63%',
    color: '#00d4ff',
    icon: '📚',
  },
];

const certifications = [
  {
    title: 'Web Development Internship',
    issuer: 'Acmegrade',
    desc: 'HTML, CSS, JavaScript, React.js — hands-on training',
    color: '#00ff88',
    icon: '💼',
    image: '/certificates/acmegrade.jpg',
    imageFallback: 'https://drive.google.com/uc?export=view&id=1asZyMp9bYD2_nCkIAR5jA12HNsrWBz58',
    driveLink: 'https://drive.google.com/file/d/1asZyMp9bYD2_nCkIAR5jA12HNsrWBz58/view?usp=sharing',
  },
  {
    title: 'Graph Theory & Algorithms',
    issuer: 'AlgoUniversity',
    desc: 'Programming Camp — competitive programming & DSA',
    color: '#ff7849',
    icon: '🧮',
    image: '/certificates/algouniversity.jpg',
    imageFallback: 'https://drive.google.com/uc?export=view&id=1pxtXmk-w9NWufoL-119-xPm7PPrpT38M',
    driveLink: 'https://drive.google.com/file/d/1pxtXmk-w9NWufoL-119-xPm7PPrpT38M/view?usp=sharing',
  },
];

export default function Education() {
  const eduRef  = useReveal();
  const certRef = useReveal();

  return (
    <section id="education" className="py-24 px-6 bg-[#05050f] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00d4ff] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Education & Certifications</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Education */}
          <div ref={eduRef} className="reveal-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.15)' }}>
                <GraduationCap size={16} className="text-[#6c63ff]" />
              </div>
              <h3 className="text-white font-bold text-xl" style={{ fontFamily:'DM Sans' }}>Education</h3>
            </div>

            <div className="flex flex-col gap-4">
              {education.map((e, i) => (
                <div key={e.degree}
                  className="bg-[#0a0a1e] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: e.color }} />

                  <div className="pl-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="text-white font-semibold text-sm leading-snug mb-1">{e.degree}</div>
                        <div className="font-medium text-sm" style={{ color: e.color }}>{e.institution}</div>
                      </div>
                      <span className="text-2xl flex-shrink-0">{e.icon}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-[#4040a0] text-xs">
                        <Calendar size={11} />
                        <span>{e.period}</span>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: e.color, background: e.color + '15', border: `1px solid ${e.color}25` }}
                      >
                        {e.score}
                      </span>
                    </div>
                    <div className="text-[#3a3a70] text-xs mt-1">{e.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div ref={certRef} className="reveal-right">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,255,136,0.12)' }}>
                <Award size={16} className="text-[#00ff88]" />
              </div>
              <h3 className="text-white font-bold text-xl" style={{ fontFamily:'DM Sans' }}>Certifications</h3>
            </div>

            <div className="flex flex-col gap-4">
              {certifications.map((c) => (
                <div key={c.title}
                  className="bg-[#0a0a1e] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: c.color }} />

                  {/* Certificate image preview */}
                  {c.image && (
                    <a href={c.driveLink} target="_blank" rel="noreferrer" className="block relative group">
                      <img
                        src={c.image}
                        alt={`${c.title} Certificate`}
                        className="w-full h-36 object-cover"
                        style={{ filter: 'brightness(0.85)' }}
                        onError={e => {
                          if (e.target.src !== c.imageFallback) {
                            e.target.src = c.imageFallback;
                          } else {
                            e.target.style.display = 'none';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          View Certificate ↗
                        </span>
                      </div>
                    </a>
                  )}

                  <div className="pl-5 pr-4 py-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="text-white font-semibold text-sm leading-snug">{c.title}</div>
                      <span className="text-xl flex-shrink-0">{c.icon}</span>
                    </div>
                    <div className="font-semibold text-sm mb-1.5" style={{ color: c.color }}>{c.issuer}</div>
                    <div className="text-[#5050a0] text-xs leading-relaxed mb-3">{c.desc}</div>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                      style={{ color: c.color, background: c.color + '12', border: `1px solid ${c.color}20` }}
                    >
                      ✓ Certified
                    </span>
                    <a href={c.driveLink} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 ml-2"
                      style={{ color: c.color, background: c.color + '12', border: `1px solid ${c.color}25` }}
                    >
                      View Certificate ↗
                    </a>
                  </div>
                </div>
              ))}

              {/* Extra info card */}
              <div className="bg-[#0a0a1e] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#9b95ff]" />
                <div className="pl-4">
                  <div className="text-white font-semibold text-sm mb-1">DSA & Problem Solving</div>
                  <div className="text-[#9b95ff] font-semibold text-sm mb-2">Self-Taught</div>
                  <div className="text-[#5050a0] text-xs leading-relaxed">Data Structures & Algorithms, OOP Concepts, DBMS, Operating Systems, Software Engineering</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
