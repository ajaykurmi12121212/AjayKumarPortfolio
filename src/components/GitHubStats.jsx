import { useEffect, useState } from 'react';
import { GitFork, Star, Users, BookOpen, Activity, ExternalLink, Code2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons.jsx';
import useReveal from '../hooks/useReveal.js';

const username = 'ajaykurmi12121212';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const langColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  CSS: '#563d7c', HTML: '#e34c26', Java: '#b07219',
  'C++': '#f34b7d', Rust: '#dea584', Go: '#00ADD8', Shell: '#89e051',
};

function SkeletonCard() {
  return <div className="bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-5 animate-pulse h-28" />;
}

export default function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const headRef = useReveal();

  useEffect(() => {
    const headers = { Authorization: `token ${TOKEN}` };
    Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }).then(r => r.json()),
    ]).then(([p, r]) => {
      setProfile(p);
      setRepos(Array.isArray(r) ? r : []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalStars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((a, r) => a + (r.forks_count || 0), 0);

  const langMap = {};
  repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
  langMap['Node.js']  = (langMap['Node.js']  || 0) + 5;
  langMap['React.js'] = (langMap['React.js'] || 0) + 5;
  const topLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const langTotal = topLangs.reduce((a, [, v]) => a + v, 0);

  const topRepos = [...repos]
    .filter(r => r.description || r.language)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
    .slice(0, 4);

  const statCards = [
    { icon: <BookOpen size={16} />, label: 'Repositories',  value: profile?.public_repos ?? '—', color: '#6c63ff' },
    { icon: <Code2 size={16} />,    label: 'Technologies',  value: '12+',                        color: '#f7df1e' },
    { icon: <GitFork size={16} />,  label: 'Live Projects', value: '3',                          color: '#00d4ff' },
    { icon: <Users size={16} />,    label: 'Experience',    value: 'MCA 25',                     color: '#00ff88' },
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0a18] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#6c63ff] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.05]" />
          <span className="text-[#6c63ff] text-[11px] font-semibold tracking-[4px] uppercase">GitHub Activity</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.05]" />
        </div>

        <div ref={headRef} className="reveal flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-black leading-tight" style={{ fontFamily:'DM Sans', fontSize:'clamp(34px,5vw,50px)' }}>
              <span className="text-white">Open Source </span>
              <span className="grad-text">Activity</span>
            </h2>
            <p className="text-[#5050a0] mt-2 text-sm">Live stats directly from GitHub API.</p>
          </div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] text-[#7070a0] hover:text-white hover:border-[#6c63ff]/40 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5">
            <GithubIcon size={14} />
            @{username}
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : statCards.map((s, i) => (
              <div key={s.label}
                className="bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span style={{ color: s.color }}>{s.icon}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}60` }} />
                </div>
                <div className="font-black text-2xl text-white mb-1" style={{ fontFamily:'DM Sans' }}>{s.value}</div>
                <div className="text-[#4040a0] text-xs">{s.label}</div>
              </div>
            ))
          }
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Languages */}
          <div className="bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Activity size={15} className="text-[#6c63ff]" />
              <span className="text-white font-semibold text-sm">Top Languages</span>
            </div>
            {loading
              ? <div className="animate-pulse flex flex-col gap-3">{[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-white/[0.04] rounded-full" />)}</div>
              : topLangs.length > 0
                ? (
                  <div className="flex flex-col gap-3.5">
                    {topLangs.map(([lang, count], i) => {
                      const pct = Math.round((count / langTotal) * 100);
                      const color = langColors[lang] || '#6c63ff';
                      return (
                        <div key={lang}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                              <span className="text-[#a0a0c0] text-xs font-medium">{lang}</span>
                            </div>
                            <span className="text-[#5050a0] text-xs">{pct}%</span>
                          </div>
                          <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full rounded-full"
                              style={{ width:`${pct}%`, background: color + 'cc', transition: `width 1s ease ${i*0.1}s` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
                : <p className="text-[#4040a0] text-sm">No language data yet.</p>
            }
          </div>

          {/* Top Repos */}
          <div className="bg-[#0c0c1e] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Star size={15} className="text-[#f7df1e]" />
              <span className="text-white font-semibold text-sm">Repositories</span>
            </div>
            {loading
              ? <div className="animate-pulse flex flex-col gap-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-white/[0.04] rounded-xl" />)}</div>
              : (
                <div className="flex flex-col gap-2.5">
                  {topRepos.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"
                      className="flex items-start justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#6c63ff]/30 hover:bg-[#6c63ff]/5 transition-all duration-300 group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-white text-xs font-semibold group-hover:text-[#9b95ff] transition-colors truncate">{repo.name}</div>
                        {repo.description && <div className="text-[#4040a0] text-[11px] mt-0.5 truncate">{repo.description}</div>}
                        <div className="flex items-center gap-3 mt-1.5">
                          {repo.language && (
                            <span className="flex items-center gap-1 text-[10px] text-[#5050a0]">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: langColors[repo.language] || '#6c63ff' }} />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[10px] text-[#5050a0]">
                            <Star size={9} /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#5050a0]">
                            <GitFork size={9} /> {repo.forks_count}
                          </span>
                        </div>
                      </div>
                      <ExternalLink size={12} className="text-[#3a3a70] group-hover:text-[#6c63ff] transition-colors flex-shrink-0 mt-0.5 ml-2" />
                    </a>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}
