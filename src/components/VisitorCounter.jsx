import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simulate visitor count using localStorage + random seed
    const stored = localStorage.getItem('visit_count');
    const base = 1247; // starting number
    let visits;
    if (stored) {
      visits = parseInt(stored);
    } else {
      // Random increment 1-3 per new visitor
      const prev = parseInt(localStorage.getItem('visit_base') || base);
      visits = prev + Math.floor(Math.random() * 3) + 1;
      localStorage.setItem('visit_base', visits);
    }
    localStorage.setItem('visit_count', visits);

    // Animate count up
    setTimeout(() => {
      setVisible(true);
      let start = visits - 50;
      const step = () => {
        start += Math.ceil((visits - start) / 8);
        setCount(start);
        if (start < visits) requestAnimationFrame(step);
        else setCount(visits);
      };
      requestAnimationFrame(step);
    }, 500);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-40 flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#0c0c1e]/90 backdrop-blur-sm text-xs font-medium text-[#6060a0] hover:text-white hover:border-[#6c63ff]/40 transition-all duration-300 group">
      <Eye size={13} className="text-[#6c63ff] group-hover:animate-pulse" />
      <span>{count?.toLocaleString()}</span>
      <span className="text-[#3a3a70]">views</span>
    </div>
  );
}
