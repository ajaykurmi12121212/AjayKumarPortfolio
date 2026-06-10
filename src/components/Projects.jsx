import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight, Eye } from 'lucide-react';
import { GithubIcon } from './SocialIcons.jsx';
import { projects } from '../data/index.js';
import useReveal from '../hooks/useReveal.js';

function ProjectCard({ project, index }) {
  const ref = useRef();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
      className="group relative bg-[#0c0c1e] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
      style2={{ boxShadow: '0 0 0 rgba(108,99,255,0)' }}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden bg-[#080818] h-44">
        {!imgError ? (
          <img
            src={project.screenshot}
            alt={project.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback gradient */
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-20 flex items-center justify-center`}>
            <span className="text-6xl">{project.icon}</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-xs font-semibold hover:bg-white/20 transition-all"
              onClick={e => e.stopPropagation()}>
              <Eye size={13} /> Live Preview
            </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-xs font-semibold hover:bg-white/20 transition-all"
            onClick={e => e.stopPropagation()}>
            <GithubIcon size={13} /> Code
          </a>
        </div>
        {/* Gradient top bar */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient}`} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-base" style={{ fontFamily:'DM Sans' }}>{project.name}</h3>
            <p className="text-[#3a3a70] text-xs mt-0.5">{project.period}</p>
          </div>
          <div className="flex gap-1.5">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-[#8080a0] hover:text-[#00ff88] hover:border-[#00ff88]/40 transition-all duration-300">
                <ArrowUpRight size={13} />
              </a>
            )}
            <a href={project.github} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-[#8080a0] hover:text-[#9b95ff] hover:border-[#6c63ff]/40 transition-all duration-300">
              <GithubIcon size={13} />
            </a>
          </div>
        </div>

        <p className="text-[#6060a0] text-sm leading-relaxed flex-1 mb-4">{project.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.live && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#00ff88]/8 border border-[#00ff88]/20 text-[#00ff88] text-[10px] font-semibold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" /> Live
            </span>
          )}
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-[#6060a0] text-[10px] font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headRef = useReveal();

  return (
    <section id="projects" className="py-28 px-6 bg-[#0a0a18] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6c63ff] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">Featured Work</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div ref={headRef} className="reveal mb-14">
          <h2 className="font-black leading-tight" style={{ fontFamily:'DM Sans', fontSize:'clamp(36px,5vw,54px)' }}>
            <span className="text-white">Things I've </span>
            <span className="grad-text-2">Built</span>
          </h2>
          <p className="text-[#5050a0] mt-3 text-base max-w-xl">
            Production-ready projects — hover to preview live or explore code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
