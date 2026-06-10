import './TechMarquee.css';

const techs = [
  { name: 'React.js',    color: '#61dafb', icon: '⚛️' },
  { name: 'Node.js',     color: '#00ff88', icon: '🟢' },
  { name: 'MongoDB',     color: '#4db33d', icon: '🍃' },
  { name: 'Express.js',  color: '#9b95ff', icon: '🚂' },
  { name: 'JavaScript',  color: '#f7df1e', icon: '💛' },
  { name: 'Tailwind CSS',color: '#38bdf8', icon: '🎨' },
  { name: 'Socket.io',   color: '#ff7849', icon: '🔌' },
  { name: 'JWT Auth',    color: '#ff4d8d', icon: '🔐' },
  { name: 'MySQL',       color: '#00aaff', icon: '🐬' },
  { name: 'Git',         color: '#f05032', icon: '🐙' },
  { name: 'Vercel',      color: '#ffffff', icon: '▲' },
  { name: 'REST APIs',   color: '#6c63ff', icon: '🔗' },
  { name: 'TypeScript',  color: '#3178c6', icon: '📘' },
  { name: 'Vite',        color: '#a78bfa', icon: '⚡' },
];

function TechPill({ tech }) {
  return (
    <div className="tech-pill" style={{ '--color': tech.color }}>
      <span className="tech-icon">{tech.icon}</span>
      <span className="tech-name">{tech.name}</span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />

      {/* Row 1 — left to right */}
      <div className="marquee-track">
        <div className="marquee-inner marquee-ltr">
          {[...techs, ...techs].map((t, i) => <TechPill key={i} tech={t} />)}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="marquee-track">
        <div className="marquee-inner marquee-rtl">
          {[...techs.slice().reverse(), ...techs.slice().reverse()].map((t, i) => <TechPill key={i} tech={t} />)}
        </div>
      </div>
    </div>
  );
}
