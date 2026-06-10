import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageTransition() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            key="top"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            style={{ transformOrigin: 'top' }}
            className="fixed inset-0 z-[9998] pointer-events-none"
            style2={{ background: 'linear-gradient(135deg, #6c63ff, #00d4ff)' }}
          >
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0c0c1e, #05050f)' }}>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white"
                  style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}>
                  AK
                </div>
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => (
                    <motion.div key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#6c63ff]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
