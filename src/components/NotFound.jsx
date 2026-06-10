import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05050f] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-orb absolute w-[400px] h-[400px] rounded-full opacity-[0.1] blur-[100px] top-0 right-0"
          style={{ background: 'radial-gradient(circle,#6c63ff,transparent 70%)' }} />
        <div className="animate-orb2 absolute w-[300px] h-[300px] rounded-full opacity-[0.08] blur-[80px] bottom-0 left-0"
          style={{ background: 'radial-gradient(circle,#ff4d8d,transparent 70%)' }} />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 */}
          <div className="font-black mb-4 leading-none select-none"
            style={{
              fontFamily: 'DM Sans',
              fontSize: 'clamp(100px,20vw,180px)',
              background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.8,
            }}>
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-white font-bold text-2xl mb-3" style={{ fontFamily:'DM Sans' }}>
            Page Not Found
          </h1>
          <p className="text-[#5050a0] text-base leading-relaxed mb-8">
            Looks like this page doesn't exist. Maybe it was moved, deleted, or you mistyped the URL.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}>
            <Home size={15} />
            Back to Home
          </a>
          <button onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/[0.1] hover:border-[#6c63ff]/50 text-[#9090c0] hover:text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1">
            <ArrowLeft size={15} />
            Go Back
          </button>
        </motion.div>

        {/* Fun detail */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[#2a2a60] text-xs mt-10"
        >
          Error 404 · Page not found · Ajay Kumar Portfolio
        </motion.p>
      </div>
    </div>
  );
}
