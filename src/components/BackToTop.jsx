import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'all' : 'none',
        boxShadow: visible ? '0 8px 24px rgba(108,99,255,0.4)' : 'none',
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
