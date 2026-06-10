import { useEffect, useRef } from 'react';

export default function useReveal(threshold = 0.1, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already in view on mount, show immediately
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}
