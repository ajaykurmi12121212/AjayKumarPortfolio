import { useEffect, useState } from 'react';

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding]     = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 18 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setHiding(true), 300);
      setTimeout(() => onDone(), 900);
    }
  }, [progress, onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05050f] transition-all duration-500"
      style={{ opacity: hiding ? 0 : 1, pointerEvents: hiding ? 'none' : 'all' }}
    >
      {/* Logo */}
      <div className="mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white"
          style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)', boxShadow: '0 0 40px rgba(108,99,255,0.4)' }}
        >
          AK
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg,#6c63ff,#00d4ff)',
          }}
        />
      </div>

      <p className="text-[#3a3a70] text-xs tracking-[3px] uppercase">Loading</p>
    </div>
  );
}
