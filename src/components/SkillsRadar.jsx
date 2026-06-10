import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const categories = [
  { label: 'Frontend',   value: 90, color: '#61dafb' },
  { label: 'Backend',    value: 83, color: '#00ff88' },
  { label: 'Database',   value: 78, color: '#4db33d' },
  { label: 'Real-time',  value: 75, color: '#ff7849' },
  { label: 'DevOps',     value: 70, color: '#f05032' },
  { label: 'Security',   value: 76, color: '#ff4d8d' },
];

function polarToXY(angle, r, cx, cy) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SkillsRadar() {
  const ref = useRef();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cx = 160, cy = 160, maxR = 120;
  const n = categories.length;
  const angles = categories.map((_, i) => (360 / n) * i);

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = categories.map((c, i) => {
    const r = (c.value / 100) * maxR;
    return polarToXY(angles[i], r, cx, cy);
  });

  const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="320" height="320" viewBox="0 0 320 320">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Grid */}
        {gridLevels.map(level => {
          const pts = angles.map(a => {
            const p = polarToXY(a, level * maxR, cx, cy);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <polygon key={level} points={pts}
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          );
        })}

        {/* Axis lines */}
        {angles.map((angle, i) => {
          const end = polarToXY(angle, maxR, cx, cy);
          return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
        })}

        {/* Data polygon */}
        <motion.polygon
          points={started ? polygonPoints : categories.map((_, i) => {
            const p = polarToXY(angles[i], 0, cx, cy);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="url(#radarGrad)"
          stroke="#6c63ff"
          strokeWidth="2"
          animate={{ points: started ? polygonPoints : undefined }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r="5"
            fill={categories[i].color}
            stroke="#0a0a18"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={started ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
          />
        ))}

        {/* Labels */}
        {categories.map((c, i) => {
          const labelPos = polarToXY(angles[i], maxR + 28, cx, cy);
          return (
            <text key={i} x={labelPos.x} y={labelPos.y}
              textAnchor="middle" dominantBaseline="middle"
              fill={c.color} fontSize="11" fontWeight="600" fontFamily="DM Sans">
              {c.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 mt-4 w-full max-w-xs">
        {categories.map(c => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <span className="text-[#6060a0] text-[10px]">{c.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
