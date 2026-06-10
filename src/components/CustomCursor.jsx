import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef();
  const ring = useRef();

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    let raf;

    const onMove = e => { x = e.clientX; y = e.clientY; };

    const loop = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (dot.current)  { dot.current.style.transform  = `translate(${x}px,${y}px)`; }
      if (ring.current) { ring.current.style.transform = `translate(${rx}px,${ry}px)`; }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      ring.current?.classList.add('cursor-hover');
      dot.current?.classList.add('cursor-hover');
    };
    const onLeave = () => {
      ring.current?.classList.remove('cursor-hover');
      dot.current?.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        a, button, [role="button"], label { cursor: none !important; }
        input, textarea, select { cursor: text !important; }
        .modal-content * { cursor: auto !important; }
        .modal-content a, .modal-content button { cursor: pointer !important; }
        .cursor-dot {
          position: fixed; top: 0; left: 0; z-index: 9999;
          width: 6px; height: 6px; border-radius: 50%;
          background: #6c63ff;
          pointer-events: none;
          margin: -3px 0 0 -3px;
          transition: width 0.2s, height 0.2s, background 0.2s;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; z-index: 9998;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1.5px solid rgba(108,99,255,0.5);
          pointer-events: none;
          margin: -16px 0 0 -16px;
          transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
        }
        .cursor-dot.cursor-hover  { width: 10px; height: 10px; background: #00d4ff; margin: -5px 0 0 -5px; }
        .cursor-ring.cursor-hover { width: 44px; height: 44px; border-color: rgba(0,212,255,0.6); background: rgba(108,99,255,0.06); margin: -22px 0 0 -22px; }
      `}</style>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
